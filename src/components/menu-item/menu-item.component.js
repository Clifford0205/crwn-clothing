import React from 'react';
import { withRouter } from 'react-router-dom';
import './menu-item.styles.scss';

// 有了 withRouter 就能拿到router傳進來的參數 這裡的 history,match就是
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  console.log(match);
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
