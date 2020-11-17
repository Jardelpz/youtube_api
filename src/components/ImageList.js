import React, { Component } from 'react';
import '../../src/style.css'

const ImageList = (props) => {
  const images = props.images.map((image) => {
    var url = "https://www.youtube.com/watch?v="+image.id.videoId
    return <a href={url} target="_blank"> <img src={image.snippet.thumbnails.medium.url} class="images" /> </a>;
  });

  return <div class="list-images">{images}</div>;
};

export default ImageList;