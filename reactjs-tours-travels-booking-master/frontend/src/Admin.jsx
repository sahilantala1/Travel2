import React from "react";

function Admin() {
  const handleButtonClick = (buttonName) => {};

  return (
    <>
      {" "}
      <h1 className="h1 text-center ">Admin</h1>
      <div className="admin-panel">
        <div className="left-panel">
          <button
            className="btn btn-primary m-2 "
            onClick={() => handleButtonClick("listUsers")}
          >
            List Users
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => handleButtonClick("listTours")}
          >
            List Tours
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => handleButtonClick("addTour")}
          >
            Add Tour
          </button>
        </div>
      </div>
    </>
  );
}

export default Admin;
