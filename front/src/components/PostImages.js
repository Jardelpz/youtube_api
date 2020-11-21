import React, { Component } from 'react';
import axios from 'axios'
import ImageList from './ImageList'
import Load from './Load'


class PostForm extends Component {
    constructor(props){
        super(props)
		this.state = {
			title: '',
			posts: [],
			graphicData: [],
			isLoading: false,
			error: null
		}
	}

	load_graphic_data = (res) => {
		this.setState({isLoading: true})
		axios({
			method: 'post',
			url: 'http://127.0.0.1:5000/subs',
			data: res.items })

			.then(response => {
				this.setState({
					graphicData: response.data.channels,
					isLoading: false
				})
			})
			.catch(error => {
			  console.log(error)
			})
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}


	submitHandler = e => {
		e.preventDefault()
		this.setState({isLoading: true})
		axios
			.get('https://youtube.googleapis.com/youtube/v3/search', { 
				params: {
					q: this.state.title,
					key: 'AIzaSyCFaTZgGLuy4XEEgyOe4y_J9imRK4miRr8',
					part: 'snippet',
					maxResults: 10

				}})
			.then(response => {
				this.setState({
							posts: response.data.items,
							isLoading: false
							})
				this.load_graphic_data(response.data);
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { title, isLoading, error, posts, graphicData } = this.state
		return (
			<div class="form-post">
				<form onSubmit={this.submitHandler}>
					<div>
						Tema: <input
							type="text"
							name="title"
							value={title}
							onChange={this.changeHandler}
						/>
					</div>
					
					<button type="submit">Submit</button>
				</form>

				<div>
					{error ? <p>{error.message}</p> : null}
					
					{!isLoading ? (
						<div>
							{graphicData ? (
								<ImageList images={this.state.posts} graphicData={this.state.graphicData}/>
							):(
								<p> </p>
							)}
						</div>

						
					) : (
						<Load />
					)}
				</div>
			</div>

		)
	}
}

export default PostForm