import { useRoute } from '@react-navigation/core';
import React, { useEffect } from 'react';
import Constants from 'expo-constants';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';
import { getTheYear } from '../utils/formatDate';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addToWatchlist, watchListMovies } from '../services/api';
import { useState } from 'react';
import { MoviesDTO } from '../services/MoviesDTO';
import { AirbnbRating } from 'react-native-ratings';

const φ = (1 + Math.sqrt(5)) / 2;

const deviceSize = Dimensions.get('window');

export interface RequestProps {
	page: number;
	results: MoviesDTO[];
	total_pages: number;
	total_results: number;
}

export default function MovieDetails() {
	const [isInWatchlist, setIsInWatchlist] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const imageBaseURL = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
	const { params } = useRoute<any>();

	const { id, backgroundImg, title, date, overview, average } = params;

	useEffect(() => {
		async function findInWatchlist() {
			setIsLoading(true);

			const { data } = await axios.get<RequestProps>(watchListMovies.url);
			const movie = data.results.find((movie) => movie.id === id);
			if (movie) {
				setIsInWatchlist(true);
			}
			setIsLoading(false);
		}

		findInWatchlist();
	}, []);

	async function ToggleWatchlist() {
		setIsLoading(true);
		await axios.post(addToWatchlist.url, {
			media_type: 'movie',
			media_id: id,
			watchlist: !isInWatchlist,
		});

		setIsInWatchlist(!isInWatchlist);
		setIsLoading(false);
	}

	function teste() {
		return console.log('teste');
	}

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={[styles.imgContainer, { transform: [{ scale: 1 }] }]}>
				<Image
					source={{ uri: `${imageBaseURL}/${backgroundImg}` }}
					style={styles.img}
				/>

				<View
					style={{
						...StyleSheet.absoluteFillObject,
						backgroundColor: '#171821',
						opacity: 0.2,
					}}
				/>
			</View>

			<View style={styles.scrollContainer}>
				<View style={styles.header}>
					<View
						style={[
							styles.gradient,
							{ height: deviceSize.height * (1 - 1 / φ) },
						]}
					>
						<LinearGradient
							style={StyleSheet.absoluteFill}
							start={[0, 0.3]}
							end={[0, 1]}
							colors={['transparent', 'rgba(0, 0, 0, 0.35)', '#171821']}
						/>

						<TouchableOpacity
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								width: 42,
								height: 42,
							}}
							onPress={ToggleWatchlist}
						>
							{isLoading ? (
								<ActivityIndicator color="#fff" size={32} />
							) : isInWatchlist ? (
								<MaterialCommunityIcons
									name="bookmark-minus"
									color="#fff"
									size={32}
								/>
							) : (
								<MaterialCommunityIcons
									name="bookmark-minus-outline"
									color="#fff"
									size={32}
								/>
							)}
						</TouchableOpacity>
					</View>

					<View style={styles.movieContainer}>
						<Text style={styles.movieTitle}> {title} </Text>
						<Text style={styles.movieInfo}>
							{' '}
							{getTheYear(date)} | Adventure, Action | 2h 35min{' '}
						</Text>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-evenly',
								width: '48%',
								alignItems: 'center',
								marginBottom: 22,
							}}
						>
							<Text style={{ fontSize: 20, color: '#FBC632' }}>{average}</Text>
							<AirbnbRating
								isDisabled
								showRating={false}
								size={22}
								count={5}
								selectedColor="#FBC632"
								defaultRating={Math.floor(average / 2)}
							/>
						</View>
					</View>
				</View>
				<View style={{ alignItems: 'center' }}>
					<Text style={styles.movieOverView}>{overview}</Text>

					<RectButton style={styles.movieButton}>
						<Text style={styles.movieButtonText}>Watch now</Text>
					</RectButton>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#171821',
	},

	img: {
		...StyleSheet.absoluteFillObject,
	},
	imgContainer: {
		...StyleSheet.absoluteFillObject,
		height: 281 + Constants.statusBarHeight,
	},
	scrollContainer: {
		flex: 1,
	},
	header: {
		height: deviceSize.height * (1.22 - 1.21 / φ),
	},
	gradient: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	movieContainer: {
		...StyleSheet.absoluteFillObject,
		top: 180,
		justifyContent: 'center',
		alignItems: 'center',
	},
	movieTitle: {
		textAlign: 'center',
		color: 'white',
		fontSize: 22,
		marginBottom: 10,
	},
	movieInfo: {
		textAlign: 'center',
		color: '#b6b7c2',
		fontSize: 16,
		marginBottom: 14,
	},
	movieOverView: {
		textAlign: 'justify',
		color: '#8d8e99',
		fontSize: 16,
		lineHeight: 26,
		marginHorizontal: 20,
		marginBottom: 20,
	},
	movieButton: {
		backgroundColor: '#be2239',
		alignItems: 'center',
		justifyContent: 'center',
		width: 200,
		height: 52,
		borderRadius: 6,
		marginBottom: 20,
	},
	movieButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});
