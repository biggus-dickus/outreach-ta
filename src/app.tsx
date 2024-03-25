import { ThemeProvider } from 'styled-components'

import theme from './styles/theme'
import FeedList from './modules/feed/feed-list'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <FeedList />
    </ThemeProvider>
  )
}
