
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import * as SecureStore from "expo-secure-store";
import AppHeader from '../components/AppHeader';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import { LinearGradient } from "expo-linear-gradient";
import CustomIcon from '../components/CustomIcon';

const Ticket = ({navigation, route}: any) => {
  const [ticketData, setTicketData] = useState<any>(route.params);

  useEffect(() => {
    (async () => {
      try {
        const ticket = await SecureStore.getItemAsync('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      }
    })();
  }, []);

  if (ticketData !== route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  if (ticketData == undefined || ticketData == null) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="arrow-left"
            header={'My Tickets'}
            action={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="arrow-left"
          header={"My Tickets"}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticketData?.ticketImg}}
          style={styles.ticketBGImage}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linearGradient}>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, left: -40},
              ]}></View>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, right: -40},
              ]}></View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.linear}></View>

        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}></View>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}></View>
          <View style={styles.ticketDateContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
              <Text style={styles.subtitle}>{ticketData?.date.day}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.subtitle}>{ticketData?.time}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subtitle}>02</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Row</Text>
              <Text style={styles.subtitle}>04</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subtitle}>
                {ticketData?.seatArray
                  .slice(0, 3)
                  .map((item: any, index: number, arr: any) => {
                    return item + (index == arr.length - 1 ? '' : ', ');
                  })}
              </Text>
            </View>
          </View>
          <Image
            source={require('../../assets/image/barcode.png')}
            style={styles.barcodeImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 - 5,
    marginBottom: SPACING.space_36 * .2,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 275,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    // objectFit: "contain"
  },
  linearGradient: {
    height: '40%',
  },
  linear: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 3,
    width: 275,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },
  ticketFooter: {
    backgroundColor: COLORS.Orange,
    width: 275,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  dateTitle: {
    fontFamily: "poppins_medium",
    fontSize: FONTSIZE.size_24 - 2,
    color: COLORS.White,
  },
  subtitle: {
    fontFamily: "poppins_regular",
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  subheading: {
    fontFamily: "poppins_medium",
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_24 - 2,
    color: COLORS.White,
    paddingBottom: SPACING.space_10,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
  },
});

export default Ticket;















// import * as React from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   StatusBar,
//   Image,
//   ImageBackground,
// } from "react-native";
// import * as SecureStore from "expo-secure-store";
// import AppHeader from "../components/AppHeader";
// import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
// import CustomIcon from "../components/CustomIcon";
// import { LinearGradient } from "expo-linear-gradient";

// const Ticket = ({ navigation, route }: any) => {
//   const [ticketData, setTicketData] = React.useState<any>(route.params);

//   React.useEffect(() => {
//     (async () => {
//       try {
//         const ticket = await SecureStore.getItemAsync("ticket");
//         if (ticket !== undefined && ticket !== null) {
//           setTicketData(JSON.parse(ticket));
//         }
//       } catch (error) {
//         console.error("Something went wrong with ticket data", error);
//       }
//     })();
//   }, []);

//   if(ticketData !== route.params && route.params !== undefined) {
//     setTicketData(route.params)
//   }

//   // console.log(ticketData)

//   if (ticketData == undefined || ticketData == null) {
//     return (
//       <View style={styles.container}>
//         <StatusBar hidden />
//         <View style={styles.appHeaderContainer}>
//           <AppHeader
//             name="arrow-left"
//             header={"My Tickets"}
//             action={() => navigation.goBack()}
//           />
//         </View>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar hidden />
//       <View style={styles.appHeaderContainer}>
//         <AppHeader
//           name="arrow-left"
//           header={"My Tickets"}
//           action={() => navigation.goBack()}
//         />
//       </View>
//       <View style={styles.ticketContainer}>
//         <ImageBackground
//           source={{ uri: ticketData?.ticketImg }}
//           style={styles.imagePostImageContainer}
//         >
//           <LinearGradient
//             colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
//             style={styles.linearGradientContainer}
//           >
//             <View  style={[styles.blackCircle, {position: 'absolute', bottom: -40, left: -40}]}>

//             </View>
//             <View  style={[styles.blackCircle, {position: 'absolute', bottom: -40, right: -40}]}>

// </View>
//           </LinearGradient>
//         </ImageBackground>
//         <View style={styles.lines}></View>
//         <View style={styles.ticketFooter}>
//         <View  style={[styles.blackCircle, {position: 'absolute', top: -40, right: -40}]}>
// </View>
// <View  style={[styles.blackCircle, {position: 'absolute', top: -40, left: -40}]}>
// </View>
//           <View style={styles.ticketDateContainer}>
//             <View style={styles.ticketSubSeatContainer}>
//               <Text style={styles.ticketDateText}>{ticketData?.date.date}</Text>
//               <Text style={styles.ticketDayText}> {ticketData?.date.day}</Text>
//             </View>
//             <View style={styles.ticketSubSeatContainer}>
//               <CustomIcon name="clock" style={styles.clockIcon} />
//               <Text style={styles.ticketDayText}> {ticketData?.time}</Text>
//             </View>
//           </View>
//           <View style={styles.ticketSeatContainer}>
//             <View style={styles.ticketSubSeatContainer}>
//               <Text style={styles.ticketTitleText}>Hall</Text>
//               <Text style={styles.ticketSubtitleText}> 02</Text>
//             </View>
//             <View style={styles.ticketSubSeatContainer}>
//               <Text style={styles.ticketTitleText}>Row</Text>
//               <Text style={styles.ticketSubtitleText}> B5</Text>
//             </View>
//             <View style={styles.ticketSubSeatContainer}>
//               <Text style={styles.ticketTitleText}>Seats</Text>
//               <Text style={styles.ticketSubtitleText}>
//                 {ticketData?.seatArray
//                   .slice(0, 3)
//                   .map((item: any, index: number, arr: any) => {
//                     return item + (index == arr.length - 1 ? "" : ", ");
//                   })}
//               </Text>
//             </View>
//           </View>
//           <Image
//             source={require("../../assets/image/barcode.png")}
//             style={styles.barcodeImg}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     backgroundColor: COLORS.Black,
//   },
//   appHeaderContainer: {
//     marginHorizontal: SPACING.space_36,
//     marginTop: SPACING.space_20 * 2
//   },
//   ticketContainer: {
//     // flex: 1,
//     justifyContent: "center"
//   },
//   imagePostImageContainer: {
//     alignSelf: "center",
//     width: 300,
//     aspectRatio: 250 / 300,
//     borderTopLeftRadius: BORDERRADIUS.radius_25,
//     borderTopRightRadius: BORDERRADIUS.radius_25,
//     overflow: 'hidden',
//     justifyContent: "flex-end"
//   },
//   linearGradientContainer: {
//     height: "70%",
//   },
//   lines: {
//     borderTopColor: COLORS.Black,
//     borderTopWidth: 2,
//     width: 300,
//     alignSelf: 'center',
//     backgroundColor: COLORS.Orange,
//     borderStyle: 'dashed'
//   },
//   ticketFooter: {
//     backgroundColor: COLORS.Orange,
//     width: 300,
//     alignItems: "center",
//     paddingBottom: SPACING.space_36,
//     alignSelf: "center",
//     borderBottomLeftRadius: BORDERRADIUS.radius_25,
//     borderBottomRightRadius: BORDERRADIUS.radius_25,
//   },
//   ticketDateContainer: {
//     flexDirection: 'row',
//     gap: SPACING.space_36,
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: SPACING.space_10 
//   },
//   ticketDateText: {
//     fontFamily: "poppins_medium",
//     fontSize: FONTSIZE.size_20,
//     color: COLORS.White
//   },
//   ticketDayText: {
//     fontFamily: "poppins_regular",
//     fontSize: FONTSIZE.size_12,
//     color: COLORS.White
//   },
//   ticketSeatContainer: {
//     flexDirection: 'row',
//     gap: SPACING.space_36,
//     alignItems: 'center',
//     justifyContent: "center",
//     marginVertical: SPACING.space_18
//   },
//   ticketSubSeatContainer: {
//     alignItems: 'center',
//     justifyContent: "center",
//     // marginVertical: SPACING.space_20
//   },
//   ticketTitleText: {
//     fontFamily: "poppins_medium",
//     fontSize: FONTSIZE.size_18,
//     color: COLORS.White
//   },
//   ticketSubtitleText: {
//     fontFamily: "poppins_medium",
//     fontSize: FONTSIZE.size_18,
//     color: COLORS.White
//   },
//   clockIcon: {
//     fontSize: FONTSIZE.size_20,
//     color: COLORS.White,
//     paddingBottom: SPACING.space_10
//   },
//   barcodeImg: {
//     height: 50,
//     aspectRatio: 158 / 52
//   },
//   blackCircle: {
//     height: 80,
//     width: 80,
//     borderRadius: 80,
//     backgroundColor: COLORS.Black
//   }
// });

// export default Ticket;
