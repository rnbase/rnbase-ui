import React, { Children, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle, ViewProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

import Separator from './Separator';

interface SectionProps extends ViewProps {
  header?: string;
  footer?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<TextStyle>;
  footerStyle?: StyleProp<TextStyle>;
}

const Section: React.FC<Themed<typeof createStyleSheet, SectionProps>> = ({
  theme: { styles },
  header,
  footer,
  children,
  style,
  contentStyle,
  headerStyle,
  footerStyle,
  ...props
}) => {
  const [highlighted, setHighlighted] = useState();

  const rootStyles = [
    {
      marginTop: header ? 13 : 15,
      marginBottom: footer ? 9 : 20,
    },
    style,
  ];

  let rowIndex = 0;
  let imageInset = false;

  Children.forEach(children, child => {
    if (React.isValidElement(child) && child.props.imageSource) {
      imageInset = true;
    }
  });

  return (
    <View {...props} style={rootStyles}>
      {header && (
        <Text style={[styles.header, headerStyle]} numberOfLines={1}>
          {header}
        </Text>
      )}
      <View style={[styles.content, contentStyle]}>
        {Children.map(children, child => {
          if (!React.isValidElement(child)) {
            return child;
          }

          let index = rowIndex++;

          const row = React.cloneElement(child, {
            imageInset,
            onHighlightRow: () => setHighlighted(index),
            onUnhighlightRow: () => setHighlighted(undefined),
          });

          if (index === 0) {
            return row;
          }

          return (
            <>
              <Separator
                insetLeft={imageInset ? 64 : undefined}
                highlighted={highlighted === index || highlighted === index - 1}
              />
              {row}
            </>
          );
        })}
      </View>
      {footer && <Text style={[styles.footer, footerStyle]}>{footer}</Text>}
    </View>
  );
};

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    content: {
      backgroundColor: colors.white,
      borderColor: colors.separator,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    header: {
      ...fonts.normal,
      fontSize: 13,
      marginBottom: 6.5,
      marginHorizontal: 20,
      color: colors.gray,
      textTransform: 'uppercase',
    },
    footer: {
      ...fonts.normal,
      fontSize: 13,
      marginTop: 7.5,
      marginHorizontal: 20,
      color: colors.gray,
    },
  });

export default withTheme(Section, createStyleSheet, 'Table.Section');
