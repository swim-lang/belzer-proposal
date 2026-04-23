import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useContent } from '../context/ContentContext'
import { questions } from './questions'
import type { Answer, Answers, MultiAnswer, RatingAnswer, SingleAnswer, TextAnswer } from './types'
import { TopBar, BottomBar, KeyHint } from './IntakeChrome'
import { IntakeIntro } from './IntakeIntro'
import { IntakeComplete } from './IntakeComplete'
import { IntakeContact, isValidEmail } from './IntakeContact'
import { QuestionMulti } from './QuestionMulti'
import { QuestionSingle } from './QuestionSingle'
import { QuestionRating } from './QuestionRating'
import { QuestionText } from './QuestionText'

const STORAGE_KEY = 'anchovies-intake-draft-v1'
const PENDING_KEY = 'anchovies-intake-pending-v1'
const TOTAL = questions.length

type PersistState = {
  step: number
  startedAt: string
  answers: Answers
  contactName?: string
  contactEmail?: string
}

// Steps: 0 = intro, 1..TOTAL = questions, TOTAL+1 = contact, TOTAL+2 = complete
const CONTACT_STEP = questions.length + 1
const COMPLETE_STEP = questions.length + 2

function defaultAnswer(qid: string): Answer {
  const q = questions.find((x) => x.id === qid)!
  if (q.type === 'multi') return { type: 'multi', selected: [] }
  if (q.type === 'single') return { type: 'single', selected: null }
  if (q.type === 'rating') return { type: 'rating', value: null }
  return { type: 'text', value: '' }
}

function isAnswered(a: Answer, optional?: boolean): boolean {
  if (optional) return true
  switch (a.type) {
    case 'multi':
      return a.selected.length > 0 || !!a.other?.trim()
    case 'single':
      return a.selected !== null || !!a.other?.trim()
    case 'rating':
      return a.value !== null
    case 'text':
      return a.value.trim().length > 0
  }
}

export function Intake() {
  const { client, agency } = useContent()
  const [step, setStep] = useState<number>(0) // 0 = intro, 1..N = questions, N+1 = complete
  const [startedAt, setStartedAt] = useState<string>(() => new Date().toISOString())
  const [completedAt, setCompletedAt] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Answers>(() => {
    const obj: Answers = {}
    for (const q of questions) obj[q.id] = defaultAnswer(q.id)
    return obj
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [resumed, setResumed] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')

  // Hydrate from localStorage on mount (so an accidental close doesn't lose progress)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as PersistState
      if (parsed.answers) setAnswers({ ...answers, ...parsed.answers })
      if (typeof parsed.step === 'number' && parsed.step > 0) {
        setStep(parsed.step)
        setResumed(true)
      }
      if (parsed.startedAt) setStartedAt(parsed.startedAt)
      if (parsed.contactName) setContactName(parsed.contactName)
      if (parsed.contactEmail) setContactEmail(parsed.contactEmail)
    } catch {
      /* noop */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-dismiss the resumed hint after a moment
  useEffect(() => {
    if (!resumed) return
    const t = setTimeout(() => setResumed(false), 5000)
    return () => clearTimeout(t)
  }, [resumed])

  // Persist on change while active (skip intro + completion)
  useEffect(() => {
    if (step === 0 || step >= COMPLETE_STEP) return
    try {
      const data: PersistState = { step, startedAt, answers, contactName, contactEmail }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      /* noop */
    }
  }, [step, startedAt, answers, contactName, contactEmail])

  const currentQ = step >= 1 && step <= TOTAL ? questions[step - 1] : null
  const currentAnswer = currentQ ? answers[currentQ.id] : null

  // Piped options for Q5 from Q4
  const pipedOptions = useMemo(() => {
    if (!currentQ || !('pipeFrom' in currentQ) || !currentQ.pipeFrom) return undefined
    const src = answers[currentQ.pipeFrom]
    if (!src || src.type !== 'multi') return []
    const base = [...src.selected]
    if (src.other?.trim()) base.push(src.other.trim())
    return base
  }, [currentQ, answers])

  const setAnswer = useCallback(
    (a: Answer) => {
      if (!currentQ) return
      setAnswers((prev) => ({ ...prev, [currentQ.id]: a }))
    },
    [currentQ]
  )

  const canAdvance = useMemo(() => {
    if (step === 0) return true
    if (step === CONTACT_STEP) {
      return contactName.trim().length > 0 && isValidEmail(contactEmail)
    }
    if (step > TOTAL) return true
    if (!currentQ || !currentAnswer) return true
    return isAnswered(currentAnswer, currentQ.optional)
  }, [currentQ, currentAnswer, step, contactName, contactEmail])

  const goNext = useCallback(() => {
    if (step === 0) {
      setStartedAt(new Date().toISOString())
      setStep(1)
      return
    }
    if (step > 0 && step < TOTAL) {
      setStep((s) => s + 1)
      return
    }
    if (step === TOTAL) {
      // Move from last question to contact step
      setStep(CONTACT_STEP)
      return
    }
    if (step === CONTACT_STEP) {
      // Submit on confirm
      void submit()
    }
  }, [step])

  const goBack = useCallback(() => {
    if (step > 1) setStep((s) => s - 1)
  }, [step])

  const submittingRef = useRef(false)
  const submit = useCallback(async () => {
    if (submittingRef.current) return
    submittingRef.current = true
    setSubmitting(true)
    setSubmitError(null)
    const finishedAt = new Date().toISOString()
    const localId = `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const payload = {
      client: client.name,
      agencyEmail: agency.email,
      startedAt,
      submittedAt: finishedAt,
      durationSeconds: Math.max(0, Math.floor((Date.parse(finishedAt) - Date.parse(startedAt)) / 1000)),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      contactName: contactName.trim() || undefined,
      contactEmail: contactEmail.trim() || undefined,
      answers,
    }

    // Always snapshot to localStorage first so nothing is ever lost
    try {
      const raw = window.localStorage.getItem(PENDING_KEY)
      const list = raw ? (JSON.parse(raw) as Array<{ id: string } & typeof payload>) : []
      list.push({ id: localId, ...payload })
      window.localStorage.setItem(PENDING_KEY, JSON.stringify(list))
    } catch {
      /* noop */
    }

    // Try remote submit; never block the completion screen on it
    let warning: string | null = null
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        if (res.status === 503) {
          warning = 'Saved locally — the shared store isn\u2019t configured yet, so this copy lives in your browser until we wire it up.'
        } else {
          const text = await res.text().catch(() => '')
          warning = `Saved locally — remote submission returned HTTP ${res.status}${text ? `: ${text}` : ''}.`
        }
      }
    } catch (err) {
      warning = `Saved locally — couldn\u2019t reach the server (${String(err)}).`
    }

    setCompletedAt(finishedAt)
    setStep(COMPLETE_STEP)
    if (warning) setSubmitError(warning)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* noop */
    }
    submittingRef.current = false
    setSubmitting(false)
  }, [answers, startedAt, client.name, agency.email, contactName, contactEmail])

  // Keyboard shortcuts: Enter to continue, ⌘+Enter on text, Escape no-op
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isTypingIn = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA'
      if (e.key === 'Enter') {
        if (isTypingIn && !e.metaKey && !e.ctrlKey) {
          // Allow textarea newline via Shift+Enter; plain Enter advances only if not in textarea
          if (target?.tagName === 'TEXTAREA' && !e.shiftKey) {
            // do nothing — let them type; they can ⌘/Ctrl+Enter to submit
          }
          return
        }
        e.preventDefault()
        if (canAdvance) goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [canAdvance, goNext])

  // Intro screen
  if (step === 0) {
    return (
      <div className="min-h-screen bg-paper text-ink flex flex-col">
        <TopBar step={0} total={TOTAL} clientName={client.name} />
        <IntakeIntro clientName={client.name} onStart={() => goNext()} />
        <div className="flex items-center justify-between px-6 md:px-8 py-4 border-t border-[var(--color-rule)]/15 text-[11px] tracking-[0.12em] uppercase text-ink-2">
          <span>Prepared together · Anchovies × {client.name}</span>
          <span>8–10 min · {TOTAL} questions</span>
        </div>
      </div>
    )
  }

  // Contact step
  if (step === CONTACT_STEP) {
    return (
      <div className="min-h-screen bg-paper text-ink flex flex-col relative">
        <TopBar step={TOTAL} total={TOTAL} clientName={client.name} />
        {resumed && (
          <div
            className="fixed top-[62px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] shadow-sm border"
            style={{
              backgroundColor: 'rgba(30, 63, 229, 0.06)',
              borderColor: 'rgba(30, 63, 229, 0.3)',
              color: 'var(--color-mac)',
            }}
          >
            <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
            <span>Welcome back — picking up where you left off.</span>
          </div>
        )}
        <IntakeContact
          clientName={client.name}
          name={contactName}
          email={contactEmail}
          onChangeName={setContactName}
          onChangeEmail={setContactEmail}
        />
        <BottomBar
          leftHint={<KeyHint keys={['Tab']} label="between fields" />}
          onBack={() => setStep(TOTAL)}
          onNext={goNext}
          nextDisabled={!canAdvance || submitting}
          nextLabel={submitting ? 'Sending…' : 'Submit intake'}
          nextKeyHint="⌘ Enter"
        />
        {submitError && (
          <div className="px-6 md:px-8 pb-4 text-[12px] text-[#b94a48]">{submitError}</div>
        )}
      </div>
    )
  }

  // Complete screen
  if (step === COMPLETE_STEP) {
    const duration = completedAt
      ? Math.max(0, Math.floor((Date.parse(completedAt) - Date.parse(startedAt)) / 1000))
      : 0
    return (
      <>
        <IntakeComplete
          clientName={client.name}
          agencyEmail={agency.email}
          durationSeconds={duration}
          onReview={() => setStep(1)}
          onBack={() => (window.location.href = '/')}
        />
        {submitError && (
          <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-[420px] bg-ink text-paper text-[12px] px-4 py-3 rounded-lg border border-white/20">
            {submitError}
          </div>
        )}
      </>
    )
  }

  // Question screens
  if (!currentQ || !currentAnswer) return null

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col relative">
      <TopBar step={step} total={TOTAL} clientName={client.name} />
      {resumed && (
        <div
          className="fixed bottom-[72px] md:top-[62px] md:bottom-auto left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] shadow-sm border whitespace-nowrap"
          style={{
            backgroundColor: 'rgba(30, 63, 229, 0.06)',
            borderColor: 'rgba(30, 63, 229, 0.3)',
            color: 'var(--color-mac)',
          }}
        >
          <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
          <span className="hidden sm:inline">Welcome back — picking up where you left off.</span>
          <span className="sm:hidden">Resumed</span>
        </div>
      )}
      {currentQ.type === 'multi' && (
        <QuestionMulti q={currentQ} answer={currentAnswer as MultiAnswer} onAnswer={setAnswer} pipedOptions={undefined} />
      )}
      {currentQ.type === 'single' && (
        <QuestionSingle
          q={currentQ}
          answer={currentAnswer as SingleAnswer}
          onAnswer={setAnswer}
          pipedOptions={pipedOptions}
        />
      )}
      {currentQ.type === 'rating' && (
        <QuestionRating q={currentQ} answer={currentAnswer as RatingAnswer} onAnswer={setAnswer} />
      )}
      {currentQ.type === 'text' && (
        <QuestionText q={currentQ} answer={currentAnswer as TextAnswer} onAnswer={setAnswer} />
      )}
      <BottomBar
        leftHint={
          <>
            {currentQ.type === 'multi' && <KeyHint keys={['A', '—', String.fromCharCode(64 + Math.min(26, currentQ.options.length))]} label="toggle" />}
            {currentQ.type === 'single' && <KeyHint keys={['A', '—', String.fromCharCode(64 + Math.min(26, (currentQ.pipeFrom ? pipedOptions?.length ?? 0 : currentQ.options.length)))]} label="pick" />}
            {currentQ.type === 'rating' && <KeyHint keys={['1', '—', String(currentQ.scale)]} label="tap" />}
            {currentQ.type === 'text' && <KeyHint keys={['Shift', '+', 'Enter']} label="new line" />}
          </>
        }
        onBack={step > 1 ? goBack : undefined}
        onNext={goNext}
        nextDisabled={!canAdvance || submitting}
        nextLabel="Continue"
        nextKeyHint="Enter"
        onSkip={currentQ.optional ? goNext : undefined}
        skipLabel={currentQ.optional ? 'Skip' : undefined}
      />
      {submitError && step === TOTAL && (
        <div className="px-8 pb-4 text-[12px] text-[#b94a48]">{submitError}</div>
      )}
    </div>
  )
}
