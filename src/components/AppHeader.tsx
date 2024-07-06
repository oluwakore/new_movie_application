import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import CustomIcon from "./CustomIcon";

interface AppHeaderProps {
  name: string;
  header: string;
  action?: any;
}

const AppHeader = (props: AppHeaderProps) => {


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.IconCover} onPress={() => props.action()}>
        <CustomIcon name={props.name} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.headerText}> {props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    //  borderWidth: 2,
    // borderColor: "green"
  },
  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
  },
  headerText: {
    // flex: 1,
    fontSize: FONTSIZE.size_20,
    fontFamily: "poppins_medium",
    color: COLORS.White,
    textAlign: "center",
  },
  emptyContainer: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
    // borderWidth: 2,
    // borderColor: "green"
  },
  IconCover: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.Orange,
  },
});
