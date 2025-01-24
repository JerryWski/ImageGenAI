import img1 from '../assets/img1.webp';
import img2 from '../assets/img2.webp';
import img3 from '../assets/img3.webp';

const Gallery = () => {
  const images = [
    img2,
    img1,
    img3,
    img1,
    img3,
    img2,
    img3,
    img1,
    img2,
  ];

  return (
    <div className='container mx-auto max-w-[1100px] max-h-[700px] overflow-hidden px-4 py-8'>
      <h1 className='text-2xl font-bold text-center mb-6'>Masonry Gallery</h1>
      <div className='columns-2 xs:columns-1 sm:columns-3'>
        {images.map((image, index) => (
          <img
            key={index}
            className='w-full mb-4'
            src={image}
            alt='ai generated image'
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
