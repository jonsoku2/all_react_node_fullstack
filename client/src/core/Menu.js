import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "black" };
  } else {
    return { color: "grey" };
  }
};
const Menu = ({ history }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/" style={isActive(history, "/")}>
            Home
          </Link>
        </li>

        <li>
          {isAuthenticated() && isAuthenticated().user.role === 1 ? (
            <Link to="/admin/dashboard" style={isActive(history, "/admin/dashboard")}>
              Dashboard
            </Link>
          ) : (
            <Link to="/user/dashboard" style={isActive(history, "/user/dashboard")}>
              Dashboard
            </Link>
          )}
        </li>

        {!isAuthenticated() && (
          <>
            <li>
              <Link to="/signin" style={isActive(history, "/signin")}>
                SignIn
              </Link>
            </li>
            <li>
              <Link to="/signup" style={isActive(history, "/signup")}>
                SignUp
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <>
            <li>
              <span
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
                style={{ cursor: "pointer" }}
              >
                signout
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
