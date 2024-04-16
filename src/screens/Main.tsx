import React, {useState} from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Heading,
  ScrollView,
  VStack,
} from '@gluestack-ui/themed';
import UIInput from '../components/UIInput';
import InfoItem from '../components/InfoItem';

const Main = () => {
  const [entry, setEntry] = useState<string>('');
  const [stop, setStop] = useState<string>('');
  const [ratio, setRatio] = useState<string>('2');
  const [risk, setRisk] = useState<string>('10');
  const [commission, setCommission] = useState<string>('0.0550');
  const [profitLevel, setProfitLevel] = useState<string>('');
  const [posSize, setPosSize] = useState<string>('');
  const [entryCommission, setEntryCommission] = useState<string>('');
  const [exitCommission, setExitCommission] = useState<string>('');
  const [totalCommission, setTotalCommission] = useState<string>('');
  const [pL, setPL] = useState<string>('');

  function calcDataHandler() {
    if (!entry || !stop || !ratio || !risk || !commission) return;

    const stopLossDistance = +entry - +stop;
    const posSize = +risk / Math.abs(stopLossDistance);
    const profitLevel = +stopLossDistance * +ratio + +entry;
    const entryCommission = (+commission / 100) * (+entry * posSize);
    const exitCommission = (+commission / 100) * (+profitLevel * posSize);
    const totalCommission = +entryCommission + +exitCommission;
    const expectedPL = +risk * +ratio - +entryCommission - +exitCommission;

    setPosSize(String(posSize.toFixed(4)));
    setEntryCommission(String(entryCommission.toFixed(2)));
    setExitCommission(String(exitCommission.toFixed(2)));
    setTotalCommission(String(totalCommission.toFixed(2)));
    setPL(String(expectedPL.toFixed(2)));
    setProfitLevel(String(profitLevel.toFixed(0)));
  }

  function resetDataHandler() {
    setEntry('');
    setStop('');
    setPosSize('');
    setEntryCommission('');
    setExitCommission('');
    setTotalCommission('');
    setPL('');
    setProfitLevel('');
    setRatio('2');
    setRisk('10');
    setCommission('0.0550');
  }

  return (
    <ScrollView bg="$secondary950">
      <Center px={'$9'} pt={'$12'}>
        <VStack gap={'$6'} w={'$full'} py={'$6'}>
          <Heading size="xl" color="$secondary100">
            Position Size Calculator
          </Heading>
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
              <Box h={1} />
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
              <Box h={1} />
            </>
          )}
          {posSize && (
            <>
              <InfoItem
                title="Position size:"
                value={posSize}
                color="$secondary300"
              />
              <Box h={1} />
              <InfoItem title="Entry:" value={entry} color="$secondary300" />
              <InfoItem title="T/P:" value={profitLevel} color="$success300" />
              <InfoItem title="S/L:" value={stop} color="$red400" />
              <Box h={1} />
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
                title="Total commissions:"
                value={`-$${totalCommission}`}
                color="$red400"
              />
              <InfoItem
                title="Expected P&L:"
                value={`+$${pL}`}
                color="$success300"
              />
              <Box h={1} />
            </>
          )}
          <Button
            onPress={posSize ? resetDataHandler : calcDataHandler}
            borderRadius={'$lg'}
            $active-opacity={0.9}
            bg="$primary600"
            size="lg"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}>
            <ButtonText>{posSize ? 'Reset' : 'Calculate'}</ButtonText>
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default Main;
