import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";

interface SubMovieCardProps {
  title: string;
  imagePath: string;
  shouldMarginatedAtEnd?: boolean;
  shouldMarginatedAround?: boolean;
  cardFunction: any;
  cardWidth: number;
  isFirst?: boolean;
  isLast?: boolean;
}

const SubMovieCard = (props: SubMovieCardProps) => {

  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container,
          props.shouldMarginatedAtEnd
            ? props.isFirst
              ? { marginLeft: SPACING.space_36 }
              : props.isLast
              ? { marginRight: SPACING.space_36 }
              : {}
            : {},
            props.shouldMarginatedAround ? {margin: SPACING.space_12} : {}
            ,
            {maxWidth: props.cardWidth}
        ]}
      >
        <Image
          style={[styles.cardImage, { width: props.cardWidth }]}
          source={{ uri: props.imagePath }}
        />
        <Text style={styles.textTitle} numberOfLines={1}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubMovieCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: COLORS.Black,
    // paddingBottom: SPACING.space_36
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
  },
  textTitle: {
    fontFamily: 'poppins_regular',
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10
  }
});
