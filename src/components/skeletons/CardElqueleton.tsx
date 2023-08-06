import React from "react";

const CardElqueleton = () => {
  return (
    <div className="esqueleton_card">
      <div className="card">
        <div className="cover skeleton">
          <img id="cover" src="" />
        </div>

        <ContentEsqueleton />
      </div>
    </div>
  );
};

export const BoxEsqueleton = ({ height = "auto" }: { height?: string }) => {
  return (
    <div className="esqueleton_card ">
      <div className="card ">
        <div className="cover skeleton" style={{ height: height }}>
          <img id="cover" src="" />
        </div>
      </div>
    </div>
  );
};

export const ContentEsqueleton = () => {
  return (
    <div className="esqueleton_card">
      <div className="content">
        <h2 id="title" className="skeleton"></h2>
        <small id="subtitle" className="skeleton"></small>
        <p id="about" className="skeleton"></p>
      </div>
    </div>
  );
};

export default CardElqueleton;
