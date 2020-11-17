import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import Load from './Load'

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
		const { message_coment, channelId, videoId, comment, isLoading, like, error } = this.state
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

				<div>
					{error ? <p>{error.message}</p> : null}
					{!isLoading ? (
							<h2>
								{message_coment}
							</h2>

					) : (
						<Load />
					)}
				</div>
			</div>

		)
	}

}
export default GetComentario