import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div>
        <h4>User Links</h4>
        <ul>
          <li>
            <Link to="/cart">My Cart</Link>
          </li>
          <li>
            <Link to="/profile/update">Update Profile</Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div>
        <h3>User Information</h3>
        <ul>
          <li>{name}</li>
          <li>{email}</li>
          <li>{role === 1 ? "Admin" : "Registed User"}</li>
        </ul>
      </div>
    );
  };

  const purchageHistory = () => {
    return (
      <div>
        <h3>Purchase history</h3>
        <ul>
          <li>history</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout title="DashBoard" description="User DashBoard">
      {userLinks()}
      {userInfo()}
      {purchageHistory()}
    </Layout>
  );
};

export default UserDashboard;
