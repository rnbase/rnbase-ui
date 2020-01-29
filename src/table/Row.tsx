import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewProps,
} from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface RowProps extends ViewProps {
  children?: React.ReactNode;
  height?: number;
  title?: string;
  subtitle?: string;
  imageSource?: ImageSourcePropType;
  activeOpacity?: number;
  underlayColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
  onHighlightRow?: () => void;
  onUnhighlightRow?: () => void;
}

const Row: React.FC<Themed<typeof createStyleSheet, RowProps>> = ({
  theme: { styles, colors },
  children,
  height,
  title,
  subtitle,
  imageSource,
  activeOpacity = 1,
  underlayColor = colors.underlay,
  style,
  titleStyle,
  subtitleStyle,
  imageStyle,
  onPress,
  onHighlightRow,
  onUnhighlightRow,
  ...props
}) => {
  const titleText = title && (
    <Text key="title" style={[styles.title, titleStyle]} numberOfLines={1}>
      {title}
    </Text>
  );

  const subtitleText = subtitle && (
    <Text key="subtitle" style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
      {subtitle}
    </Text>
  );

  const minHeight = height || subtitle ? 58 : 43;

  const content = (
    <View {...props} style={[{ minHeight }, styles.root, style]}>
      {imageSource && <Image source={imageSource} style={[styles.image, imageStyle]} />}
      <View key="label" style={styles.label}>
        {titleText}
        {subtitleText}
      </View>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableHighlight
        onPress={onPress}
        onPressIn={onHighlightRow}
        onPressOut={onUnhighlightRow}
        activeOpacity={activeOpacity}
        underlayColor={underlayColor}
      >
        {content}
      </TouchableHighlight>
    );
  }

  return content;
};

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
    },
    label: {
      flexGrow: 1,
    },
    title: {
      ...fonts.normal,
      fontSize: 17,
      color: colors.black,
    },
    subtitle: {
      ...fonts.normal,
      fontSize: 12,
      marginTop: 3,
      color: colors.gray,
    },
    image: {
      width: 29,
      height: 29,
      flexShrink: 0,
      marginRight: 15,
    },
  });

export default withTheme(Row, createStyleSheet, 'Table.Row');
