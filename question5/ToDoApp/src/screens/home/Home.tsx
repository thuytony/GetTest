import React, { useCallback, useState, useRef } from 'react';
import { View, Text, Pressable, KeyboardAvoidingView, Platform, Keyboard, KeyboardEvent, StyleSheet } from 'react-native';
import { TaskList, ModalEditTask } from '@components';
import { Task } from '@model';
import { styles } from './styles';

export const HomeScreen: React.FC<any> = (props) => {

  const refList = useRef(null);

  const listData = [];
  for (let i=0; i<10; i++) {
    listData.push(new Task(i, `Task Name ${i}`, false));
  }
  const [listTask, setListTask] = useState<Task[]>(listData);
  const [isVisibleModalEditTask, setVisibleModalEditTask] = useState<boolean>(false);
  const [currentTaskEditing, setCurrentTaskEditting] = useState<Task | undefined>(undefined);

  const onPressEdit = useCallback((task) => {
    setCurrentTaskEditting(task);
    setVisibleModalEditTask(true);
  }, []);

  const onFinishEdit = useCallback((preTask, newTaskName) => {
    if (currentTaskEditing) {
      setListTask(preData => {
        const newData = [...preData];
        const indexTaskEditing = newData.indexOf(currentTaskEditing);
        newData[indexTaskEditing] = {
          ...currentTaskEditing,
          taskName: newTaskName
        };
        return newData;
      });
    } else {
      setListTask(preData => {
        const id = new Date().getTime();
        const newTask = new Task(id, newTaskName, false);
        return [
          newTask,
          ...listTask
        ];
      });
      refList?.current?.scrollToOffset({ animated: true, offset: 0 });
    };
    Keyboard.dismiss();
    setVisibleModalEditTask(false);
  }, [listTask, currentTaskEditing]);

  const onCloseModal = useCallback(() => {
    setVisibleModalEditTask(false);
  }, []);

  const onChangeCheckbox = useCallback((task, isChecked) => {
    setListTask(preData => {
      const newData = [...preData];
      const index = preData.indexOf(task);
      newData[index] = {
        ...task,
        isFinish: isChecked
      };
      return newData;
    })
  }, [listTask]);

  const onPressAddMore = useCallback(() => {
    setCurrentTaskEditting(undefined);
    setVisibleModalEditTask(true);
  }, [listTask]);

  return (
    <View style={ styles.container }>
      <ModalEditTask
        isVisible={isVisibleModalEditTask}
        onClose={onCloseModal}
        onFinishEdit={onFinishEdit}
        task={currentTaskEditing}
      />
      <Text style={styles.txtTitle}>Today's Task</Text>
      <TaskList
        ref={refList}
        tasks={listTask}
        style={ styles.list }
        onPressEdit={onPressEdit}
        onChangeCheckbox={onChangeCheckbox}
      />
      <Pressable
        style={ styles.btnFab }
        onPress={onPressAddMore}
      >
        <Text style={styles.txtFab}>+</Text>
      </Pressable>
    </View>
  );

};