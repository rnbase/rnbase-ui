import React from 'react';
import moment from 'moment';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Table, StackBar, Theme, useTheme } from 'rnbase-ui';

function formatDuration(seconds: number) {
  const format = seconds > 3600 ? 'h[h] m[m]' : 'm[m]';
  return moment.utc(seconds * 1000).format(format);
}

const screenTimeData = [
  {
    value: 5800,
    color: '#007aff',
    label: 'Social Networking',
  },
  {
    value: 3800,
    color: '#5ac8fa',
    label: 'Creativity',
  },
  {
    value: 2700,
    color: '#ff9500',
    label: 'Productivity',
  },
  {
    value: 1500,
    color: '#c7c7cc',
  },
];

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const TableScreen: React.FC<Props> = () => {
  const {
    theme: { styles, colors },
  } = useTheme(createStyles);

  const totalTime = screenTimeData.reduce((a, b) => a + (b.value || 0), 0);

  const ScreenTimeSectionHeader = (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>Screen Time</Text>
      <Text style={styles.sectionHeaderDate}>{moment().calendar()}</Text>
    </View>
  );

  const renderLabel = ({ value, color, label }: any, index: number) => {
    return !label ? null : (
      <View key={index}>
        <Text style={[{ color }, styles.screenTimeLegendLabel]}>{label}</Text>
        <Text style={styles.screenTimeLegendLabel}>{formatDuration(value)}</Text>
      </View>
    );
  };

  return (
    <Table style={styles.root}>
      <Table.Section header={ScreenTimeSectionHeader}>
        <Table.Row title="Nick’s iPhone" onPress={() => {}} />
        <Table.Row style={styles.screenTimeRow}>
          <>
            <Text style={styles.screenTimeTotal}>{formatDuration(totalTime)}</Text>
            <StackBar
              size={6}
              separatorWidth={2}
              data={screenTimeData}
              renderLabel={renderLabel}
              legendStyle={styles.screenTimeLegend}
            />
          </>
        </Table.Row>
      </Table.Section>
      <Table.Section separatorInsetLeft={64}>
        <Table.Row
          title="Downtime"
          subtitle="Schedule time away from the screen."
          subtitleStyle={styles.subtitleBig}
          onPress={() => {}}
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
      <Table.Section footer="Use a passcode to secure Screen Time settings and to allow for more time when limits expire.">
        <Table.Button title="Use Screen Time Passcode" onPress={() => {}} />
      </Table.Section>
      <Table.Section footer="You can enable this on any device signed in to iCloud to report your combined screen time.">
        <Table.Row title="Share Across Devices">
          <Switch value={true} />
        </Table.Row>
      </Table.Section>
      <Table.Section footer="Set up Family Sharing to use Screen Time with your family’s devices.">
        <Table.Button title="Set Up Screen Time for Family" onPress={() => {}} />
      </Table.Section>
      <Table.Section>
        <Table.Button color={colors.red} title="Turn Off Screen Time" onPress={() => {}} />
      </Table.Section>

      {/* TODO: The content below should be moved to a separate screen */}

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
        <Table.Button title="Clear Trusted Computers" onPress={() => Alert.alert('Pressed')} />
      </Table.Section>
      <Table.Section header="UI Automation">
        <Table.Row title="Enable UI Automation">
          <Switch value={true} />
        </Table.Row>
        <Table.Row title="Multipath Networking" onPress={() => {}}>
          enabled
        </Table.Row>
        <Table.Row title="Enable Notifications">
          <Switch />
        </Table.Row>
      </Table.Section>
      <Table.Section>
        <Table.Row
          title="Notifications"
          subtitle="Banners, Sounds, Badges"
          disclosure={true}
          subtitleStyle={styles.subtitleSmall}
          image={require('../../assets/settings/notifications.png')}
        />
      </Table.Section>
    </Table>
  );
};

const createStyles = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: colors.gray6,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    sectionHeaderText: {
      ...fonts.normal,
      fontSize: 13,
      color: colors.gray,
      textTransform: 'uppercase',
    },
    sectionHeaderDate: {
      ...fonts.normal,
      fontSize: 13,
      color: colors.gray,
    },
    screenTimeRow: {
      marginVertical: 8,
      alignItems: 'stretch',
      flexDirection: 'column',
    },
    screenTimeTotal: {
      ...fonts.normal,
      fontSize: 27,
      marginBottom: 8,
      color: colors.black,
    },
    screenTimeLegend: {
      justifyContent: 'space-between',
    },
    screenTimeLegendLabel: {
      ...fonts.normal,
      fontSize: 15,
    },
    screenTimeLegendValue: {
      ...fonts.normal,
      fontSize: 15,
      color: colors.black,
    },
    subtitleSmall: {
      fontSize: 12,
    },
    subtitleBig: {
      fontSize: 15,
    },
  });

export default TableScreen;
