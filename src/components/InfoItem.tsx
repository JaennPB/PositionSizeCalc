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
      borderColor="$secondary400"
      borderWidth={1}
      py={'$3'}
      px={'$3'}
      borderRadius={'$lg'}
      justifyContent="space-between">
      <Text fontSize={'$md'} fontWeight="$medium" color="$secondary300">
        {title}
      </Text>
      <Text fontSize={'$xl'} fontWeight="$medium" color={color}>
        {value}
      </Text>
    </HStack>
  );
};

export default InfoItem;
