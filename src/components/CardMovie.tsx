import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import formatDate from '../utils/formatDate';

interface CardMovieProps {
	id: number;
	title: string;
	img: string;
	date: string;
	backgroundImg?: string;
	overview?: string;
	average?: number;
}

const deviceSize = Dimensions.get('window');

export default function CardMovie({
	id,
	title,
	img,
	date,
	backgroundImg,
	overview,
	average,
}: CardMovieProps) {
	const imageBaseURL = 'https://image.tmdb.org/t/p/w500';
	const navigation = useNavigation();

	function handleRoute() {
		navigation.navigate('MovieDetails', {
			id,
			img,
			title,
			date,
			backgroundImg,
			overview,
			average,
		});
	}

	return (
		<TouchableOpacity
			onPress={handleRoute}
			style={styles.container}
			activeOpacity={0.75}
		>
			<Image source={{ uri: `${imageBaseURL}/${img}` }} style={styles.img} />
			<Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
				{title}
			</Text>
			<Text style={styles.date}>{formatDate(date)}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 8,
	},
	title: {
		color: '#fff',
		fontSize: 16,
		marginTop: 6,
		paddingLeft: 8,
		maxWidth: 140,
	},
	img: {
		width: deviceSize.width * 0.4,
		height: deviceSize.height * 0.34,
		borderRadius: 20,
	},
	date: {
		color: '#83848d',
		marginTop: 2,
		fontSize: 14,
		paddingLeft: 8,
		textTransform: 'capitalize',
	},
});
