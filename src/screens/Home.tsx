import * as React from "react";
import axios from "axios";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import { COLORS, SPACING } from "../theme/theme";
import {
  upcomingMovies,
  popularMovies,
  nowPlayingMovies,
  pathToBaseImage,
} from "../api/calls";
import InputHeader from "../components/InputHeader";
import CategoryHeading from "../components/CategoryHeader";
import SubMovieCard from "../components/SubMovieCard";
import MovieCard from "../components/MovieCard";

const { width, height } = Dimensions.get("window");

const fetchNowPlayingMovies = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong with now playing movies");
  }
};

const fetchPopularMovies = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Somwthing went wrong with popular movies");
  }
};

const fetchUpcomingMovies = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Somwthing went wrong with upcoming movies");
  }
};

const Home = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    React.useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] =
    React.useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] =
    React.useState<any>(undefined);

  React.useEffect(() => {
    (async () => {
      let tempNowPlaying = await fetchNowPlayingMovies();
      setNowPlayingMoviesList([
        { id: "dummy1" },
        ...tempNowPlaying?.results,
        { id: "dummy2" },
      ]);

      let tempPopular = await fetchPopularMovies();
      setPopularMoviesList(tempPopular?.results);

      let tempUpcoming = await fetchUpcomingMovies();
      setUpcomingMoviesList(tempUpcoming?.results);
    })();
  }, []);

  // console.log(nowPlayingMoviesList.length, popularMoviesList.length, upcomingMoviesList.length);

  const searchTextWordings = () => {
    navigation.navigate("Search");
  };

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <StatusBar hidden />
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchTextInput={searchTextWordings} />
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
      // contentContainerStyle={styles.scrollViewContainer}
    >
      <StatusBar hidden />
      <View style={styles.inputHeaderContainer}>
        <InputHeader searchTextInput={searchTextWordings} />
      </View>
      <>
        <CategoryHeading title={"Now Playing"} />
        <FlatList
          data={nowPlayingMoviesList}
          keyExtractor={(item: any) => item.id}
          snapToInterval={width * 0.7 + SPACING.space_36}
          decelerationRate={0}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap36}
          renderItem={({ item, index }) => {
            if (!item.original_title) {
              return (
                <View
                  style={{
                    width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                  }}
                ></View>
              );
            }
            return (
              <MovieCard
                shouldMarginatedAtEnd={true}
                // shouldMarginatedAround={( index !== 0 && index !== upcomingMoviesList.length - 1 ) }
                cardFunction={() => {
                  navigation.push("MovieDetails", { movieId: item.id });
                }}
                cardWidth={width * 0.7}
                isFirst={index == 0 ? true : false}
                isLast={index == popularMoviesList?.length - 1 ? true : false}
                title={item.original_title}
                imagePath={pathToBaseImage("w780", item.poster_path)}
                genre={item.genre_ids.slice(1, 4)}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
              />
            );
          }}
        />
      </>
      <>
        <CategoryHeading title={"Popular"} />
        <FlatList
          data={popularMoviesList}
          keyExtractor={(item: any) => item.id}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap36}
          renderItem={({ item, index }) => (
            <SubMovieCard
              shouldMarginatedAtEnd={true}
              // shouldMarginatedAround={( index !== 0 && index !== upcomingMoviesList.length - 1 ) }
              cardFunction={() => {
                navigation.push("MovieDetails", { movieId: item.id });
              }}
              cardWidth={width / 3}
              isFirst={index == 0 ? true : false}
              isLast={index == popularMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={pathToBaseImage("w342", item.poster_path)}
            />
          )}
        />
      </>
      <>
        <CategoryHeading title={"Upcoming"} />
        <FlatList
          data={upcomingMoviesList}
          keyExtractor={(item: any) => item.id}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap36}
          renderItem={({ item, index }) => (
            <SubMovieCard
              shouldMarginatedAtEnd={true}
              // shouldMarginatedAround={( index !== 0 && index !== upcomingMoviesList.length - 1 ) }
              cardFunction={() => {
                navigation.push("MovieDetails", { movieId: item.id });
              }}
              cardWidth={width / 3}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={pathToBaseImage("w342", item.poster_path)}
            />
          )}
        />
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default Home;
