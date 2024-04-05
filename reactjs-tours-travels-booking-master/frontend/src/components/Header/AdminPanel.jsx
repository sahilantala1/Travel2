import React, { useState, useContext } from "react";
import ListTour from "./ListTour";
import { BASE_URL } from "../../utils/config";
import "./Admin.css";
import { AuthContext } from "../../context/AuthContext";
import AddTour from "./AddTour";

const AdminPanel = ({ username }) => {
  // State to control the visibility of the Users and Tours components
  const [showUsers, setShowUsers] = useState(false);
  const [showTours, setShowTours] = useState(false);
  const [showAddTour, setShowAddTour] = useState(false);
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);
  console.log(token);

  const handleButtonClick = async (buttonName) => {
    if (buttonName === "listUsers") {
      setShowUsers(true);
      setShowTours(false);
      setShowAddTour(false); // Close AddTour form if open
      const res = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await res.json();
      if (!result.success) alert("You are not an admin");
      else setUsers(result.data);
    } else if (buttonName === "listTours") {
      setShowTours(true);
      setShowUsers(false);
      setShowAddTour(false); // Close AddTour form if open
    } else if (buttonName === "addTour") {
      setShowAddTour(true);
      setShowTours(false);
      setShowUsers(false);
    }
  };

  return (
    <>
      <div className="container admin-panel">
        <div className="left-panel">
          <button
            className="btn btn-primary m-2"
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
            Create Tour
          </button>
        </div>
      </div>

      {showUsers && (
        <div className="container user-list">
          <h2 className="userHead h2 text-center ">User List</h2>
          <ul>
            <li>
              <div>Number Of Users</div>
              <div>ID</div>
              <div>Username</div>
              <div>Email</div>
            </li>
            {users.map(
              (user, index) =>
                user.username !== "admin" && (
                  <li key={user._id}>
                    <div>{index}</div>
                    <div>{user._id}</div>
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {showTours && <ListTour />}
      {showAddTour && <AddTour onClose={() => setShowAddTour(false)} />}
    </>
  );
};

export default AdminPanel;
