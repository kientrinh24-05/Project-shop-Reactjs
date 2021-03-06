import styled from 'styled-components'

export const SortBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: rgba(0, 0, 0, 0.03);
  padding: 1.25rem 1.5rem;
  border-radius: 2px;
  width: 900px;
  margin-bottom: 1.5rem;
`
export const SortBarLable = styled.span``
export const SortBarOption = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-grow: 1;
`
export const SortByOptions = styled.div`
  flex: 0 0 auto;
  cursor: pointer;
  background: #fff;
  margin-left: 1rem;
  height: 3.25rem;
  padding: 0 1.5rem;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-items: center;
  text-transform: capitalize;
  &.active {
    color: #fff;
    background: #ee4d2d;
  }
`
export const SortPrice = styled.select`
  flex: 0 0 auto;
  margin-left: 1rem;
  height: 3.25rem;
  border: 0;
  padding: 0 1.5rem;
  &.active {
    color: #ee4d2d;
  }
`

export const MinipageControler = styled.div`
  display: flex;
  align-items: center;
`
export const MinipageControlerState = styled.div`
  display: flex;
  margin-right: 1rem;
`
export const MinipageControlerCurrentState = styled.div`
  color: #ee4d2d;
`
export const MinipageControlerTotalState = styled.div``
export const ButtonControler = styled.button`
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 3.4rem;
  border-radius: 2px;
  border: 0;
  background-color: ${({ disabled }) => (disabled ? '#f9f9f9' : '#fff')};
  svg {
    width: 0.625rem;
    height: 0.625rem;
    fill: ${({ disabled }) => (disabled ? '#ccc' : '#555')};
    margin-top: 0.125rem;
  }
`
export const ButtonControlerPrew = styled(ButtonControler)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 1px solid #f2f2f2;
`
export const ButtonControlerNext = styled(ButtonControler)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`
export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
`
