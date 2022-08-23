import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  margin: 44px 0;
`;

export const Title = styled.Text`
  font-family: ${({theme})=>theme.FONTS.heading};
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.TEXT};
  align-self: center;
`;

export const Form = styled.View`
  width: 100%;
  margin: 32px 0
`;

export const Footer = styled.View``;