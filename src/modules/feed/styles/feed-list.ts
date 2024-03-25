import styled from 'styled-components'

import { Card, Container } from 'components/wrappers'
import { IconButton } from 'components/buttons'

export const FeedContainer = styled(Container)`
  position: relative;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 45px;
    bottom: 0;
    width: 1px;
    background-color: ${({ theme }) => theme.colors.lightest};
  }
`

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export const ListItem = styled.li`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`

export const FeedInfo = styled.div`
  display: flex;
  align-items: center;
  align-self: baseline;
  justify-content: space-around;
  width: 10%;
  padding-top: 0.5rem;
  margin-right: 0.5rem;
`

export const FeedCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  gap: 0.75rem;

  ${IconButton} {
    display: none;
  }

  &:hover ${IconButton} {
    display: block;
  }
`

export const Time = styled.time`
  font-size: 10px;
  line-height: 1;
`

export const Title = styled.p`
  margin: 0;
  font-size: 14px;

  mark {
    background-color: transparent;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const Description = styled.small`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey};
`

export const Text = styled.p`
  text-indent: 3rem;
  font-size: 12px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.grey};
`
