import React from "react";

function ToyCard( {toy, onLike, onDonate }) {

  const { id, name, image, likes } = toy;

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name /* Toy's Name */}</h2>
      <img
        src={image /* Toy's Image */}
        alt={name /* Toy's Name */}
        className="toy-avatar"
      />
      <p>{likes /* Toy's Likes */} Likes </p>
      <button className="like-btn" onClick={() => onLike(id)}>Like {"<3"}</button>
      <button className="del-btn" onClick={() => onDonate(id)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
