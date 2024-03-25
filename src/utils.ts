import { TActivity } from './types/entities'
import { Millisecond } from './constants'

export const activityMap: { [a in TActivity]: string } = {
  Beer: 'beer',
  Call: 'call',
  Coffee: 'coffee',
  Meeting: 'meeting',
  Message: 'note',
}

export const timeSince = (date: number) => {
  const ms = Date.now() - date

  let interval = Math.floor(ms / Millisecond.YEAR)
  if (interval >= 1) return interval + 'yr'

  interval = Math.floor(ms / Millisecond.MONTH)
  if (interval >= 1) return interval + 'mo'

  interval = Math.floor(ms / Millisecond.DAY)
  if (interval >= 1) return interval + 'd'

  interval = Math.floor(ms / Millisecond.HOUR)
  if (interval >= 1) return interval + 'h'

  interval = Math.floor(ms / Millisecond.MINUTE)
  if (interval >= 1) return interval + 'm'

  return 'now'
}
