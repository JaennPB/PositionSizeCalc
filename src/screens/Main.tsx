import React, {useState} from 'react';
import {
  Button,
  ButtonText,
  Center,
  Divider,
  HStack,
  Heading,
  SafeAreaView,
  ScrollView,
  VStack,
} from '@gluestack-ui/themed';
import UIInput from '../components/UIInput';
import InfoItem from '../components/InfoItem';

const Main = () => {
  const [entry, setEntry] = useState<string>('');
  const [stop, setStop] = useState<string>('');
  const [ratio, setRatio] = useState<string>('');
  const [risk, setRisk] = useState<string>('10');
  const [commission, setCommission] = useState<string>('0.0550');
  const [profitLevel, setProfitLevel] = useState<string>('');

  const [posSize, setPosSize] = useState<string>('');
  const [entryCommission, setEntryCommission] = useState<string>('');
  const [exitCommission, setExitCommission] = useState<string>('');
  const [pL, setPL] = useState<string>('');

  function calcDataHandler() {
    if (!entry || !stop || !ratio || !risk || !commission) return;

    const stopLossDistance = +entry - +stop;
    const posSize = +risk / Math.abs(stopLossDistance);
    const profitLevel = +stopLossDistance * +ratio + +entry;
    const entryCommission = (+commission / 100) * (+entry * posSize);
    const exitCommission = (+commission / 100) * (+profitLevel * posSize);
    const expectedPL = +risk * +ratio - +entryCommission - +exitCommission;

    setPosSize(String(posSize.toFixed(4)));
    setEntryCommission(String(entryCommission.toFixed(2)));
    setExitCommission(String(exitCommission.toFixed(2)));
    setPL(String(expectedPL.toFixed(2)));
    setProfitLevel(String(profitLevel.toFixed(2)));
  }

  function resetDataHandler() {
    setEntry('');
    setStop('');
    setRatio('');
    setPosSize('');
    setEntryCommission('');
    setExitCommission('');
    setPL('');
    setProfitLevel('');
    setRisk('10');
    setCommission('0.0550');
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Center px={'$9'} h={'$full'}>
          <VStack gap={'$6'} w={'$full'} py={'$6'}>
            <Heading>Position Calculator</Heading>
            {!posSize && (
              <>
                <HStack gap={'$3'}>
                  <UIInput
                    title="Entry price"
                    onChangeText={setEntry}
                    value={entry}
                  />
                  <UIInput
                    title="Stop loss"
                    onChangeText={setStop}
                    value={stop}
                  />
                </HStack>
                <UIInput
                  title="Risk/reward"
                  onChangeText={setRatio}
                  value={ratio}
                  showInfo
                  infoData="RR Ratio"
                />
                <UIInput
                  title="Risk (USD)"
                  onChangeText={setRisk}
                  value={risk}
                  showInfo
                  infoData="Risk in USD"
                />
                <UIInput
                  title="Commissions %"
                  onChangeText={setCommission}
                  value={commission}
                  showInfo
                  infoData="Commission %"
                />
              </>
            )}
            <Button
              onPress={posSize ? resetDataHandler : calcDataHandler}
              $active-opacity={0.9}
              borderRadius={'$lg'}
              bg="$info700"
              size="lg"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}>
              <ButtonText>{posSize ? 'Reset' : 'Calculate'}</ButtonText>
            </Button>
            <Divider />
            <VStack gap={'$3'} w={'$full'}>
              {posSize && (
                <>
                  <InfoItem
                    title="Position size:"
                    value={posSize}
                    color="$trueGray600"
                  />
                  <InfoItem title="Entry:" value={entry} color="$trueGray600" />
                  <InfoItem
                    title="T/P:"
                    value={profitLevel}
                    color="$trueGray600"
                  />
                  <InfoItem title="S/L:" value={stop} color="$trueGray600" />
                  <InfoItem
                    title="Entry commission:"
                    value={`-$${entryCommission}`}
                    color="$red400"
                  />
                  <InfoItem
                    title="Exit commission:"
                    value={`-$${exitCommission}`}
                    color="$red400"
                  />
                  <InfoItem
                    title="Expected P&L:"
                    value={`+$${pL}`}
                    color="$success300"
                  />
                </>
              )}
            </VStack>
          </VStack>
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
