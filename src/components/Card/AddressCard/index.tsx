import React from 'react';
import Typhograph from '@app/components/Typhograph';
import styled from '@app/style/typed-components';
import theme from '@app/style/theme';
import { HighlightText } from '@app/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Container = styled.View`
  margin-top: 10px;
  padding: 20px 30px 30px 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;

const RowBox = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;
const LabelBox = styled.View`
  background: ${(props: any) => theme.color[props.backgroundcolor]};
  border-radius: 12px;
  max-height: 23px;
  min-width: 50px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 5px;
`;

const InfoBox = styled.View`
  width: 90%;
`;

function AddressCard({ item, index, highlight }) {
  return (
    <Container>
      <TouchableOpacity>
        <RowBox>
          <LabelBox backgroundcolor="SKYBLUE2">
            <Typhograph type="ROBOTO" color="WHITE" size={11}>
              도로명
            </Typhograph>
          </LabelBox>
          <InfoBox>
            <HighlightText title={item?.roadAddr} highlight={highlight} />
          </InfoBox>
        </RowBox>
        <RowBox>
          <LabelBox backgroundcolor="GRAY3">
            <Typhograph type="ROBOTO" color="WHITE" size={11}>
              지번
            </Typhograph>
          </LabelBox>
          <InfoBox>
            <HighlightText title={item?.jibunAddr} highlight={highlight} />
          </InfoBox>
        </RowBox>
      </TouchableOpacity>
    </Container>
  );
}

export default AddressCard;
