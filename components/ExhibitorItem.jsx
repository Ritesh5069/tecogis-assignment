import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ExhibitorItem = ({ item, setSelectedCompany, setModalVisible }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedCompany(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.companyName}>{item.Company_Name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  companyName: { fontSize: 16, fontWeight: "bold" },
});

export default ExhibitorItem;
