import { useRoute } from '@react-navigation/core'
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import formatDate from '../utils/formatDate';

export default function MovieDetails() {
  const imageBaseURL =  'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
  const { params } = useRoute<any>();

  const { backgroundImg, title, date, overview, average } = params;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: `${imageBaseURL}/${backgroundImg}` }}
        style={styles.img}
        resizeMode="cover"
      />
      <LinearGradient
        colors={[
          'transparent',
          '#171821',
        ]}
        style={styles.linearGradient}
      />

        <ScrollView 
          style={styles.details}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <Text style={styles.detailsTitle}>
            {title}
          </Text>

          <Text style={styles.detailsInfo}>
            {formatDate(date)} | Adventure, Action | 2 h 53 min
          </Text>

          <View style={styles.detailsAverage}>
            <Text style={[{ color: '#FBC534', fontSize: 20 }, styles.gap]}>
              {average}
            </Text>
            <FontAwesome style={styles.gap} name="star" size={20} color="#FBC534"/>
            <FontAwesome style={styles.gap} name="star" size={20} color="#FBC534"/>
            <FontAwesome style={styles.gap} name="star" size={20} color="#FBC534"/>
            <FontAwesome style={styles.gap} name="star" size={20} color="#FBC534"/>
            <FontAwesome style={styles.gap} name="star" size={20} color="#A3A2A7"/>
          </View>

          <Text style={styles.sinopse}>{overview}</Text>


          <RectButton style={styles.button}>
            <Text style={styles.buttonText}>Watch Now</Text>
          </RectButton>
        </ScrollView>
    </View>
  )
}

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171821',
  },
  img: {
    width: deviceSize.width,
    height: deviceSize.height * 0.5
  },
  linearGradient: {
    position: 'absolute',
    top:  deviceSize.height * 0.09,
    width: deviceSize.width,
    height: 300,
  },
  details: {
    position: 'absolute',
    top: deviceSize.height * 0.36,
    maxHeight: deviceSize.height * 0.60,
  },
  detailsTitle: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'center',
  },
  detailsInfo: {
    color: '#a1a2aa',
    marginVertical: 16,
    textTransform: 'capitalize'
  },
  sinopse: {
    color: '#686972',
    lineHeight: 28,
    marginHorizontal: 18,
    textAlign: 'justify',
    fontSize: 17,
    marginBottom: deviceSize.height * 0.03,
  },
  detailsAverage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  gap: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#be2239',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 30
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }

})