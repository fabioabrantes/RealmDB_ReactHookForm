import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { PressableProps } from 'react-native';
import moment from 'moment';

import {
  Container,
  Status,
  Content,
  Header,
  Title,
  DescriptionContainer,
  DescriptionText,
  Label,
  Info,
  Footer,
  OrderStyleProps,
  IconButtonDelete
} from './styles';


export type OrderProps = OrderStyleProps & {
  _id: string;
  patrimony: string;
  equipment: string;
  description: string;
  created_at: Date;
}

type Props = PressableProps & {
  data: OrderProps;
  handleDeleteOrder: ()=>void;
};

export function Order({ data,handleDeleteOrder, ...rest }: Props) {
  const theme = useTheme();


  return (
    <Container >
      <Status status={data.status} />

      <Content>
        <Header {...rest}>
          <Title>{data.equipment}</Title>
          <MaterialIcons
            name={data.status === "open" ? "hourglass-empty" : "check-circle"}
            size={24}
            color={data.status === "open" ? theme.COLORS.SECONDARY : theme.COLORS.PRIMARY}
          />
        </Header>

        <DescriptionContainer>
          <DescriptionText>
            {data.description}
          </DescriptionText>
        </DescriptionContainer>

        <Footer>
          <Info>
            <MaterialIcons name="schedule" size={16} color={theme.COLORS.SUBTEXT} />
            <Label>
              {
                moment(data.created_at).format("DD/MM/YYYY - HH:MM")
              }
            </Label>
          </Info>

          <IconButtonDelete onPress={handleDeleteOrder}>
            <MaterialIcons name="delete" size={24} color={theme.COLORS.SUBTEXT} />
          </IconButtonDelete>
        </Footer>
      </Content>
    </Container>
  );
}