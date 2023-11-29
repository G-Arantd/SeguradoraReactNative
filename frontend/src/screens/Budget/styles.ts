import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  globalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  titleContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    textTransform: "uppercase",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 36,
    textTransform: "uppercase",
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerInfo: {
    width: "90%",
    justifyContent: "center",
    gap: 15,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#fff",
    color: "#6F6B73",
    borderRadius: 15,
    marginBottom: 15,
    paddingLeft: 26,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
  btnGlobal: {
    width: "100%",
    backgroundColor: "#01633D",
    height: 48,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  btnGlobalText: {
    color: "#fff",
    backgroundColor: "#01633D",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  return: {
    color: "#5987CC",
    fontWeight: "bold",
    fontSize: 18,
  },
});
