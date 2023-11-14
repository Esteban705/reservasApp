import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../templates/style.css";

const ImageCarousel: React.FC<any> = ({ images }) => {
  return (
    <Carousel
      infiniteLoop
      showThumbs={false}
      swipeable
      emulateTouch
      stopOnHover
      className="w-2/3 mx-auto carousel"
    >
      {images.map((image: any, index: number) => (
        <div key={index}>
          <img
            className="object-contain"
            src={image.downloadURL}
            alt={image.data}
            style={{ width: "100%", height: "30rem" }} // Tamaño de las imágenes principales
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
