import { SectionList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SEMI_BOLD } from "../../../constants/fontNames";
import CheckBox from "../../../components/checkbox";
import Colors from "../../../constants/colors";

type Props = {};
type SelectionItemProps = {
  handleSelect: (name: string) => void;
  selected: boolean;
  name: string;
  handleRemove: (name: string) => void;
};

const data = [
  {
    title: "Main dishes",
    required: true,
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"],
  },
];

const Title = ({ title, required }: { title: string; required?: boolean }) => (
  <View
    style={{ flexDirection: "row", alignItems: "center", paddingRight: 10 }}
  >
    <Text style={styles.title}>{title}</Text>
    {required && (
      <Text
        style={{
          padding: 5,
          backgroundColor: Colors.primary,
          borderRadius: 10,
          fontSize: 12,
          color: "white",
        }}
      >
        Required
      </Text>
    )}
  </View>
);

const SelectionItem = ({
  handleSelect,
  selected,
  name,
  handleRemove,
}: SelectionItemProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        columnGap: 20,
        paddingLeft: 10,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: Colors.gray,
        paddingBottom: 20,
      }}
    >
      <CheckBox
        name={name}
        selected={selected}
        handleSelect={handleSelect}
        handleRemove={handleRemove}
      />
      <Text
        style={{
          fontSize: 15,
          fontWeight: "500",
          color: selected ? Colors.primary : Colors.dark,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const ExtraSelectionsGrid = (props: Props) => {
  const [selections, setSelections] = React.useState<string[]>([]);

  const handleRemove = (itemtoRemove: string) => {
    setSelections((prev) => selections.filter((item) => item != itemtoRemove));
  };

  return (
    <SectionList
      contentContainerStyle={{ paddingLeft: 10, rowGap: 20 }}
      scrollEnabled={false}
      sections={data}
      renderItem={({ item }) => (
        <SelectionItem
          handleRemove={() => handleRemove(item)}
          handleSelect={() => setSelections((prev) => [...prev, item])}
          selected={selections.includes(item)}
          name={item}
        />
      )}
      renderSectionHeader={({ section: { title, required } }) => (
        <Title required={required} title={title} />
      )}
    />
  );
};

export default ExtraSelectionsGrid;

const styles = StyleSheet.create({
  title: {
    fontFamily: SEMI_BOLD,
    fontSize: 20,
    flex: 1,
  },
});
