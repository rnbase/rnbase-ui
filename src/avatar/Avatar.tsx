import React, { useCallback, useEffect, useMemo, useState } from 'react';
import md5 from 'js-md5';
import {
  Image,
  ImageStyle,
  ImageSourcePropType,
  PixelRatio,
  StyleSheet,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';
import Badge, { BadgeProps } from '../badge/Badge';

const getColor = (string: string): string => {
  let hash = 0;

  if (string.length > 0) {
    for (let i = 0; i < string.length; i += 1) {
      /* eslint-disable no-bitwise */
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
      hash &= hash;
      /* eslint-enable no-bitwise */
    }
  }

  return `hsl(${hash % 360}, 75%, 50%)`;
};

const getInitials = (name: string): string => {
  const initials = name.match(/\b\w/g) || [];

  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
};

interface AvatarProps extends ViewProps {
  size: number;
  shape?: 'square' | 'circle';
  name?: string;
  email?: string;
  colorize?: boolean;
  badge?: BadgeProps;
  imageSource?: ImageSourcePropType;
  defaultImageSource?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const Avatar: React.FC<Themed<typeof createStyleSheet, AvatarProps>> = ({
  styles,
  size,
  shape = 'circle',
  name,
  email,
  colorize = false,
  badge,
  imageSource,
  defaultImageSource = require('./default.png'),
  style,
  textStyle,
  imageStyle,
  ...props
}) => {
  const getAvatarImageSource = useCallback(() => {
    if (imageSource) {
      return imageSource;
    } else if (email) {
      const emailHash = md5(email.toLowerCase().trim());
      const pixelSize = PixelRatio.getPixelSizeForLayoutSize(size);

      return { uri: `https://www.gravatar.com/avatar/${emailHash}?s=${pixelSize}&d=404` };
    }

    return defaultImageSource;
  }, [imageSource, email, size, defaultImageSource]);

  const [avatarImageSource, setAvatarImageSource] = useState(getAvatarImageSource);

  useEffect(() => setAvatarImageSource(getAvatarImageSource()), [
    getAvatarImageSource,
    setAvatarImageSource,
  ]);

  const onError = useCallback(() => setAvatarImageSource(defaultImageSource), [defaultImageSource]);

  const shapeStyle = shape === 'circle' ? { borderRadius: size / 2 } : undefined;

  const initials = useMemo(
    () =>
      name &&
      avatarImageSource === defaultImageSource && {
        color: colorize ? getColor(name) : undefined,
        text: getInitials(name),
      },
    [name, colorize, avatarImageSource, defaultImageSource],
  );

  const rootStyles = [
    styles.root,
    style,
    {
      width: size,
      height: size,
    },
    shapeStyle,
  ];

  let content = [];

  if (initials) {
    const textStyles = [
      styles.text,
      textStyle,
      {
        fontSize: PixelRatio.roundToNearestPixel(size / 2.5),
      },
    ];

    if (initials.color) {
      rootStyles.push({ backgroundColor: initials.color });
    }

    content.push(
      <Text key="text" style={textStyles} numberOfLines={1}>
        {initials.text}
      </Text>,
    );
  } else {
    content.push(
      <Image
        key="image"
        style={[styles.image, imageStyle, shapeStyle]}
        source={avatarImageSource}
        onError={onError}
      />,
    );
  }

  if (badge && badge.value) {
    // We need to know the badge's height to shift it slightly to the right and above
    // And because we don't want to calculate the real height, we'll use default values
    const badgeHeight = typeof badge.value === 'number' ? 20 : 10;
    let badgeShift;

    if (shape === 'circle') {
      // We want to place the badge at the point with polar coordinates (r,45°)
      // thus we need to find the distance from the containing square top right corner
      // which can be calculated as x = r - r × sin(45°)
      const edgePoint = (size / 2) * (1 - Math.sin((45 * Math.PI) / 180));

      badgeShift = PixelRatio.roundToNearestPixel(edgePoint - badgeHeight / 2);
    } else {
      badgeShift = PixelRatio.roundToNearestPixel(-badgeHeight / 4);
    }

    const badgeStyles = [
      badge.style,
      {
        top: badgeShift,
        right: badgeShift,
      },
      styles.badge,
    ];

    content.push(<Badge key="badge" {...badge} style={badgeStyles} />);
  }

  return (
    <View {...props} style={rootStyles}>
      {content}
    </View>
  );
};

const createStyleSheet = ({ Colors, Fonts }: Theme) =>
  StyleSheet.create({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.gray,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    text: {
      ...Fonts.bold,
      color: Colors.white,
    },
    badge: {
      zIndex: 1,
      position: 'absolute',
      shadowColor: Colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 1,
    },
  });

export type Props = AvatarProps & WithThemeProps;

export default withTheme(Avatar, createStyleSheet, 'Avatar');
