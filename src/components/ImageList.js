import React, { Component, useState } from 'react';
import axios from 'axios'
import '../../src/style.css'


    function actionLike(like, videoId)  {
    console.log(like)
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/like',
      data: { 
        "action": like,
        "videoId": videoId }
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

  }

  const ImageList = (props) => {
    const images = props.images.map((image) => {
      var url = "https://www.youtube.com/watch?v="+image.id.videoId
      return <div>
          <a href={url} target="_blank"> <img src={image.snippet.thumbnails.medium.url} class="images" /> </a>       				
          <button type="submit" onClick={()=> { actionLike('like', image.id.videoId)}}>Like</button>
          <button type="submit" onClick={()=> { actionLike('dislike', image.id.videoId)}}>Dislike</button>
          </div>;
    });

    return <div class="list-images">{images}</div>;
  };

  export default ImageList