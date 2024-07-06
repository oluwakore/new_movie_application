import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';

interface CastCardProps {
  imagePath: string;
  title: string;
  subtitle: string
  shouldMarginatedAtEnd?: boolean;
  cardWidth?: number; 
  isFirst?: boolean;
  isLast?:boolean
}

const CastCard = (props: CastCardProps) => {
  return (
    <View style={[styles.container, props.shouldMarginatedAtEnd ? props.isFirst ? {marginLeft: SPACING.space_24} : props.isLast ? {marginRight: SPACING.space_24} : {} : {}, {maxWidth: props.cardWidth}]}>
      <Image  source={{ uri:props.imagePath }} style={[styles.cardImage, {width: props.cardWidth}]} />
    <Text style={styles.cardText} numberOfLines={1}> {props.title}</Text>
    <Text style={styles.cardSubText} numberOfLines={1}> {props.subtitle}</Text>
    </View>
  );
};

export default CastCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  cardImage: {
    aspectRatio: 1920/2880,
    borderRadius: BORDERRADIUS.radius_25 * 4,
  },
  cardText: {
    alignSelf: 'stretch',
    fontFamily: "poppins_medium",
    color: COLORS.White,
    fontSize: FONTSIZE.size_12
  },
  cardSubText: {
    alignSelf: 'stretch',
    fontFamily: "poppins_medium",
    color: COLORS.White,
    fontSize: FONTSIZE.size_10
  }
});
