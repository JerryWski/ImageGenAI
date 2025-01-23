const Gallery = () => {
  // const images = [
  //     '/frontend/src/assets/img1.webp',
  //     '/frontend/src/assets/img1.webp',
  //     '/frontend/src/assets/img1.webp',
  //     '/frontend/src/assets/img1.webp',
  //     '/frontend/src/assets/img1.webp',
  //     '/frontend/src/assets/img1.webp',
  //     '/frontend/src/assets/img1.webp',
  //     '/frontend/src/assets/img1.webp',
  // ]

  return (
    <div className='container mx-auto max-w-[1100px] px-4 py-8'>
      <h1 className='text-2xl font-bold text-center mb-6'>Masonry Gallery</h1>

      <div className='columns-2 xs:columns-1 sm:columns-3'>
        <img className="w-full mb-4  " src='/frontend/src/assets/img2.webp' alt='' />
        <img className="w-full mb-4  " src='/frontend/src/assets/img1.webp' alt='' />
        <img className="w-full mb-4  " src='/frontend/src/assets/img3.webp' alt='' />
        <img className="w-full mb-4  " src='/frontend/src/assets/img1.webp' alt='' />
        <img className="w-full mb-4  " src='/frontend/src/assets/img3.webp' alt='' />
        <img className="w-full mb-4  " src='/frontend/src/assets/img2.webp' alt='' />
        <img className="w-full mb-4  " src='/frontend/src/assets/img3.webp' alt='' />
        <img className="w-full mb-4  " src='/frontend/src/assets/img1.webp' alt='' />
        <img className="w-full mb-4  " src='/frontend/src/assets/img2.webp' alt='' />
        <img className="w-full mb-4  " src='/frontend/src/assets/img2.webp' alt='' />
      </div>
    </div>
  );
};

export default Gallery;
