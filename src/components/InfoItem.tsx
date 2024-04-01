import React from 'react';
import {HStack, Text} from '@gluestack-ui/themed';

type Props = {
  title: string;
  value: string;
  color?: string;
};

const InfoItem = ({title, value, color}: Props) => {
  return (
    <HStack
      alignItems="center"
      borderColor="$trueGray300"
      borderWidth={1}
      py={'$3'}
      px={'$4'}
      borderRadius={'$lg'}
      justifyContent="space-between">
      <Text fontSize={'$md'} fontWeight="$medium">
        {title}
      </Text>
      <Text fontSize={'$lg'} fontWeight="$medium" color={color}>
        {value}
      </Text>
    </HStack>
  );
};

export default InfoItem;
