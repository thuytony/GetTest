import React from 'react';
import { View, FlatList, StyleSheet, ListRenderItemInfo, ViewStyle } from 'react-native';
import { EmptyList } from '../empty-list';
import { TaskItem } from './TaskItem';
import { Task } from '@model';

interface EmptyListProps {
  tasks: Task[]
  style?: ViewStyle
  onPressEdit: (task: Task) => void
  onPressDelete: (task: Task) => void
  onChangeCheckbox: (task: Task, isChecked: Boolean) => void
}

export const TaskList = React.forwardRef((props: EmptyListProps, ref) => {

  const { tasks, style } = props;

  const keyExtractor = (item: Task, index: number) => `${item.id}`;

  const renderSeparateItem = () => {
    return (<View style={styles.seperateItem} />)
  }

  const renderEmpty = () => {
    return <EmptyList isLoading={false} isError={false} />
  };

  const renderItem = ({item, index}: ListRenderItemInfo<Task>) => {
    const { onPressEdit, onPressDelete, onChangeCheckbox } = props;
    return (
      <TaskItem
        task={item}
        onPressEdit={onPressEdit}
        onPressDelete={onPressDelete}
        onChangeCheckbox={onChangeCheckbox}
      />
    );
  };

  return (
    <FlatList
        ref={ref}
        style={style}
        // ListHeaderComponent={renderHeader}
        // ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={renderSeparateItem}
        showsVerticalScrollIndicator={false}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.1}
      />
  );

});

const styles = StyleSheet.create({

  listView: {
    padding: 8,
  },
  footerList: {
    marginBottom: 8,
  },
  seperateItem: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
    marginHorizontal: 8
  },

});