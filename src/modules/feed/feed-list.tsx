import type { TActivity } from 'types/entities'
import { Trash as TrashIcon } from '@phosphor-icons/react'

import { activityMap, timeSince } from 'utils'
import { activityIconMap } from 'components/icons'
import useFeed from 'hooks/use-feed'

import AddNote from './add-note'
import { IconButton } from 'components/buttons'
import { IconType } from 'components/icons'
import * as S from './styles/feed-list'

const DEFAULT_CONTACT = 'Milton Romaguera'

const getWords = (activity: TActivity): [string, string] =>
  activity === 'Message' ? ['added', 'to'] : ['had', 'with']

const getArticle = (activity: TActivity): string =>
  ['a', 'e', 'i', 'o', 'u'].includes(activity[0]) ? 'an' : 'a'

export default function FeedList() {
  const { data, loading, error, onItemAdd, onItemRemove } = useFeed()

  let content
  if (error) content = <S.Text role="alert">{error}</S.Text>
  if (loading) content = <S.Text>Loading&hellip;</S.Text>
  if (data) {
    content =
      data.length ? (
        <S.List>
          {data.map(({ author, contact, description, timestamp, type }) => {
            const [verb, preposition] = getWords(type)
            const Icon = activityIconMap[type]

            return (
              <S.ListItem key={timestamp}>
                <S.FeedInfo>
                  <S.Time dateTime={new Date(timestamp).toISOString()}>
                    {timeSince(timestamp)}
                  </S.Time>
                  <IconType as="span" title={type}>
                    <Icon aria-hidden="true" />
                  </IconType>
                </S.FeedInfo>

                <S.FeedCard>
                  <div>
                    <S.Title>
                      <mark>{author}</mark>{' '}
                      {verb} {getArticle(type)} {activityMap[type]} {preposition}{' '}
                      <mark>{contact}</mark>
                    </S.Title>
                    <S.Description>{description}</S.Description>
                  </div>

                  <IconButton
                    className="active"
                    onClick={() => onItemRemove(timestamp)}
                    title="Delete"
                    type="button"
                  >
                    <TrashIcon aria-hidden="true" />
                  </IconButton>
                </S.FeedCard>
              </S.ListItem>
            )
          })}
        </S.List>
      ) : (
        <S.Text>The feed is currently empty.</S.Text>
      )
  }

  return (
    <S.FeedContainer as="section">
      <h1 className="visually-hidden">Activity Feed</h1>
      <AddNote contact={data?.[0]?.contact || DEFAULT_CONTACT} onSubmit={onItemAdd} />
      {content}
    </S.FeedContainer>
  )
}
