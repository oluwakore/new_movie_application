import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import AppHeader from "../components/AppHeader";
import { LinearGradient } from "expo-linear-gradient";
import CustomIcon from "../components/CustomIcon";
import * as SecureStore from 'expo-secure-store'

const availableTimesArray: string[] = [
  "10:30",
  "12:30",
  "14:30",
  "15:00",
  "19:30",
  "21:00",
];

interface dateObjectInt {
  date: number | string;
  day: string;
}

const generateDateForMovies = (): dateObjectInt[] => {
  const date = new Date();
  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekdays: dateObjectInt[] = [];
  for (let i = 0; i < 7; i++) {
    let tempDate: dateObjectInt = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let getToNine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let t = 0; t < numColumn; t++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i == 3) {
      numColumn += 2;
    }
    if (numColumn < 9 && !getToNine) {
      numColumn += 2;
    } else {
      getToNine = true;
      numColumn -= 2;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const SeatBooking = ({ navigation, route }: any) => {
  const [dateArray, setDateArray] = React.useState<dateObjectInt[]>(
    generateDateForMovies()
  );

  const [selectedDateIndex, setSelectedDateIndex] = React.useState<
    number | any
  >();

  const [price, setPrice] = React.useState<number>(0);

  const [twoDSeatArray, setTwoDSeatArray] = React.useState<any[][]>(
    generateSeats()
  );

  const [selectedSeatArray, setSelectedSeatArray] = React.useState<any[]>([]);

  const [selectedTimeIndex, setSelectedTimeIndex] = React.useState<
    number | any
  >();

  const seatSelect = (index: number, subIndex: number, seatNum: number) => {
    if (!twoDSeatArray[index][subIndex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subIndex].selected = !temp[index][subIndex].selected;
      if (!array.includes(seatNum)) {
        array.push(seatNum);
        setSelectedSeatArray(array);
      } else {
        const tempIndex = array.indexOf(seatNum);
        if (tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  const bookSeats = async () => {
    if(selectedSeatArray.length !== 0 && availableTimesArray[selectedTimeIndex] !== undefined && dateArray[selectedDateIndex] !== undefined ){
      try {
        await SecureStore.setItemAsync('ticket', JSON.stringify({
          seatArray: selectedSeatArray,
          time: availableTimesArray[selectedTimeIndex],
          date: dateArray[selectedDateIndex],
          ticketImg: route.params.posterImage
        }))
      } catch (error) {
        console.error('Something went wrong with seats booking')
      }

      navigation.navigate('Ticket', {
        seatArray: selectedSeatArray,
          time: availableTimesArray[selectedTimeIndex],
          date: dateArray[selectedDateIndex],
          ticketImg: route.params.posterImage
      })
    } else {
      ToastAndroid.showWithGravity('Please Select Seats, Date and Time of the Movie', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
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
          source={{ uri: route.params?.backgroundImg }}
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
        <Text style={styles.screenText}>Screen this side</Text>
        <View style={styles.seatsContainer}>
          <View style={styles.containerGap20}>
            {twoDSeatArray?.map((item, index) => {
              return (
                <View key={index} style={styles.seatRow}>
                  {item?.map((subItem, subIndex) => {
                    return (
                      <TouchableOpacity
                        key={subItem.number}
                        onPress={() => {
                          seatSelect(index, subIndex, subItem.number);
                        }}
                      >
                        <CustomIcon
                          name="bell"
                          style={[
                            styles.seatIcon,
                            subItem.taken ? { color: COLORS.Grey } : {},
                            subItem.selected ? { color: COLORS.Orange } : {},
                          ]}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.seatOptionsContainer}>
          <View style={styles.seatOptionsInner}>
            <CustomIcon
              name="spades"
              style={[styles.seatOptionsIcon, { color: COLORS.White }]}
            />
            <Text style={styles.seatOptionsText}>Available</Text>
          </View>
          <View style={styles.seatOptionsInner}>
            <CustomIcon
              name="spades"
              style={[styles.seatOptionsIcon, { color: COLORS.Grey }]}
            />
            <Text style={styles.seatOptionsText}>Taken</Text>
          </View>
          <View style={styles.seatOptionsInner}>
            <CustomIcon
              name="spades"
              style={[styles.seatOptionsIcon, { color: COLORS.Orange }]}
            />
            <Text style={styles.seatOptionsText}>Selected</Text>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          data={dateArray}
          keyExtractor={(item: any) => item.date}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity key={index} onPress={() => setSelectedDateIndex(index)}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? { marginLeft: SPACING.space_24 }
                      : index == dateArray?.length - 1
                      ? { marginRight: SPACING.space_24 }
                      : {},
                      index == selectedDateIndex ? {backgroundColor: COLORS.Orange} : {}
                  ]}
                >
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View  style={
                    styles.timeArrayContainer}>
        <FlatList
          data={availableTimesArray}
          keyExtractor={(item: any) => item}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }: {item: any, index: number}) => {
            return (
              <TouchableOpacity key={index} onPress={() => setSelectedTimeIndex(index)}>
                <View
                  style={[
                    styles.timeContainer,
                    index == 0
                      ? { marginLeft: SPACING.space_24 }
                      : index == dateArray.length - 1
                      ? { marginRight: SPACING.space_24 }
                      : {},
                      index == selectedTimeIndex ? {backgroundColor: COLORS.Orange} : {}
                  ]}
                >
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.priceContainer}>
        <View style={styles.priceContainerMain}>
          <Text style={styles.priceTextHeader}>Total Price</Text>
          <Text style={styles.priceMain}> ${price}.00 </Text>
        </View>
        <TouchableOpacity onPress={bookSeats}>
          <Text style={styles.ctaText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: COLORS.Black,
    // flex: 1
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
  screenText: {
    color: COLORS.WhiteRGBA15,
    textAlign: "center",
    fontFamily: "poppins_regular",
    fontSize: FONTSIZE.size_10,
  },
  seatsContainer: {
    marginVertical: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: "row",
    gap: SPACING.space_20,
    justifyContent: "center",
  },
  seatIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  seatOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: SPACING.space_20,
    marginTop: SPACING.space_36,
  },
  seatOptionsInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_10 - 5,
  },
  seatOptionsIcon: {
    fontSize: FONTSIZE.size_20,
  },
  seatOptionsText: {
    fontFamily: "poppins_medium",
    color: COLORS.White,
    fontSize: FONTSIZE.size_12,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 7,
    borderRadius: SPACING.space_10 * .7,
    backgroundColor: COLORS.DarkGrey,
    alignItems: "center",
    justifyContent: "center"
  },
  dayText: {
    fontFamily: "poppins_regular",
    fontSize: FONTSIZE.size_12,
    color: COLORS.White
  },
  dateText: {
    fontFamily: "poppins_medium",
    fontSize: FONTSIZE.size_24,
    color: COLORS.White
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeText: {
    fontFamily: "poppins_regular",
    fontSize: FONTSIZE.size_14,
    color: COLORS.White
  },
  timeArrayContainer: {
    marginVertical: SPACING.space_24
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  }, 
  priceContainerMain: {
    alignItems: 'center'
  },
  priceTextHeader: {
    fontFamily: "poppins_regular",
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey
  },
  priceMain: {
    fontFamily: "poppins_medium",
    fontSize: FONTSIZE.size_24,
    color: COLORS.White
  },
  ctaText: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: "poppins_semibold",
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    backgroundColor: COLORS.Orange
  }
});

export default SeatBooking;
