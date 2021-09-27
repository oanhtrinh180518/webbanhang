import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CustomButton from "../../shared/button/CustomButton";


function HomeCarousel(props) {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + 'img/carousel/Carousel-02.jpg'}
            alt="First slide"
          />
          <Carousel.Caption>
            <CustomButton to={'/Product'} title="SHOP NOW" />
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + 'img/carousel/Carousel-01.jpg'}
            alt="Second slide"
          />
          <Carousel.Caption>
            <CustomButton to={'/Product'} title="SHOP NOW" />
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;