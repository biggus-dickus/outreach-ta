import { ElementType } from 'react'
import { ThemeProvider } from 'styled-components'

import type { TFeedItem } from './types/entities'
import theme from './styles/theme'

export const withProviders = (Element: ElementType) => (
  <ThemeProvider theme={theme}>
    <Element />
  </ThemeProvider>
)

export const mockFeed: TFeedItem[] = [
  {
    author: 'Ground Control',
    contact: 'Major Tom',
    description: 'Take your protein pills and put your helmet on.',
    timestamp: 1648118461654,
    type: 'Message',
  },
  {
    author: 'Major Tom',
    contact: 'Ground Control',
    description: 'Planet Earth is blue, and there\'s nothing I can do.',
    timestamp: 164811821356,
    type: 'Call',
  },
]
