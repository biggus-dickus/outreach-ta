import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { TFeedItem } from 'types/entities'
import { mockFeed, withProviders } from 'mocks'
import useFeed from 'hooks/use-feed'

import FeedList from './feed-list'

jest.mock('hooks/use-feed', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  }
})

const mockUseFeed = useFeed as jest.MockedFunction<typeof useFeed>

describe('Feed list: the basics', () => {
  afterEach(() => jest.clearAllMocks())

  it('displays a loading message when data fetching is in progress', () => {
    mockUseFeed.mockReturnValue({
      data: null,
      loading: true,
      error: '',
      onItemAdd: jest.fn(),
      onItemRemove: jest.fn(),
    })

    render(withProviders(FeedList))
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('shows respective message when no data is loaded', () => {
    mockUseFeed.mockReturnValue({
      data: [],
      loading: false,
      error: '',
      onItemAdd: jest.fn(),
      onItemRemove: jest.fn(),
    })

    render(withProviders(FeedList))
    expect(screen.getByText('The feed is currently empty.')).toBeInTheDocument()
  })

  it('displays an error (if it occurs)', () => {
    const error = 'An error occurred'
    mockUseFeed.mockReturnValue({
      data: null,
      loading: false,
      error,
      onItemAdd: jest.fn(),
      onItemRemove: jest.fn(),
    })

    render(withProviders(FeedList))
    expect(screen.getByText(error)).toBeInTheDocument()
  })

  it('displays data when loaded', () => {
    mockUseFeed.mockReturnValue({
      data: mockFeed,
      loading: false,
      error: '',
      onItemAdd: jest.fn(),
      onItemRemove: jest.fn(),
    })

    render(withProviders(FeedList))
    expect(screen.getByText(mockFeed[0].description)).toBeInTheDocument()
  })
})

describe('Feed list: interactivity', () => {
  afterEach(() => jest.clearAllMocks())

  it('allows the user to add an item', async () => {
    let mockFeedCp = [...mockFeed]
    const onItemAdd = jest.fn((note) => {
      const newItem: TFeedItem = {
        ...note,
        author: 'Major Tom',
        contact: 'Ground Control',
        timestamp: Date.now(),
      }
      mockFeedCp = [newItem, ...mockFeedCp]
    })

    mockUseFeed.mockImplementation(() => ({
      data: mockFeedCp,
      loading: false,
      error: '',
      onItemAdd: onItemAdd,
      onItemRemove: jest.fn(),
    }))

    const { rerender } = render(withProviders(FeedList))

    const text = 'For here am I floating in my tin can'

    await userEvent.type(screen.getByRole('textbox'), text)
    await userEvent.click(screen.getByTestId('at-beer-btn'))
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => expect(onItemAdd).toHaveBeenCalledTimes(1))

    rerender(withProviders(FeedList))

    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(text)
    expect(screen.getAllByRole('listitem')).toHaveLength(mockFeedCp.length)
    expect(screen.getByTitle(/beer/i)).toBeInTheDocument()
  })

  it('allows the user to remove an item', async () => {
    let mockFeedCp = [...mockFeed]
    const onItemRemove = jest.fn((ts) => {
      mockFeedCp = mockFeedCp.filter((it) => it.timestamp !== ts)
    })

    mockUseFeed.mockImplementation(() => ({
      data: mockFeedCp,
      loading: false,
      error: '',
      onItemAdd: jest.fn(),
      onItemRemove,
    }))

    const { rerender } = render(withProviders(FeedList))

    await userEvent.click(screen.getAllByTitle('Delete')[0])
    await waitFor(() => expect(onItemRemove).toHaveBeenCalledTimes(1))

    rerender(withProviders(FeedList))

    expect(screen.queryByText(mockFeed[0].description)).not.toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(mockFeedCp.length)
  })
})
