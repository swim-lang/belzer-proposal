export type MultiAnswer = {
  type: 'multi'
  selected: string[]
  other?: string
}
export type SingleAnswer = {
  type: 'single'
  selected: string | null
  other?: string
  followUp?: string
}
export type RatingAnswer = {
  type: 'rating'
  value: number | null
}
export type TextAnswer = {
  type: 'text'
  value: string
}
export type Answer = MultiAnswer | SingleAnswer | RatingAnswer | TextAnswer

export type Answers = Record<string, Answer>

export type Submission = {
  id: string
  client: string
  startedAt: string
  submittedAt: string
  durationSeconds: number
  userAgent?: string
  answers: Answers
}
