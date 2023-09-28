import React from 'react';

const Legend = () => {
  return (
    <div className="legend mx-auto">
      <h5><b className='bg-primary'>Shonen</b> - Anime/manga for young teenage boys</h5>
      <h5><b className='bg-success'>Shojo</b> - Anime/manga for young teenage girls</h5>
      <h5><b className='bg-warning'>Seinen</b> - Anime/manga for older teens and men</h5>
      <h5><b className='bg-danger'>Josei</b> - Anime/manga for older teens and women</h5>
    </div>
  );
}

export default Legend;
