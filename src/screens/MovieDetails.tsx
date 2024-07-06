import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  detailsOfMovie,
  detailsOfMovieCast,
  pathToBaseImage,
} from "../api/calls";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import AppHeader from "../components/AppHeader";
import { LinearGradient } from "expo-linear-gradient";

import CustomIcon from "../components/CustomIcon";
import CategoryHeading from "../components/CategoryHeader";
import CastCard from "../components/CastCard";

interface genreDetails {
  id: number;
  name: string;
}

const fetchMovieCastDetails = async (movieId: number) => {
  try {
    const response = await fetch(detailsOfMovieCast(movieId));
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong with fetching movie cast details");
  }
};

const fetchMovieDetailsData = async (movieId: number) => {
  try {
    const response = await fetch(detailsOfMovie(movieId));
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(
      "Something went wrong with fetching movie details data",
      error
    );
  }
};

const MovieDetails = ({ navigation, route }: any) => {
  const [movieData, setMovieData] = React.useState<any>(undefined);
  const [movieCastData, setMovieCastData] = React.useState<any>(undefined);


  React.useEffect(() => {
    (async () => {
      const gottenMovieData = await fetchMovieDetailsData(route.params.movieId);

      setMovieData(gottenMovieData);

      const gottenMovieCastData = await fetchMovieCastDetails(route.params.movieId);
      setMovieCastData(gottenMovieCastData?.cast);
    })();
  }, []);

  // console.log(movieCastData?.cast)

  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  ) {
    return (
      <ScrollView
        style={[styles.container /*{borderWidth: 2, borderColor: "yellow"}*/]}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="arrow-left"
            header="Movie Details"
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{ uri: pathToBaseImage("w780", movieData?.backdrop_path) }}
          style={styles.imageBackdropContainer}
        >
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradientContainer}
          >
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="arrow-left"
                header={""}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBackdropContainer}>
          <Image
            source={{ uri: pathToBaseImage("w342", movieData?.poster_path) }}
            style={styles.cardImage}
          />
        </View>
        <View style={styles.timeCover}>
          <CustomIcon name="clock" style={styles.clockIcon} />
          <Text style={styles.timeText}>
            {Math.floor(movieData?.runtime / 60)}h{" "}
            {Math.floor(movieData?.runtime % 60)}m{" "}
          </Text>
        </View>
      </View>

      <View>
        <Text style={styles.originalTitle}> {movieData?.original_title} </Text>
        <View style={styles.genreContainer}>
          {movieData?.genres.map((item: genreDetails) => {
            return (
              <View key={item.id} style={styles.genreCover}>
                <Text style={styles.genreText}> {item.name} </Text>
              </View>
            )
          })}
        </View>
        <Text style={styles.taglineText}> {movieData?.tagline} </Text>
      </View>

      <View style={styles.infoBanner}>
        <View style={styles.infoUpperPart}>
          <CustomIcon name="star-empty" style={styles.starIcon} />
          <Text style={styles.timeText}>
            {" "}
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count}){" "}
          </Text>
          <Text style={styles.timeText}>
            {" "}
            {movieData?.release_date.substring(8, 10)}{" "}
            {new Date(movieData?.release_date).toLocaleString("default", {
              month: "long",
            })}{" "}
            {movieData?.release_date.substring(0, 4)}{" "}
          </Text>
        </View>
        <Text style={styles.descText}>{movieData?.overview}</Text>
      </View>

      <View>
        <CategoryHeading title={"Top Cast"} />
        <FlatList
          data={movieCastData}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => (
            <CastCard
              title={item.original_name}
              subtitle={item.character}
              imagePath={pathToBaseImage("w185", item.profile_path)}
              cardWidth={80}
              shouldMarginatedAtEnd={true}
              isFirst={index == 0 ? true : false}
              isLast={index == movieCastData?.length - 1 ? true : false}
            />
          )}
        />
        <View>
          <TouchableOpacity
            style={styles.ctaButtonCover}
            onPress={() => {
              navigation.push("SeatBooking", {
                backgroundImg: pathToBaseImage("w780", movieData.backdrop_path),
                posterImage: pathToBaseImage("w780", movieData.poster_path),
              })
            }}
          >
            <Text style={styles.btnText}>Pick Seats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    // flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "red",
    width: "100%",
    display: "flex",
    marginVertical: "50%",
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
    //  borderWidth: 2,
    // borderColor: "purple"
  },
  imageBackdropContainer: {
    width: "100%",
    aspectRatio: 3072 / 1727,
  },
  linearGradientContainer: {
    height: "100%",
    // borderWidth: 2,
    // borderColor: "yellow"
  },
  cardImage: {
    width: "60%",
    aspectRatio: 200 / 300,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
  },
  timeText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    fontFamily: "poppins_medium",
    textAlign: "center",
    marginTop: 3,
  },
  timeCover: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: SPACING.space_15,
    gap: SPACING.space_10 - 5
  },
  originalTitle: {
    fontFamily: "poppins_regular",
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: "center",
  },
  genreContainer: {
    flex: 1,
    flexDirection: "row",
    gap: SPACING.space_20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  genreCover: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontFamily: "poppins_regular",
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  taglineText: {
    fontFamily: "poppins_thin_italic",
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: "center",
  },
  infoBanner: {
    marginHorizontal: SPACING.space_28,
  },
  infoUpperPart: {
    flexDirection: "row",
    gap: SPACING.space_10,
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "red"
  },
  starIcon: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Yellow,
    marginTop: SPACING.space_2,
    marginBottom: 5
  },
  descText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    fontFamily: "poppins_light",
    textAlign: "justify",
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  ctaButtonCover: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  btnText: {
    borderRadius: BORDERRADIUS.radius_25 * 4,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
    fontFamily: "poppins_medium",
    fontSize: FONTSIZE.size_14,
    color: COLORS.White
  }
});

export default MovieDetails;
