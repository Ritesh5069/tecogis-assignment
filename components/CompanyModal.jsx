import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const CompanyModal = ({ modalVisible, setModalVisible, selectedCompany }) => {
  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {selectedCompany && (
            <>
              <Text style={styles.companyName}>
                {selectedCompany.Company_Name}
              </Text>
              <Text>Chapter: {selectedCompany.Chapters}</Text>
              <Text>Country: {selectedCompany.Country}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  companyName: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  closeButton: { marginTop: 10, color: "blue" },
});

export default CompanyModal;
