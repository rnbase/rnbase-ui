import React, { Children, useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle, ViewProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

import Separator from './Separator';
import SectionHeader from './SectionHeader';
import SectionFooter from './SectionFooter';

interface SectionProps extends ViewProps {
  children: React.ReactNode;
  header?: string | React.ReactElement;
  footer?: string | React.ReactElement;
  separatorInsetLeft?: number;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<TextStyle>;
  footerStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  separatorStyle?: StyleProp<ViewStyle>;
}

const Section: React.FC<Themed<typeof createStyleSheet, SectionProps>> = ({
  theme: { styles },
  children,
  header,
  footer,
  separatorInsetLeft,
  style,
  headerStyle,
  footerStyle,
  contentStyle,
  separatorStyle,
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

  return (
    <View {...props} style={rootStyles}>
      <SectionHeader style={headerStyle}>{header}</SectionHeader>
      <View style={[styles.content, contentStyle]}>
        {Children.map(children, child => {
          if (!React.isValidElement(child)) {
            return child;
          }

          let index = rowIndex++;

          const rowComponent = React.cloneElement(child, {
            onPressIn: () => setHighlighted(index),
            onPressOut: () => setHighlighted(undefined),
          });

          return (
            <>
              {index > 0 && (
                <Separator
                  insetLeft={separatorInsetLeft}
                  highlighted={highlighted === index || highlighted === index - 1}
                  style={separatorStyle}
                />
              )}
              {rowComponent}
            </>
          );
        })}
      </View>
      <SectionFooter style={footerStyle}>{footer}</SectionFooter>
    </View>
  );
};

const createStyleSheet = ({ colors }: Theme) =>
  StyleSheet.create({
    content: {
      backgroundColor: colors.white,
      borderColor: colors.separator,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });

export default withTheme(Section, createStyleSheet, 'Table.Section');
