import React from "react";
import { View, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "@react-navigation/native";
import { SCREEN } from "../../../../constants";

const FilterOption = ({ data, onFilterValueChange }: any) => {
  const { colors } = useTheme();
  const shouldLastItemBeFlex = data.length % 2 === 0;
  console.log("Data length->", data.length);
  console.log("shouldLastItemBeFlex->", shouldLastItemBeFlex);
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: colors.card,
        paddingBottom: 8,
      }}
    >
      {data.map(
        (
          item: { code: string; name: string; selected: boolean },
          index: number
        ) => {
          //   console.log("Index->", index);
          const isLastIndex = index === data.length - 1;
          const indexValues = {
            flex: isLastIndex ? (shouldLastItemBeFlex ? 1 : 0) : 1,
            substractWidthBy: isLastIndex
              ? shouldLastItemBeFlex
                ? 10 //10 = padding + margin
                : 3
              : 10, //10 = padding + margin
          };
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                margin: 2,
                paddingHorizontal: 8,
                flex: indexValues.flex,
                minWidth: SCREEN.WIDTH / 2 - indexValues.substractWidthBy,
                height: 40,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: colors.border,
              }}
            >
              <BouncyCheckbox
                size={15}
                isChecked={item.selected}
                fillColor={colors.primary}
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: colors.primary }}
                style={{
                  // borderWidth: 1,
                  width: "100%",
                  height: "100%",
                  zIndex: 2,
                }}
                onPress={() => {
                  onFilterValueChange(item.code);
                }}
                bounceFriction={10}
                disableText={true}
                disableBuiltInState={true}
              />
              <Text
                style={{
                  marginLeft: "-85%",
                  width: "100%",
                  fontFamily: "Nunito-Regular",
                  color: colors.text,
                  flex: 1,
                }}
                numberOfLines={2}
              >
                {item.name}
              </Text>
            </View>
          );
        }
      )}
    </View>
  );
};

export default FilterOption;
