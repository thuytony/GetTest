import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyListProps {
  isLoading: Boolean
  isError: Boolean
}

export const EmptyList: React.FC<EmptyListProps> = (props) => {

  return (
    <View>
      <Text style={styles.txtEmpty}>Empty Listing</Text>
    </View>
  );

};

const styles = StyleSheet.create({

  txtEmpty: {
    paddingVertical: 16,
  },

});