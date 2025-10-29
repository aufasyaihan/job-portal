export interface Candidate {
  id: string
  attributes: Attribute[]
}

export interface Attribute {
  key: string
  label: string
  value: string
  order: number
}