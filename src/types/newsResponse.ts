import { Article } from './article'

export interface NewsResponse {
  articles: Article[]
  status: 'ok' | 'error'
  message?: string
  totalResults: number
}
