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

import { Stylized, Theme, WithThemeProps, withTheme } from '../theming';

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
  imageSource?: ImageSourcePropType;
  defaultImageSource?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const Avatar: React.FC<Stylized<typeof createStyleSheet, AvatarProps>> = ({
  styles,
  size,
  shape = 'circle',
  name,
  email,
  colorize = false,
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
    } else {
      return defaultImageSource;
    }
  }, [imageSource, email, size, defaultImageSource]);

  const [avatarImageSource, setAvatarImageSource] = useState(getAvatarImageSource);

  useEffect(() => setAvatarImageSource(getAvatarImageSource()), [
    getAvatarImageSource,
    setAvatarImageSource,
  ]);

  const onError = useCallback(() => setAvatarImageSource(defaultImageSource), [defaultImageSource]);

  const shapeStyles = (stylesArray: Array<any>) => {
    if (shape === 'circle') {
      stylesArray.push({ borderRadius: size / 2 });
    }

    return stylesArray;
  };

  const initials = useMemo(
    () =>
      name &&
      avatarImageSource === defaultImageSource && {
        color: colorize ? getColor(name) : undefined,
        text: getInitials(name),
      },
    [name, colorize, avatarImageSource, defaultImageSource],
  );

  const rootStyles = shapeStyles([
    styles.root,
    style,
    {
      width: size,
      height: size,
    },
  ]);

  let content;

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

    content = (
      <Text style={textStyles} numberOfLines={1}>
        {initials.text}
      </Text>
    );
  } else {
    const imageStyles = shapeStyles([styles.image, imageStyle]);

    content = <Image style={imageStyles} source={avatarImageSource} onError={onError} />;
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
      overflow: 'hidden',
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
  });

export type Props = AvatarProps & WithThemeProps;

export default withTheme(Avatar, createStyleSheet, 'Avatar');
