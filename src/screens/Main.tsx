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
  const [entry, setEntry] = useState<string>('162.07');
  const [stop, setStop] = useState<string>('161.58');

  const [accountSize, setAccountSize] = useState<string>('1000');
  const [risk, setRisk] = useState<string>('1');
  const [ratio, setRatio] = useState<string>('2');
  const [commission, setCommission] = useState<string>('0.0550');

  const [posSize, setPosSize] = useState<string>('');
  const [totalCommissionTP, setTotalCommissionTP] = useState<string>('');
  const [totalCommissionSL, setTotalCommissionSL] = useState<string>('');
  const [profitPL, setProfitPL] = useState<string>('');
  const [lossPL, setLossPL] = useState<string>('');
  const [tp2x, setTp2x] = useState<string>('');

  function calcDataHandler() {
    if (!entry || !stop || !ratio || !risk || !commission) return;

    //! initial calculations (risk, positions size, tp2x)
    const initialRiskPerTrade = +accountSize * (+risk / 100);
    const stopLossDistance = +entry - +stop;
    const initialPosSize = +initialRiskPerTrade / Math.abs(stopLossDistance);
    const tp2x = stopLossDistance * +ratio + +entry;

    //! commissions (entry and exit (sl and tp))
    const entryCommission = (+commission / 100) * +entry * initialPosSize;
    const exitCommissionTP = (+commission / 100) * tp2x * initialPosSize;
    const exitCommissionSL = (+commission / 100) * +stop * initialPosSize;
    const totalCommissionsTP = entryCommission + exitCommissionTP;
    const totalCommissionsSL = entryCommission + exitCommissionSL;

    //! adjusted position size
    const finalRiskPerTrade = initialRiskPerTrade - totalCommissionsSL;
    const finalPositionSize = finalRiskPerTrade / Math.abs(stopLossDistance);

    //! P&Ls tp and sl
    const grossProfitPL = +initialRiskPerTrade * +ratio;
    const profitPL = grossProfitPL - exitCommissionTP;
    const grossLossPL = +finalRiskPerTrade;
    const lossPL = grossLossPL + exitCommissionSL;

    setTp2x(String(tp2x.toFixed(2)));
    setProfitPL(String(profitPL.toFixed(2)));
    setLossPL(String(lossPL.toFixed(2)));
    setPosSize(String(finalPositionSize.toFixed(2)));
    setTotalCommissionTP(totalCommissionsTP.toFixed(2));
    setTotalCommissionSL(totalCommissionsSL.toFixed(2));
  }

  function resetDataHandler() {
    setTp2x('');
    setProfitPL('');
    setEntry('');
    setStop('');
    setPosSize('');
    setTotalCommissionTP('');
    setTotalCommissionSL('');
    setAccountSize('1000');
    setRatio('2');
    setRisk('1');
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
                title="Account size"
                onChangeText={setAccountSize}
                value={accountSize}
                showInfo
                infoData="Account size"
              />
              <UIInput
                title="Risk %"
                onChangeText={setRisk}
                value={risk}
                showInfo
                infoData="Risk %"
              />
              <UIInput
                title="Risk/reward"
                onChangeText={setRatio}
                value={ratio}
                showInfo
                infoData="RR Ratio"
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
              <InfoItem title="T/P 2x:" value={tp2x} color="$success300" />
              <InfoItem title="Entry:" value={entry} color="$secondary300" />
              <InfoItem title="S/L:" value={stop} color="$red400" />
              <Box h={1} />
              <InfoItem
                title="T/P commissions:"
                value={`-$${totalCommissionTP}`}
                color="$success300"
              />
              <InfoItem
                title="T/P P&L:"
                value={`+$${profitPL}`}
                color="$success300"
              />
              <InfoItem
                title="S/L commissions:"
                value={`-$${totalCommissionSL}`}
                color="$red400"
              />
              <InfoItem
                title="S/L P&L:"
                value={`+$${lossPL}`}
                color="$red400"
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
