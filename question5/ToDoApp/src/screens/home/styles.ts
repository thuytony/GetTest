import { StyleSheet, Platform, Keyboard } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  txtTitle: {
    fontSize: 40,
    marginTop: 8
  },
  list: {
    flex: 1,
  },
  btnFab: {
    backgroundColor: "#2196F3",
    right: 16,
    bottom: 16,
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  txtFab: {
    color: "white",
    fontSize: 35,
    marginTop: -5,
  },

});

export { styles };
