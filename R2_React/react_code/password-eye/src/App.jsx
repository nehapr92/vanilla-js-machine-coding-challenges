import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./App.css";

function TogglePassword() {
  const [visible, setVisible] = useState(false)

  const handleClick = () => {
    setVisible(prev => !prev)
  }
  
  return (
    <div className="container">
      <h1 className="title">Toggle Password</h1>
      <div className="password-wrapper">
        <input
          type={visible ? "text" : "password"}
          id="password"
          placeholder="Enter password"
          className="password-input"
          data-testid="password-input"
        />
        <span
          className="icon"
          data-testid="toggle-icon"
          onClick={handleClick}
        >
          {visible ? <Eye size={18} /> : <EyeOff size={18} />}
        </span>
      </div>
      <span className="visibility-label" data-testid="visibility-label">
        {visible ? "Password Visible" : "Password Hidden" }
      </span>
    </div>
  );
}

export default TogglePassword;