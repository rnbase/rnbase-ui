import { ScrollView, StyleSheet } from 'react-native';

import Action from './Action';
import Label from './Label';
import Row from './Row';
import Section from './Section';
import SectionHeader from './SectionHeader';
import SectionFooter from './SectionFooter';
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
  public static Label = Label;
  public static Row = Row;
  public static Section = Section;
  public static SectionHeader = SectionHeader;
  public static SectionFooter = SectionFooter;
  public static Separator = Separator;
}
