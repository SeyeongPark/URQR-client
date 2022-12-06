import React from 'react';
import CardFrame from './card-frame';

const Main = () => {
  return (
    <div className="background">
      <div className="input-container">
        <div className="nav-container">
          <CardFrame
            title="Create Card"
            src="https://cdn-icons-png.flaticon.com/512/7588/7588946.png"
            href="/create"
          />
          <CardFrame
            title="Search Card"
            src='https://cdn-icons-png.flaticon.com/512/751/751463.png'
            href="/search"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
