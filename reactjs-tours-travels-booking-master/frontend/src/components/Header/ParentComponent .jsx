import React from "react";
import { useHistory } from "react-router-dom";
import AdminPanel from "./AdminPanel";

const ParentComponent = () => {
  const history = useHistory();

  // Function to handle the click event for "List Tours" button
  const handleListToursClick = () => {
    history.push("/tours"); // Navigate to the Tours page
  };

  return <AdminPanel onListToursClick={handleListToursClick} />;
};

export default ParentComponent;
