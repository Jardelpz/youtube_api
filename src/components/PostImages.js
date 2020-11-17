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
			isLoading: false,
			error: null
		}
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
					key: 'xxx',
					part: 'snippet',
					maxResults: 10

				}})
			.then(response => {
				this.setState({
							posts: response.data.items,
							isLoading: false
							})
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { title, isLoading, error, posts } = this.state
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
						<ImageList images={this.state.posts} />
					) : (
						<Load />
					)}
				</div>
			</div>

		)
	}
}

export default PostForm