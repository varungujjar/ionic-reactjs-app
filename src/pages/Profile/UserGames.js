import React from "react";

const UserGames = ({ items, isLoading }) => {
  return (
    <div className="mt-4">
      <h6>Games</h6>
      {!isLoading ? (
        <div className="text-muted mb-4">No Games Selected</div>
      ) : (
        <div className="placeholder-glow">
          <span className="placeholder col-7"></span>
        </div>
      )}
    </div>
  );
};

export default UserGames;
