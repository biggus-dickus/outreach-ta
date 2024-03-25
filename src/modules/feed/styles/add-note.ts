import styled from 'styled-components'

import { Card } from 'components/wrappers'
import { IconButton } from 'components/buttons'

export const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const FormBody = styled(Card)`
  flex-grow: 1;
`

export const FormDecoration = styled(IconButton)`
  cursor: default;
  flex-shrink: 0;
  margin-top: 10px;
  margin-left: 20px;
  transform: translateX(4px);
`

export const TextInput = styled.textarea`
  min-width: 100%;
  max-width: 100%;
  height: 2rem;
  min-height: 2rem;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.lightest};
  font-size: 12px;
  line-height: 1.5;
  outline: none;

  &:focus,
  &.active {
    outline: 2px solid ${({ theme }) => theme.colors.success};
    border-color: transparent;
    height: 3.35rem;
  }
`

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`

export const ButtonRow = styled.div`
  display: flex;
  gap: .25rem;
`
