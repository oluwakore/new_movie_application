import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import CustomIcon from "./CustomIcon";

interface MovieCardProps {
  title: string;
  imagePath: string;
  shouldMarginatedAtEnd: boolean;
  // shouldMarginatedAround: any;
  cardFunction: any;
  cardWidth: number;
  isFirst: boolean;
  isLast: boolean;
  genre: number[];
  vote_average: number;
  vote_count: number;
}

const movieGenreList: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const MovieCard = (props: MovieCardProps) => {
 
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
          ,
          // props.shouldMarginatedAround ? {margin: SPACING.space_12} : {}
          { maxWidth: props.cardWidth },
        ]}
      >
        <Image
          style={[styles.cardImage, { width: props.cardWidth }]}
          source={{ uri: props.imagePath }}
        />
        <View>
          <View style={styles.rateContainer}>
            <CustomIcon name="star-empty" style={styles.starIcon} />
            <Text style={styles.ratingVoteText}> {props.vote_average} ({props.vote_count})  </Text>
          </View>
          <Text style={styles.textTitle} numberOfLines={1}>
          {props.title}
        </Text>

        <View style={styles.genreContainer}>
          {props.genre.map((item: number) => {
            return(
              <View key={item} style={styles.genreBox}>
                <Text style={styles.genreBoxText}>{movieGenreList[item]}</Text>
              </View>
            )
          })}
        </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

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
    fontFamily: "poppins_regular",
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: "center",
    paddingVertical: SPACING.space_10,
  },
  rateContainer: {
    flexDirection: "row",
    gap: SPACING.space_10,
    // alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.space_10
  },
  starIcon: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Yellow,
    marginTop: SPACING.space_2
  },
  ratingVoteText: {
    fontFamily: "poppins_medium",
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: "center"
  },
  genreContainer: {
    flex: 1,
    flexDirection: "row",
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreBoxText: {
    fontFamily: "poppins_regular",
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75
  }
});
