import React, { Component } from 'react';

function NotFound(props) {
  return (
    <div className="displayInfoArea">
      <img
        className="errorPicture"
        src="https://i.kym-cdn.com/entries/icons/original/000/009/363/feels.jpg"
        alt="so sad"
      />
      <h1 className="errorText">Woops, something went wrong!</h1>
      <h2 className="errorText">
        {props.location.state !== undefined
          ? props.location.state.message
          : 'Unexpected error'}
      </h2>
    </div>
  );
}

export default NotFound;
