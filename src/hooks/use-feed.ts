import { useCallback, useEffect, useState } from 'react'

import type { TFeedItem } from 'types/entities'

const useFeed = () => {
  const [data, setData] = useState<TFeedItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // it's an overkill for the project of this kind, but why not:)
    const abortController = new AbortController()

    setLoading(true)
    ;(async () => {
      try {
        const resp = await fetch('/feed.json', { signal: abortController.signal })
        const respJson = await resp.json()
        setData(respJson.data)
      } catch (e) {
        const err = e as Error
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    })()

    return () => {
      abortController.abort()
    }
  }, [])

  const addItem = useCallback((payload: Pick<TFeedItem, 'description' | 'type'>) => {
    const newItem: TFeedItem = {
      ...payload,
      author: 'You',
      contact: 'Milton Romaguera',
      timestamp: Date.now(),
    }
    setData((curr) => [newItem, ...(curr || [])])
  }, [])

  const removeItem = useCallback(
    (ts: number) =>
      setData((curr) =>
        curr?.length ? curr.filter(({ timestamp }) => timestamp !== ts) : [],
      ),
    [],
  )

  const editItem = useCallback((ts: number, descr: string, type?: TFeedItem['type']) => {
    const newData = (data || []).map((it) => {
      if (it.timestamp === ts) {
        return ({
          ...it,
          description: descr,
          type: type || it.type,
        })
      }
      return it
    })
    setData(newData)
  }, [data])

  return {
    data,
    loading,
    error,
    onItemAdd: addItem,
    onItemRemove: removeItem,
    onItemEdit: editItem,
  }
}

export default useFeed
