import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
} from "react-native";
import { COLORS, SPACING } from "../theme/theme";
import { movieSearch, pathToBaseImage } from "../api/calls";
import InputHeader from "../components/InputHeader";
import SubMovieCard from "../components/SubMovieCard";

const { width, height } = Dimensions.get("screen");

const Search = ({navigation}: any) => {
  const [searchResultsList, setSearchResultsList] = React.useState<any>([]);

  const fetchMoviesList = async (name: string) => {

    try {
      let response = await fetch(movieSearch(name));
      let json = await response.json();
      setSearchResultsList(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={searchResultsList}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ListHeaderComponent={
          <View style={styles.inputHeaderContainer}>
            <InputHeader searchTextInput={fetchMoviesList} />
          </View>
        }
        contentContainerStyle={styles.centreContainer}
        renderItem={({ item, index }) => (
          <SubMovieCard
            shouldMarginatedAtEnd={false}
            shouldMarginatedAround={true}
            cardFunction={() => {
              navigation.push("MovieDetails", { movieId: item.id });
            }}
            cardWidth={width / 2 - SPACING.space_18 * 2} 
            title={item.original_title}
            imagePath={pathToBaseImage("w342", item.poster_path)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.Black,
  },
  inputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  centreContainer: {
    alignItems: 'center'
  }
});

export default Search;
