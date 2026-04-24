import { useContentControl } from '../context/ContentContext'
import { SubmissionsPanel } from './Submissions'

export function SubmissionsView() {
  const { pin } = useContentControl()
  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-10 md:py-14 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Intake submissions</span>
          </div>
          <h1 className="serif text-[40px] leading-[44px] md:text-[56px] md:leading-[60px] tracking-[-0.02em]">
            Who&rsquo;s in the door.
          </h1>
          <p className="text-[14px] leading-[22px] text-ink-2 max-w-[560px]">
            Every completed intake lands here. Click a row for the full answer-by-answer view, or export the lot as JSON or CSV.
          </p>
        </div>
        <SubmissionsPanel pin={pin} />
      </div>
    </div>
  )
}
