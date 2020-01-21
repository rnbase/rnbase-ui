import React, { useCallback, useEffect, useMemo, useState } from 'react';
import md5 from 'js-md5';
import {
  Image,
  ImageStyle,
  ImageSourcePropType,
  LayoutChangeEvent,
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
import { getColor, getInitials, getRadius } from '../helpers';
import Badge, { Props as BadgeProps } from '../badge/Badge';

interface AvatarProps extends ViewProps {
  size?: number;
  cornerRadius?: number | string;
  name?: string;
  email?: string;
  colorize?: boolean;
  badge?: BadgeProps;
  badgePosition?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
  imageSource?: ImageSourcePropType;
  defaultImageSource?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const Avatar: React.FC<Themed<typeof createStyleSheet, AvatarProps>> = ({
  theme: { styles },
  size = 50,
  cornerRadius = '50%',
  name,
  email,
  colorize = false,
  badge,
  badgePosition = 'top-right',
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

  const [badgeHeight, setBadgeHeight] = useState(10);
  const [imageHeight, setImageHeight] = useState(size);
  const [avatarImageSource, setAvatarImageSource] = useState(getAvatarImageSource);

  useEffect(() => setAvatarImageSource(getAvatarImageSource()), [
    getAvatarImageSource,
    setAvatarImageSource,
  ]);

  const onError = useCallback(() => setAvatarImageSource(defaultImageSource), [defaultImageSource]);

  const onImageLayout = useCallback((event: LayoutChangeEvent) => {
    setImageHeight(event.nativeEvent.layout.height);
  }, []);

  const onBadgeLayout = useCallback((event: LayoutChangeEvent) => {
    setBadgeHeight(event.nativeEvent.layout.height);
  }, []);

  const initials = useMemo(
    () =>
      name &&
      avatarImageSource === defaultImageSource && {
        color: colorize ? getColor(name) : undefined,
        text: getInitials(name),
      },
    [name, colorize, avatarImageSource, defaultImageSource],
  );

  const borderRadius = getRadius(cornerRadius, size);

  const badgeOffset = useMemo(() => {
    // We want to place the badge at the point with polar coordinates (r,45°)
    // thus we need to find the distance from the containing square top right corner
    // which can be calculated as x = r - r × sin(45°)
    // Self offset is how much we’ll shift the badge from the edge point,
    // its value ranges from badgeHeight / 4 (square) to badgeHeight / 2 (circle)
    const selfOffset = badgeHeight * (0.25 + borderRadius / (size * 2));
    const edgeOffset = borderRadius * (1 - Math.sin((45 * Math.PI) / 180));

    return PixelRatio.roundToNearestPixel(edgeOffset - selfOffset);
  }, [badgeHeight, borderRadius, size]);

  const rootStyles = [
    {
      width: size,
      height: size,
      borderRadius,
    },
    styles.root,
    style,
  ];

  let content = [];

  if (initials) {
    const fontSize = PixelRatio.roundToNearestPixel(size / 2.5);

    content.push(
      <Text key="text" style={[{ fontSize }, styles.text, textStyle]} numberOfLines={1}>
        {initials.text}
      </Text>,
    );

    if (initials.color) {
      rootStyles.push({ backgroundColor: initials.color });
    }
  } else {
    const imageRadius = borderRadius - (size - imageHeight) / 2;

    content.push(
      <Image
        key="image"
        style={[{ borderRadius: imageRadius }, styles.image, imageStyle]}
        source={avatarImageSource}
        onLayout={onImageLayout}
        onError={onError}
      />,
    );
  }

  if (badge) {
    const [badgeY, badgeX] = badgePosition.split('-');
    const badgeStyles = [
      {
        [badgeY]: badgeOffset,
        [badgeX]: badgeOffset,
      },
      styles.badge,
      badge.style,
    ];

    content.push(<Badge key="badge" {...badge} style={badgeStyles} onLayout={onBadgeLayout} />);
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
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.gray2,
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
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 1,
    },
  });

export type Props = AvatarProps & WithThemeProps;

export default withTheme(Avatar, createStyleSheet, 'Avatar');
