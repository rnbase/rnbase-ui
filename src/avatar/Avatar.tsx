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

import { Theme, useThemeStyles } from '../theming';

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

export interface Props extends ViewProps {
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

const Avatar: React.FC<Props> = ({
  size,
  shape,
  name,
  email,
  colorize,
  imageSource,
  defaultImageSource,
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

  const styles = useThemeStyles(createStyleSheet, 'Avatar');

  const rootShape = {
    width: size,
    height: size,
    ...(shape === 'circle' && { borderRadius: size / 2 }),
  };

  const initials = useMemo(
    () =>
      name &&
      avatarImageSource === defaultImageSource && {
        color: getColor(name),
        text: getInitials(name),
      },
    [name, defaultImageSource, avatarImageSource],
  );

  if (initials) {
    const rootBgColor = colorize && {
      backgroundColor: initials.color,
    };

    const textFontSize = {
      fontSize: PixelRatio.roundToNearestPixel(size / 2.5),
    };

    return (
      <View {...props} style={[styles.root, style, rootShape, rootBgColor]}>
        <Text style={[styles.text, textStyle, textFontSize]} numberOfLines={1}>
          {initials.text}
        </Text>
      </View>
    );
  }

  return !avatarImageSource ? null : (
    <View {...props} style={[styles.root, style, rootShape]}>
      <Image style={[styles.image, imageStyle]} source={avatarImageSource} onError={onError} />
    </View>
  );
};

Avatar.defaultProps = {
  shape: 'circle',
  colorize: false,
  defaultImageSource: require('./default.png'),
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

export default Avatar;
