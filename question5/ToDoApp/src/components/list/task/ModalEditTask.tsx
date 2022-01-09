import { Task } from '@model';
import React, { useCallback, useState } from 'react';
import {
  StyleSheet, View, TouchableWithoutFeedback, Modal, ModalProps, Dimensions, Keyboard, Text, TextInput, Pressable, TouchableOpacity,
  KeyboardAvoidingView, Platform
} from 'react-native';

export interface ModalEditTaskProps extends ModalProps {
  isVisible: boolean;
  onClose: () => void
  onFinishEdit: (preTask: Task | undefined, newTaskName: string) => void
  task: Task | undefined
}

export const  ModalEditTask: React.FC<ModalEditTaskProps>  = (props) => {

  const { isVisible, onClose, onFinishEdit, task } = props;

  const [taskName, setTaskName] = useState((task && task.taskName) ? task.taskName : "");
  const [isShowError, setShowError] = useState<boolean>(false);

  

  const onClickBackAndroid = () => {
    onClose();
  };

  const handleChangeText = useCallback(
    (text) => {
      setTaskName(text);
    },
    []
  );

  const onSubmitEdit = useCallback((e) => {
      if (taskName) {
        onFinishEdit && onFinishEdit(task, e.nativeEvent.text);
        Keyboard.dismiss();
      } else {
        setShowError(true);
      }
    },
    [onFinishEdit, taskName]
  );

  const onSaveEdit = useCallback(() => {
      if (taskName) {
        onFinishEdit && onFinishEdit(task, taskName);
        Keyboard.dismiss();
      } else {
        setShowError(true);
      }
    },
    [onFinishEdit, taskName]
  );

  const onModalShow = useCallback(() => {
    setTaskName((task && task.taskName) ? task.taskName : "");
    setShowError(false);
  }, [task]);

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClickBackAndroid}
      onShow={onModalShow}
    >
      <View style={styles.modal}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.container}>

          </View>
        </TouchableWithoutFeedback>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : undefined}
          // keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <View style={styles.content}>
            
            <TextInput
              placeholder="Task Name"
              autoFocus
              blurOnSubmit={false}
              onSubmitEditing={onSaveEdit}
              defaultValue={(task && task.taskName) ? task.taskName : ""}
              onChangeText={handleChangeText}
              style={styles.edtTaskName}
            />
            {isShowError && !taskName && <Text style={styles.txtError}>Please input task name</Text>}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={onSaveEdit}
                disabled={!taskName}
              >
                <Text style={[styles.txtSave, { color: taskName ? "#2196F3" : "grey" }]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )

}

const styles = StyleSheet.create({

  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: "flex-end"
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  content: {
    padding: 16,
    backgroundColor: "white",
    bottom: 0
  },
  header: {
    alignItems: "flex-end"
  },
  txtSave: {
    fontSize: 20,
  },
  edtTaskName: {
    fontSize: 16,
  },
  txtError: {
    color: "red",
    marginTop: 4,
  },

});
