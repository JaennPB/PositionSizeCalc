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
      borderRadius={'$lg'}
      variant="outline"
      size="lg"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}>
      <InputField
        onChangeText={onChangeText}
        value={value}
        placeholder={title}
        type="text"
        keyboardType="numeric"
      />
      {showInfo && (
        <InputSlot>
          <Text pr={'$3'}>{infoData}</Text>
        </InputSlot>
      )}
    </Input>
  );
};

export default UIInput;
