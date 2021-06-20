import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	ScrollView,
	StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CardMovie from '../components/CardMovie';
import CardTVShow from '../components/CardTVShow';

import {
	popularMovies,
	trendingTvShows,
	watchListMovies,
} from '../services/api';
import { MoviesDTO } from '../services/MoviesDTO';
import { TVShowDTO } from '../services/TVShowDTO';
import Lottie from 'lottie-react-native';
import MovieLoad from '../../movie-load.json';

export default function Home() {
	const [movies, setMovies] = useState<MoviesDTO[]>([]);
	const [tvShows, setTvShows] = useState<TVShowDTO[]>([]);
	const [watchList, setWatchList] = useState<MoviesDTO[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function loadMovies() {
			setIsLoading(true);
			const { data } = await axios.get(popularMovies.url);
			setMovies(data.results);
			setIsLoading(false);
		}

		async function loadTVShow() {
			const { data } = await axios.get(trendingTvShows.url);
			setTvShows(data.results);
		}

		async function loadWatchList() {
			const { data } = await axios.get(watchListMovies.url);
			setWatchList(data.results);
		}

		loadTVShow();
		loadMovies();
		loadWatchList();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar translucent backgroundColor="transparent" />

			<ScrollView>
				{isLoading ? (
					<View
						style={{
							marginTop: 220,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Lottie
							style={{
								width: 180,
							}}
							source={MovieLoad}
							loop
							autoPlay
						/>
					</View>
				) : (
					<>
						<View style={styles.header}>
							<Text style={styles.title}>
								Natt<Text style={styles.title2}>ive</Text>
							</Text>

							<Ionicons name="ios-search-outline" size={32} color="#FFF" />
						</View>

						<View style={styles.category}>
							<Text style={styles.categoryTitle}>Popular Movies</Text>

							<FlatList
								data={movies}
								keyExtractor={(item) => String(item.id)}
								renderItem={({ item }) => (
									<CardMovie
										id={item.id}
										title={item.title}
										date={item.release_date}
										img={item.poster_path}
										backgroundImg={item.backdrop_path}
										overview={item.overview}
										average={item.vote_average}
									/>
								)}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>
						</View>

						<View style={styles.category}>
							<Text style={styles.categoryTitle}>TV Show</Text>

							<FlatList
								data={tvShows}
								keyExtractor={(item) => String(item.id)}
								renderItem={({ item }) => (
									<CardTVShow
										name={item.name}
										date={item.first_air_date}
										img={item.poster_path}
										backgroundImg={item.backdrop_path}
										overview={item.overview}
										average={item.vote_average}
									/>
								)}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>
						</View>

						<View style={[styles.category, { marginBottom: 116 }]}>
							<Text style={styles.categoryTitle}>Watch List</Text>

							<FlatList
								data={watchList}
								keyExtractor={(item) => String(item.id)}
								renderItem={({ item }) => (
									<CardMovie
										id={item.id}
										title={item.title}
										date={item.release_date}
										img={item.poster_path}
										backgroundImg={item.backdrop_path}
										overview={item.overview}
										average={item.vote_average}
									/>
								)}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>
						</View>
					</>
				)}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#171821',
		paddingTop: 50,
		flex: 1,
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		color: '#fff',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	title: {
		color: '#fff',
		fontSize: 32,
	},
	title2: {
		color: '#be2239',
	},
	category: {
		marginTop: 20,
		marginBottom: 10,
	},
	categoryTitle: {
		color: '#fff',
		fontSize: 20,
		marginBottom: 16,
		marginLeft: 14,
	},
});
