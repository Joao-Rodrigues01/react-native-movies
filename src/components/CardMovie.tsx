import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import formatDate from '../utils/formatDate';

interface CardMovieProps {
  title: string;
  img: string;
  date: string;
}

export default function CardMovie({ title, img, date }: CardMovieProps) {
  const imageBaseURL =  'https://image.tmdb.org/t/p/w500';

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.75}>
      <Image source={{ uri: `${imageBaseURL}/${img}` }} style={styles.img}/>
      <Text numberOfLines={1}  ellipsizeMode="tail" style={styles.title}>{title}</Text>
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
    width: 152,
    height: 218,
    borderRadius: 18      
  },
  date: {
    color: '#686972',
    marginTop: 2,
    fontSize: 14,
    paddingLeft: 8,
    textTransform: 'capitalize'
  }
})



