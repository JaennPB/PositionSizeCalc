import React from 'react';
import {Input, InputField, Text} from '@gluestack-ui/themed';
import {InputSlot} from '@gluestack-ui/themed';

type Props = {
  title: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  showInfo?: boolean;
  infoData?: string;
};

const UIInput = ({title, onChangeText, value, showInfo, infoData}: Props) => {
  return (
    <Input
      flex={1}
      borderColor="$secondary500"
      borderRadius={'$lg'}
      variant="outline"
      size="xl"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}>
      <InputField
        placeholderTextColor="$secondary500"
        color="$secondary300"
        onChangeText={onChangeText}
        value={value}
        placeholder={title}
        type="text"
        keyboardType="numeric"
      />
      {showInfo && (
        <InputSlot>
          <Text pr={'$3'} color="$secondary500">
            {infoData}
          </Text>
        </InputSlot>
      )}
    </Input>
  );
};

export default UIInput;
