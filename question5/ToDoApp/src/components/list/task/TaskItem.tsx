import React, { useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, TextInput, Pressable
} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Task } from '@model';

interface EmptyListProps {
  task: Task
  onPressEdit: (task: Task, indexTaskEditing: number) => void
  onChangeCheckbox: (task: Task, isChecked: Boolean) => void
  indexTaskEditing: number
}

export const TaskItem: React.FC<EmptyListProps> = (props) => {

  const { task, onPressEdit, onChangeCheckbox, indexTaskEditing } = props;

  const onPressLable = useCallback(() => {
    onPressEdit(task, indexTaskEditing);
  }, [task, indexTaskEditing]);

  const onPressCheckBox = useCallback((isChecked: boolean) => {
    onChangeCheckbox(task, isChecked);
  }, [onChangeCheckbox]);

  const _renderLabel = useMemo(() => {
    const textDecorationLine = task.isFinish ? "line-through" : "none";
    return (
      <Pressable onPress={onPressLable}>
        <Text style={[ styles.txtTaskName, { textDecorationLine } ]}>{task.taskName}</Text>
      </Pressable>
    )
  }, [task]);

  return (
    <View style={ styles.task }>
      <BouncyCheckbox
        size={25}
        fillColor="#2196F3"
        unfillColor="white"
        isChecked={Boolean(task.isFinish)}
        // text="Custom Checkbox"
        iconStyle={{ borderColor: task.isFinish ? "#2196F3" : "grey", borderRadius: 8, borderWidth: 2 }}
        onPress={onPressCheckBox}
      />
      {_renderLabel}
    </View>
  );

};

const styles = StyleSheet.create({

  task: {
    flexDirection: "row",
    paddingHorizontal: 8,
    alignItems: "center",
  },
  txtTaskName: {
    minWidth: 8,
    paddingVertical: 24,
  },

});