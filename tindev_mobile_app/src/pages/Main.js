import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import {
	View,
	Text,
	SafeAreaView,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native'

import logo from '../assets/logo.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'

import api from '../services/api'

export default function Main({ navigation }) {
	const id = navigation.getParam('id')
	const [users, setUsers] = useState([])

	async function loadUsers() {
			const response = await api.get('/user', {
					headers: {
							giver: id
					}
			}).catch(res => console.log(res.response))
			setUsers(response.data.filter(user => user.id !== id))

			console.log(response.data)
	}

	useEffect(() => {
			loadUsers()
	}, [id])

	async function handleDislike() {
		// take the first element and then, rest
		const [user, ...rest] = users

			await api.post(`/dislikes/${user.id}`, {
					giver: id
			})

			loadUsers()
	}

	async function handleLike() {
		const [user, ...rest] = users

			await api.post(`/likes/${user.id}`, {
					giver: id
			})

			loadUsers()
	}

	async function handleLogout() {
		await AsyncStorage.clear()
		navigation.navigate('Login')
	}

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity onPress={handleLogout}>
				<Image style={styles.logo} source={logo} />
			</TouchableOpacity>
			<View style={styles.cardsContainer}>
				{ users.length === 0
					? <Text style={styles.empty}>Acabou :(</Text>
					: (
						users.map((user, index) => (
							<View key={users.length - index} style={[styles.card, { zIndex: users.length - index }]}>
								<Image style={styles.avatar} source={{ uri: user.avatar }} />
								<View style={styles.footer}>
									<Text style={styles.name}>{user.user}</Text>
									<Text style={styles.bio} numberOfLines={3}>{user.bio || 'Empty bio :('}</Text>
								</View>
							</View>
						))
					)
				}
			</View>
			{
				users.length > 0 && (
					<View style={styles.buttonsContainer}>
						<TouchableOpacity style={styles.button} onPress={handleDislike}>
							<Image source={dislike} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={handleLike}>
							<Image source={like} />
						</TouchableOpacity>
					</View>
				)
			}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	logo: {
		marginTop: 30
	},
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	cardsContainer: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'center',
		maxHeight: 500
	},
	card: {
		borderWidth: 1,
		borderColor: '#DDD',
		borderRadius: 8,
		margin: 30,
		overflow: 'hidden',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	avatar: {
		flex: 1,
		height: 300
	},
	footer: {
		backgroundColor: '#FFF',
		paddingHorizontal: 20,
		paddingVertical: 15
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333'
	},
	bio: {
		fontSize: 14,
		color: '#999',
		marginTop: 5,
		lineHeight: 18
	},
	buttonsContainer: {
		flexDirection: 'row',
		marginBottom: 30
	},
	button: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		elevation: 2,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowRadius: 2,
		shadowOffset: {
			width: 0,
			height: 2
		}
	},
	empty: {
		alignSelf: 'center',
		color: '#999',
		fontSize: 24,
		fontWeight: 'bold'
	}
})