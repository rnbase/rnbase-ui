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
  imageInset?: boolean;
  imageSource?: ImageSourcePropType;
  activeOpacity?: number;
  underlayColor?: string;
  disclosureIndicator?: boolean;
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
  imageInset,
  imageSource,
  activeOpacity = 1,
  underlayColor = colors.underlay,
  disclosureIndicator,
  style,
  titleStyle,
  subtitleStyle,
  imageStyle,
  onPress,
  onHighlightRow,
  onUnhighlightRow,
  ...props
}) => {
  const minHeight = height || subtitle ? 58 : 43;

  const content = (
    <View {...props} style={[{ minHeight }, styles.root, style]}>
      {(imageSource && <Image source={imageSource} style={[styles.image, imageStyle]} />) ||
        (imageInset && <View style={[styles.image, imageStyle]} />)}
      <View style={styles.label}>
        {title && (
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {children}
      {disclosureIndicator !== false && (onPress || disclosureIndicator) && (
        <Image
          source={require('./assets/disclosure-indicator.png')}
          style={styles.disclosureIndicator}
        />
      )}
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
    disclosureIndicator: {
      width: 8,
      height: 12,
      flexShrink: 0,
      marginLeft: 10,
      tintColor: colors.gray3,
    },
  });

export default withTheme(Row, createStyleSheet, 'Table.Row');
