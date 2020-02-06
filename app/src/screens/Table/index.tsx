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
        <Table.Row title="Dark Appearance" detail={<Switch />} />
      </Table.Section>
      <Table.Section
        header="Paired Devices"
        footer="Removing trusted computers will delete all of the records of computers that you have paired
        with previously."
      >
        <Table.Button title="Clear Trusted Computers" onPress={() => Alert.alert('Pressed')} />
      </Table.Section>
      <Table.Section header="UI Automation">
        <Table.Row title="Enable UI Automation" detail={<Switch value={true} />} />
        <Table.Row title="Multipath Networking" onPress={() => {}} detail="enabled" />
        <Table.Row title="Enable Notifications" detail={<Switch />} />
      </Table.Section>
      <Table.Section>
        <Table.Row
          title="Notifications"
          subtitle="Banners, Sounds, Badges"
          disclosureIndicator={true}
          image={require('../../assets/settings/notifications.png')}
        />
      </Table.Section>
      <Table.Section separatorInsetLeft={64}>
        <Table.Row
          title="Downtime"
          subtitle="Schedule time away from the screen."
          subtitleStyle={styles.subtitleBig}
          onPress={() => {}}
          disclosureIndicator={false}
          image={require('../../assets/settings/screentime-downtime.png')}
        />
        <Table.Row
          title="Apps Limits"
          subtitle="Set time limits for apps."
          subtitleStyle={styles.subtitleBig}
          onPress={() => {}}
          image={require('../../assets/settings/screentime-limits.png')}
        />
        <Table.Row
          title="Always Allowed"
          subtitle="Choose apps you want at all times."
          subtitleStyle={styles.subtitleBig}
          onPress={() => {}}
          image={require('../../assets/settings/screentime-allowed.png')}
        />
        <Table.Row
          title="Content &amp; Privacy Restrictions"
          subtitle="Block inappropriate content."
          subtitleStyle={styles.subtitleBig}
          onPress={() => {}}
          image={require('../../assets/settings/screentime-blocked.png')}
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
