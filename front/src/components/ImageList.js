import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import '../../src/style.css'
import Chart from './Grafico'

export default function ImageList(props) {

  function actionLike(like, videoId, props) {

    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/like',
      data: {
        "action": like,
        "videoId": videoId
      }
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }


  const images = props.images.map((image) => {
    var url = "https://www.youtube.com/watch?v=" + image.id.videoId
    return <div class="list_of_images">
      <a href={url} target="_blank"> <img src={image.snippet.thumbnails.medium.url} class="images" /> </a>
      <p> Canal: {image.snippet.channelTitle}</p>
      <button type="submit" onClick={() => { actionLike('like', image.id.videoId, props) }}>Like</button>
      <button type="submit" onClick={() => { actionLike('dislike', image.id.videoId, props) }}>Dislike</button>
    </div>;
  });



  
  return <div class="list-images">
      <div> 
      {images? (
        <div>
          <Chart chartData={props.graphicData} />
          {images}
        </div>
      ):(
        <p>loading..</p>
      )}
      
      </div>
   
  </div>;
};
