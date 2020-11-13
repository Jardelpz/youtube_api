import React, { Component } from 'react';
import '../../src/style.css'

const ImageList = (props) => {
  const images = props.images.map((image) => {
    return <img src={image.snippet.thumbnails.medium.url} class="images" />;
  });

  return <div class="list-images">{images}</div>;
};

export default ImageList;