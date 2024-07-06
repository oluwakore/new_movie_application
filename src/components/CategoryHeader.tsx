import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";

interface CategoryHeadingProps {
  title: string
}

const CategoryHeading = (props: CategoryHeadingProps) => {

 

  return <Text style={styles.text}>{props.title}</Text>;
};

export default CategoryHeading;

const styles = StyleSheet.create({
  text: {
   fontFamily: "poppins_semibold",
   fontSize: FONTSIZE .size_20,
   color: COLORS.White,
   paddingHorizontal: SPACING.space_36,
   paddingVertical: SPACING.space_28
  },
});
