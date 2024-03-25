import type { ElementType } from 'react'
import { BeerStein, ChatCircle, Coffee, Phone, User } from '@phosphor-icons/react'
import styled from 'styled-components'

import { IconButton } from 'components/buttons'

import type { TActivity } from 'types/entities'

export const activityIconMap: { [a in TActivity]: ElementType } = {
  Beer: BeerStein,
  Call: Phone,
  Coffee,
  Meeting: User,
  Message: ChatCircle,
}

export const IconType = styled(IconButton)`
  display: block;
  cursor: default;
  flex-shrink: 0;
`
