import React from "react";

export default React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: value => {}
});
