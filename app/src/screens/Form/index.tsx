import React from 'react';
import { Alert, StyleSheet, Switch } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Table, Theme, useTheme } from 'rnbase-ui';

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const FormScreen: React.FC<Props> = () => {
  const {
    theme: { styles },
  } = useTheme(createStyles);

  return (
    <Table style={styles.root}>
      <Table.Section header="Appearance">
        <Table.Row>
          <Table.Label>Dark Appearance</Table.Label>
          <Switch />
        </Table.Row>
      </Table.Section>
      <Table.Section
        header="Paired Devices"
        footer="Removing trusted computers will delete all of the records of computers that you have paired
        with previously."
      >
        <Table.Row onPress={() => Alert.alert('Pressed')}>
          <Table.Label>Clear Trusted Computers</Table.Label>
          <Table.Action iconSource={require('../../assets/chevron-right.png')}>change</Table.Action>
        </Table.Row>
      </Table.Section>
      <Table.Section header="UI Automation">
        <Table.Row>
          <Table.Label>Enable UI Automation</Table.Label>
          <Switch value={true} />
        </Table.Row>
        <Table.Separator />
        <Table.Row onPress={() => Alert.alert('Pressed')}>
          <Table.Label>Multipath Networking</Table.Label>
          <Table.Action iconSource={require('../../assets/chevron-right.png')} />
        </Table.Row>
      </Table.Section>
    </Table>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: colors.gray6,
    },
  });

export default FormScreen;
