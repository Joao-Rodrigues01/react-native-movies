import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import formatDate from '../utils/formatDate';

interface CardTVShowProps {
  name: string;
  img: string;
  date: string;
  backgroundImg?: string;
  overview?: string;
  average?: number;
}

const deviceSize = Dimensions.get('window');


export default function CardTVShow({ name, img, date, backgroundImg, average, overview }: CardTVShowProps) {
  const imageBaseURL =  'https://image.tmdb.org/t/p/w500';
  const navigation = useNavigation();

  function handleRoute() {
    navigation.navigate('TVShowDetails', { 
      name,
      date,
      backgroundImg,
      average,
      overview 
    })
  }

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.75}
      onPress={handleRoute}
    >
      <Image source={{ uri: `${imageBaseURL}/${img}` }} style={styles.img}/>
      <Text numberOfLines={1}  ellipsizeMode="tail" style={styles.title}>{name}</Text>
      <Text style={styles.date}>{formatDate(date)}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginTop: 6,
    paddingLeft: 8,
    maxWidth: 140
  },
  img: {
    width: deviceSize.width * 0.40,
    height: deviceSize.height * 0.34,
    borderRadius: 20      
  },
  date: {
    color: '#83848d',
    marginTop: 2,
    fontSize: 14,
    paddingLeft: 8,
    textTransform: 'capitalize'
  }
})

