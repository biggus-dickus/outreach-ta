export type TActivity = 'Beer' | 'Call' | 'Coffee' | 'Meeting' | 'Message'

export type TFeedItem = {
  author: string
  contact: string
  description: string
  timestamp: number
  type: TActivity
}
