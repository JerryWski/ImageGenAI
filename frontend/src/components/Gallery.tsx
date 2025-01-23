const Gallery = () => {
  const images = [
    '/frontend/src/assets/img2.webp',
    '/frontend/src/assets/img1.webp',
    '/frontend/src/assets/img3.webp',
    '/frontend/src/assets/img1.webp',
    '/frontend/src/assets/img3.webp',
    '/frontend/src/assets/img2.webp',
    '/frontend/src/assets/img3.webp',
    '/frontend/src/assets/img1.webp',
    '/frontend/src/assets/img2.webp',
    
  ];

  return (
    <div className='container mx-auto max-w-[1100px] max-h-[700px] overflow-hidden px-4 py-8'>
      <h1 className='text-2xl font-bold text-center mb-6'>Masonry Gallery</h1>

      <div className='columns-2 xs:columns-1 sm:columns-3'>
        {images.map((image, index) => (
          <img key={index} className='w-full mb-4' src={image} alt='ai generated image' />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
