import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
	KeyboardAvoidingView,
	Platform,
	View,
	StyleSheet,
	Image,
	TextInput,
	TouchableOpacity,
	Text
} from 'react-native'

import logo from '../assets/logo.png'

import api from '../services/api'

export default function Login({ navigation }) {
	const [user, setUser] = useState('')

	useEffect(() => {
		AsyncStorage.getItem('user').then(user => {
			if (user) {
				navigation.navigate('Main', { user })
			}
		})
	}, [])

	async function handleLogin() {
		const response = await api.post('/user', {
			user
		})
		const { id } = response.data
		console.log(response.data)

		await AsyncStorage.setItem('user', `${id}`)

		navigation.navigate('Main', { id })
	}

	return (
		<KeyboardAvoidingView
			behavior="padding"
			enabled={Platform.OS === 'ios'}
			style={styles.container}>
			<Image source={logo} />

			<TextInput
				autoCapitalize="none"
				autoCorrect={false}
				placeholder='Indique o seu nome de utilizador no Github'
				placeholderTextColor='#999'
				onChangeText={setUser}
				value={user}
				style={styles.input}/>

			<TouchableOpacity
				style={styles.button}
				onPress={handleLogin}>
				<Text style={styles.buttonText}>Enviar</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30
	},
	input: {
		height: 46,
		alignSelf: 'stretch',
		backgroundColor: '#FFF',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 4,
		marginTop: 20,
		paddingHorizontal: 15
	},
	button: {
		height: 46,
		alignSelf: 'stretch',
		backgroundColor: '#DF4723',
		borderRadius: 4,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16
	}
})
