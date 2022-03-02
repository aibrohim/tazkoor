import { FC } from "react";

import Google from "assets/images/google.svg";
import Apple from "assets/images/apple.svg";

import "./ways.scss";

const AuthWays:FC = function() {
  return (
    <div className="auth-ways">
      <button type="button" className="auth-ways__item">
        <div className="auth-ways__item-contentn">
          <img className="auth-ways__item-logo" src={Google} alt="Google logo" width="24" height="24" />
          <span className="auth-ways__item-text">Google</span>
        </div>
      </button>
      <button type="button" className="auth-ways__item">
        <div className="auth-ways__item-contentn">
          <img className="auth-ways__item-logo" src={Apple} alt="Apple logo" width="20" height="24" />
          <span className="auth-ways__item-text">Apple ID</span>
        </div>
      </button>
    </div>
  );
}

export default AuthWays;