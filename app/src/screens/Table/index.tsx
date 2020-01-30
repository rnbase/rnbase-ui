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

const TableScreen: React.FC<Props> = () => {
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
          <Table.Action>change</Table.Action>
        </Table.Row>
      </Table.Section>
      <Table.Section header="UI Automation">
        <Table.Row title="Enable UI Automation">
          <Switch value={true} />
        </Table.Row>
        <Table.Row title="Multipath Networking" onPress={() => {}} />
        <Table.Row title="Enable Notifications">
          <Switch />
        </Table.Row>
      </Table.Section>
      <Table.Section>
        <Table.Row
          title="Notifications"
          subtitle="Banners, Sounds, Badges"
          disclosureIndicator={true}
          imageSource={require('../../assets/settings/notifications.png')}
        />
      </Table.Section>
      <Table.Section>
        <Table.Row
          title="Downtime"
          subtitle="Schedule time away from the screen."
          subtitleStyle={styles.subtitleBig}
          onPress={() => {}}
          disclosureIndicator={false}
          imageSource={require('../../assets/settings/screentime-downtime.png')}
        />
        <Table.Row
          title="Apps Limits"
          subtitle="Set time limits for apps."
          subtitleStyle={styles.subtitleBig}
          onPress={() => {}}
          imageSource={require('../../assets/settings/screentime-limits.png')}
        />
        <Table.Row
          title="Always Allowed"
          subtitle="Choose apps you want at all times."
          subtitleStyle={styles.subtitleBig}
          onPress={() => {}}
          imageSource={require('../../assets/settings/screentime-allowed.png')}
        />
        <Table.Row
          title="Content &amp; Privacy Restrictions"
          subtitle="Block inappropriate content."
          subtitleStyle={styles.subtitleBig}
          onPress={() => {}}
          imageSource={require('../../assets/settings/screentime-blocked.png')}
        />
      </Table.Section>
    </Table>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: colors.gray6,
    },
    subtitleBig: {
      fontSize: 15,
    },
  });

export default TableScreen;