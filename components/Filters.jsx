import { useState, useEffect } from "react";
import { TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Filters = ({ data, setFilteredData }) => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const [filterTypeOpen, setFilterTypeOpen] = useState(false);
  const [filterValueOpen, setFilterValueOpen] = useState(false);
  const [filterOptions] = useState([
    { label: "Search by Criteria", value: null },
    { label: "Chapter", value: "Chapters" },
    { label: "Country", value: "Country" },
  ]);
  const [valueOptions, setValueOptions] = useState([]);

  useEffect(() => {
    filterData();
  }, [search, filterType, filterValue]);

  const filterData = () => {
    let filtered = data.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(search.toLowerCase())
      )
    );

    if (filterType && filterValue) {
      filtered = filtered.filter((item) => item[filterType] === filterValue);
    }

    setFilteredData(filtered);
  };

  const handleFilterTypeChange = (value) => {
    const selectedType = value();
    setFilterType(selectedType);
    setFilterValue(null);
    if (selectedType) {
      const uniqueValues = [
        ...new Set(data.map((item) => item[selectedType])),
      ].map((val) => ({ label: val, value: val }));
      setValueOptions(uniqueValues);
    } else {
      setValueOptions([]);
    }
  };

  return (
    <>
      <TextInput
        style={{
          height: 40,
          borderWidth: 1,
          paddingLeft: 10,
          marginBottom: 10,
        }}
        placeholder="Search exhibitors..."
        value={search}
        onChangeText={setSearch}
      />

      <DropDownPicker
        open={filterTypeOpen}
        value={filterType}
        items={filterOptions}
        setOpen={setFilterTypeOpen}
        setValue={handleFilterTypeChange}
        placeholder="Search by Criteria"
        containerStyle={{ marginBottom: 10 }}
        zIndex={3000}
        zIndexInverse={1000}
      />

      {filterType && (
        <DropDownPicker
          open={filterValueOpen}
          value={filterValue}
          items={valueOptions}
          setOpen={setFilterValueOpen}
          setValue={setFilterValue}
          placeholder={`Select ${filterType}`}
          containerStyle={{ marginBottom: 10 }}
          zIndex={2000}
          zIndexInverse={2000}
        />
      )}
    </>
  );
};

export default Filters;
