import { Container, Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Pho1 from '../asset/home_pic/1.jpg'
import Pho2 from '../asset/home_pic/2.jpg'


function PicturesCarousel() {
  return (
    <>
    <h1 className='HomePageTitle mb-5 mt-4'>Araç Envanter Sistemine Hoşgeldiniz...</h1>
    <Container >
        <Carousel slide={true}>
        <Carousel.Item>
          <Image
            className="fluid_image object-cover d-flex justify-content-center mx-auto rounded-4 "
            src={Pho2}
            alt="First slide
            object-contain
            Responsive image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className=" fluid_image object-cover  d-flex justify-content-center mx-auto rounded-4"
            src={Pho1}
            alt="Second slide
            Responsive image "
          />
        </Carousel.Item>
      </Carousel>
    </Container>
    </>
  );
}

export default PicturesCarousel;