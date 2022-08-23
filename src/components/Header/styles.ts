import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Greeting = styled.View``;

export const Title = styled.Text`
  font-family: ${({theme})=>theme.FONTS.heading};
  font-size: 24px;
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  font-family: ${({theme})=>theme.FONTS.body};
  font-size: 13px;
  color: ${({ theme }) => theme.COLORS.SUBTEXT};
`;