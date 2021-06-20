import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Platform,
	Dimensions,
	Image,
	FlatList,
	Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { watchListMovies } from '../services/api';
import { RequestProps } from './MovieDetails';
import { AirbnbRating } from 'react-native-ratings';

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Backdrop = ({ movies, scrollX }: any) => {
	return (
		<View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
			<FlatList
				data={movies.reverse()}
				keyExtractor={(item) => item.key + '-backdrop'}
				removeClippedSubviews={false}
				contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
				renderItem={({ item, index }) => {
					if (!item.backdrop) {
						return null;
					}
					const translateX = scrollX.interpolate({
						inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
						outputRange: [0, width],
					});
					return (
						<Animated.View
							removeClippedSubviews={false}
							style={{
								position: 'absolute',
								width: translateX,
								height,
								overflow: 'hidden',
							}}
						>
							<Image
								source={{ uri: item.backdrop }}
								style={{
									width,
									height: BACKDROP_HEIGHT,
									position: 'absolute',
								}}
							/>
						</Animated.View>
					);
				}}
			/>
			<LinearGradient
				colors={['rgba(0, 0, 0, 0)', '#171821']}
				style={{
					height: BACKDROP_HEIGHT,
					width,
					position: 'absolute',
					bottom: 0,
				}}
			/>
		</View>
	);
};

export default function Favorites() {
	const [movies, setMovies] = useState<any>([]);
	const scrollX = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		async function loadMovies() {
			const { data } = await axios.get<RequestProps>(watchListMovies.url);
			const getImagePath = (path: string) =>
				`https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
			const getBackdropPath = (path: string) =>
				`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${path}`;
			const movies = data.results.map(
				({
					id,
					title,
					poster_path,
					backdrop_path,
					vote_average,
					overview,
					release_date,
				}) => ({
					key: String(id),
					title,
					poster: getImagePath(poster_path),
					backdrop: getBackdropPath(backdrop_path),
					rating: vote_average,
					description: overview,
					releaseDate: release_date,
				}),
			);

			setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }]);
		}

		loadMovies();
	}, []);

	return (
		<View style={styles.container}>
			<Backdrop movies={movies} scrollX={scrollX} />
			<Animated.FlatList
				showsHorizontalScrollIndicator={false}
				data={movies}
				keyExtractor={(item) => item.key}
				horizontal
				decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
				renderToHardwareTextureAndroid
				contentContainerStyle={{ alignItems: 'center' }}
				snapToInterval={ITEM_SIZE}
				snapToAlignment="start"
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false },
				)}
				scrollEventThrottle={16}
				renderItem={({ item, index }) => {
					if (!item.poster) {
						return <View style={{ width: EMPTY_ITEM_SIZE }} />;
					}

					const inputRange = [
						(index - 2) * ITEM_SIZE,
						(index - 1) * ITEM_SIZE,
						index * ITEM_SIZE,
					];

					const translateY = scrollX.interpolate({
						inputRange,
						outputRange: [100, 50, 100],
						extrapolate: 'clamp',
					});

					return (
						<View style={{ width: ITEM_SIZE }}>
							<Animated.View
								style={{
									marginHorizontal: SPACING,
									padding: SPACING * 2,
									alignItems: 'center',
									transform: [{ translateY }],
									backgroundColor: 'transparent',
									borderRadius: 34,
								}}
							>
								<Image
									source={{ uri: item.poster }}
									style={styles.posterImage}
								/>
								<Text style={{ fontSize: 24, color: '#fff' }} numberOfLines={1}>
									{item.title}
								</Text>
								<AirbnbRating
									isDisabled
									showRating={false}
									size={18}
									count={5}
									selectedColor="#FBC632"
									defaultRating={Math.floor(item.rating / 2)}
									starContainerStyle={{
										marginVertical: 10,
									}}
								/>
								{/* <Genres genres={item.genres} /> */}
								<Text
									style={{ fontSize: 12, color: '#b6b7c2' }}
									numberOfLines={3}
								>
									{item.description}
								</Text>
							</Animated.View>
						</View>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#171821',
		paddingBottom: 36,
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	posterImage: {
		width: '100%',
		height: ITEM_SIZE * 1.2,
		resizeMode: 'cover',
		borderRadius: 24,
		margin: 0,
		marginBottom: 10,
	},
});
