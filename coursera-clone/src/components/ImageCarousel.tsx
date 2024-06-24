"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type ImageCarouselProps = {
  images: string[];
};

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  return (
    <Carousel showArrows={true} infiniteLoop={true} showThumbs={false} dynamicHeight={true}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Course Image ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
