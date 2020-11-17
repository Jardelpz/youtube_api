import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import CategoiasList from './CategoriasList'
import Load from './Load'

export default function GetCategorias(props) {
   
	const [categorias, setCategorias] = useState([])
	const [Loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	useEffect(()=> {
		getCategories();
	}, [])

	function getCategories(){
		setLoading(true)
			axios
				.get('https://youtube.googleapis.com/youtube/v3/videoCategories', { 
					params: {
						key: 'your_acess_token',
						part: 'snippet',
						maxResults: 10,
						regionCode: "BR"


					}})
				.then(response => {
					console.log(response.data.items)
					setCategorias(response.data.items)
					setLoading(false)
				})
				.catch(error => {
					setError(error)
					console.log(error)
				})
				
		}


	return (
		
		<div>
			{error ? <p>{error.message}</p> : null}
			{!Loading ? (
				<CategoiasList categorias={categorias} />
			) : (
				<Load />
			)}
		</div>
	)
}
	