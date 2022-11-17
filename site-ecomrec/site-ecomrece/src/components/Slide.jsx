import React from 'react'

import Carousel from 'react-bootstrap/Carousel';


function Slide() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/premium-photo/men-s-clothing-set-with-oxford-shoes-watch-sunglasses-office-shirt-tie-jacket-isolated-white-background-top-view_107612-80.jpg?w=2000"
          alt="First slide"
          width={"50vw"}
          height={"400px"}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.dastore.vc/wp-content/uploads/2022/04/Dastore.jpg"
          alt="Second slide"
          width={"50vw"}
          height={"400px"}
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://pic.clubic.com/v1/images/1955520/raw?fit=max&width=1200&hash=57388971a9dbb2c2795128583f477975ce80f5e6"
          alt="Third slide"
          width={"50vw"}
          height={"400px"}
        />

        <Carousel.Caption>
          <h3 style={{color:"black"}}>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slide;