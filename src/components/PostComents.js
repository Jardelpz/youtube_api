import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import Load from './Load'
import Switch from 'react-input-switch';

class GetComentario extends Component {

    constructor(props){
        super(props)
		this.state = {
			comment: '',
			channelId: '',
			videoId: '',
			message_coment: '',
			message_like: '',
			like: 'like',
			isLoading: false,
			error: null
		}
	}

	like = e => {
		e.preventDefault()
		axios({
			method: 'post',
			url: 'http://127.0.0.1:5000/like',
			data: { 
				"action": 'like',
				"videoId": this.state.videoId }
			})
			.then(response => {
				this.setState({
							message_like: response.data.message,
							isLoading: false
							})
			})
			.catch(error => {
				this.setState({
					error: error,
					isLoading: false
					})
				console.log(error)
			})
	}


	dislike = e => {
		e.preventDefault()
		axios({
			method: 'post',
			url: 'http://127.0.0.1:5000/like',
			data: { 
				"action": 'dislike',
				"videoId": this.state.videoId }
			})
			.then(response => {
				this.setState({
							message_like: response.data.message,
							isLoading: false
							})
			})
			.catch(error => {
				this.setState({
					error: error,
					isLoading: false
					})
				console.log(error)
			})
	
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		this.setState({isLoading: true})


		axios({
			method: 'post',
			url: 'http://127.0.0.1:5000/comment',
			data: { 
				"comment": this.state.comment,
				"channelId": this.state.channelId,
				"videoId": this.state.videoId }
			})
			.then(response => {
				this.setState({
							message_coment: response.data.message,
							isLoading: false
							})
			})
			.catch(error => {
				this.setState({
					error: error,
					isLoading: false
					})
				console.log(error)
			})
	}


	render() {
		const { message_coment, message_like, channelId, videoId, comment, isLoading, like, error } = this.state
		return (
			<div class="form-post">
				<form onSubmit={this.submitHandler}>
					<div>
						Id do canal: <input
							type="text"
							name="channelId"
							value={channelId}
							onChange={this.changeHandler}
						/>
					</div>

					<div>
						Id do Vídeo: <input
							type="text"
							name="videoId"
							value={videoId}
							onChange={this.changeHandler}
						/>
					</div>

					<div>
						Comentário a publicar: <textarea
							type="text"
							name="comment"
							value={comment}
							onChange={this.changeHandler}
						/>
					</div>
					
					<button type="submit">Submit</button>

				</form>
				
  				
				<button type="submit" onClick={this.like}>Like</button>
				<button type="submit" onClick={this.dislike}>Dislike</button>

				<div>
					{error ? <p>{error.message}</p> : null}
					{!isLoading ? (
						<div>
							<h2>
								{message_coment}
							</h2>
							<h3>
								{message_like}
							</h3>
						</div>

					) : (
						<Load />
					)}
				</div>
			</div>

		)
	}

}
export default GetComentario