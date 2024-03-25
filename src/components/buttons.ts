import styled from 'styled-components'

export const IconButton = styled.button`
  position: relative;
  width: 24px;
  height: 24px;
  padding: 0;
  color: ${({ theme }) => theme.colors.lighter};
  border: 1px solid ${({ theme }) => theme.colors.lightest};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.light};
  cursor: pointer;

  svg {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 12px;
    height: 12px;
    pointer-events: none;
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.light};
    border-color: transparent;
  }
`

export const Button = styled.button`
  padding: 0.33rem 0.75rem;
  border: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.light};
  background-color: ${({ theme }) => theme.colors.success};
  border-radius: 2px;
  cursor: pointer;

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
`
