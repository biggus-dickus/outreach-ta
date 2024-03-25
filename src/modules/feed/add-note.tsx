import { FormEvent, KeyboardEventHandler, memo, useRef, useState } from 'react'
import clsx from 'clsx'
import { ListBullets } from '@phosphor-icons/react'

import type { TActivity, TFeedItem } from 'types/entities'
import { activityIconMap } from 'components/icons'

import { Button, IconButton } from 'components/buttons'
import * as S from './styles/add-note'

const buttons: TActivity[] = ['Message', 'Call', 'Coffee', 'Beer', 'Meeting']
const initialType = buttons[0]

type PropTypes = {
  contact: string
  onSubmit: (note: Pick<TFeedItem, 'description' | 'type'>) => void
}

const AddNote = ({ contact, onSubmit }: PropTypes) => {
  const [type, setType] = useState<TActivity>(initialType)
  const [isActive, setIsActive] = useState(false)

  // Yes, this WILL rerender other elements (only form buttons, sheesh!) on typing.
  // It can be addressed by using the `useRef` hook, however the performance gain is negligible
  // compared to the losses in code simplicity and maintainability.
  // There are many annoying and unnecessary adjustments, which I'll have to make if I go with the `useRef` path.
  // It's simply not worth it.
  const [description, setDescription] = useState('')

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const hasText = description.trim().length > 0

  const _sendData = () => {
    if (hasText) {
      onSubmit({ description, type })
      setType(initialType)
      setDescription('')
      setIsActive(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    _sendData()
  }

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const isCtrlKey = e.ctrlKey || e.metaKey
    if (isCtrlKey && e.key === 'Enter') {
      _sendData()
      inputRef.current?.blur()
    }
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.FormDecoration as="span">
        <ListBullets aria-hidden="true" />
      </S.FormDecoration>
      <S.FormBody>
        <S.TextInput
          className={clsx({ active: isActive })}
          value={description}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(hasText)}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Add a note about ${contact}…`}
          ref={inputRef}
        />

        {isActive && (
          <S.FormFooter>
            <S.ButtonRow>
              {buttons.map((btn) => {
                const Icon = activityIconMap[btn]
                return (
                  <IconButton
                    key={btn}
                    className={clsx({ active: type === btn })}
                    data-testid={`at-${btn.toLowerCase()}-btn`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setType(btn)}
                    title={btn}
                    type={'button'}>
                    <Icon aria-hidden="true" />
                  </IconButton>
                )
              })}
            </S.ButtonRow>

            <Button type="submit" disabled={!hasText}>Submit</Button>
          </S.FormFooter>
        )}
      </S.FormBody>
    </S.Form>
  )
}

export default memo(AddNote)
