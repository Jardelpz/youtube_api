import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import CategoiasList from './CategoriasList'
import Load from './Load'

export default function GetComentario(props) {
   
	// const [categorias, setCategorias] = useState([])
	// const [Loading, setLoading] = useState(false)
	// const [error, setError] = useState("")

	useEffect(()=> {
		getComments();
	}, [])

	function getComments(){
		// setLoading(true)
		// 	axios
		// 		.get('https://youtube.googleapis.com/youtube/v3/videoCategories', { 
		// 			params: {
		// 				key: 'AIzaSyBTgWzn1m8oOCYN0c4qDrjsktoqxmtvV6s',
		// 				part: 'snippet',
		// 				maxResults: 10,
		// 				regionCode: "BR"


		// 			}})
		// 		.then(response => {
		// 			console.log(response.data.items)
		// 			setCategorias(response.data.items)
		// 			setLoading(false)
		// 		})
		// 		.catch(error => {
		// 			setError(error)
		// 			console.log(error)
		// 		})
		return
	}


	return (
		
		// <div>
		// 	{error ? <p>{error.message}</p> : null}
		// 	{!Loading ? (
		// 		<CategoiasList categorias={categorias} />
		// 	) : (
		// 		<Load />
		// 	)}
		// </div>
		<div>sfd</div>
	)
}	