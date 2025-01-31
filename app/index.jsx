import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExhibitorItem from "../components/ExhibitorItem";
import CompanyModal from "../components/CompanyModal";
import Filters from "../components/Filters";

const API_URL =
  "https://events.tecogis.com/reactnative-test/ExhibitorList.json";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
      await AsyncStorage.setItem("exhibitorData", JSON.stringify(jsonData));
    } catch (error) {
      const savedData = await AsyncStorage.getItem("exhibitorData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
        setFilteredData(parsedData);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Filters data={data} setFilteredData={setFilteredData} />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.Company_Name}
        renderItem={({ item }) => (
          <ExhibitorItem
            item={item}
            setSelectedCompany={setSelectedCompany}
            setModalVisible={setModalVisible}
          />
        )}
      />
      <CompanyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedCompany={selectedCompany}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  searchBar: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default App;
