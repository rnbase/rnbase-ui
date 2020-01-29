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
        <Table.Row title="Dark Appearance">
          <Switch />
        </Table.Row>
      </Table.Section>
      <Table.Section
        header="Paired Devices"
        footer="Removing trusted computers will delete all of the records of computers that you have paired
        with previously."
      >
        <Table.Row title="Clear Trusted Computers" onPress={() => Alert.alert('Pressed')}>
          <Table.Action iconSource={require('../../assets/chevron-right.png')}>change</Table.Action>
        </Table.Row>
      </Table.Section>
      <Table.Section header="UI Automation">
        <Table.Row title="Enable UI Automation">
          <Switch value={true} />
        </Table.Row>
        <Table.Separator />
        <Table.Row title="Multipath Networking" onPress={() => Alert.alert('Pressed')}>
          <Table.Action iconSource={require('../../assets/chevron-right.png')} />
        </Table.Row>
      </Table.Section>
      <Table.Section>
        <Table.Row title="Notifications" subtitle="Banners, Sounds, Badges" />
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
