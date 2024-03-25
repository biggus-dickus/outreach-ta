import styled from 'styled-components'

export const Container = styled.div`
  max-width: clamp(300px, 550px, 750px);
  padding-right: 10px;
  padding-left: 10px;
  margin-right: auto;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.text};
`

export const Card = styled.div`
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.lightmost};
  border-radius: 5px;
`
