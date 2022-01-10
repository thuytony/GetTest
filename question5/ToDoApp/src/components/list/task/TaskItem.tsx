import React, { useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, Alert, Pressable, Image, TouchableOpacity
} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Task } from '@model';
import { ICONS } from '@assets';

interface EmptyListProps {
  task: Task
  onPressEdit: (task: Task) => void
  onChangeCheckbox: (task: Task, isChecked: Boolean) => void
  onPressDelete: (task: Task) => void
}

export const TaskItem: React.FC<EmptyListProps> = (props) => {

  const { task, onPressEdit, onChangeCheckbox, onPressDelete } = props;

  const onPressLable = useCallback(() => {
    onPressEdit(task);
  }, [task]);

  const onPressCheckBox = useCallback((isChecked: boolean) => {
    onChangeCheckbox(task, isChecked);
  }, [onChangeCheckbox]);

  const onPressIconDelete = useCallback(() => {
    Alert.alert(
      'Delete task',
      'Are you sure you want to delete this task?',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => onPressDelete(task) }
      ],
      { cancelable: true }
    );
  }, [task]);

  const _renderLabel = useMemo(() => {
    const textDecorationLine = task.isFinish ? "line-through" : "none";
    return (
      <Pressable onPress={onPressLable}>
        <Text style={[ styles.txtTaskName, { textDecorationLine } ]}>{task.taskName}</Text>
      </Pressable>
    )
  }, [task]);

  const _renderIconDelete = useMemo(() => {
    return (
      <TouchableOpacity onPress={onPressIconDelete} style={styles.wrapDelete}>
        <Image source={ICONS.ICON_DELETE} style={styles.iconDelete}/>
      </TouchableOpacity>
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
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          {_renderLabel}
        </View>
        {task.isFinish && _renderIconDelete}
      </View>
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
  wrapDelete: {
    padding: 8
  },
  iconDelete: {
    width: 20,
    height: 20,
    tintColor: "red"
  },

});