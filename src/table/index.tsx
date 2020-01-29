import { ScrollView, StyleSheet } from 'react-native';

import Action from './Action';
import Section from './Section';
import Label from './Label';
import Row from './Row';
import Separator from './Separator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20,
  },
});

export default class Table extends ScrollView {
  static defaultProps = {
    style: styles.container,
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: styles.contentContainer,
  };

  public static Action = Action;
  public static Section = Section;
  public static Label = Label;
  public static Row = Row;
  public static Separator = Separator;
}
