import React from "react";

const CurrentUserContext = React.createContext({
  name: "",
  about: "",
  avatar: "",
});
export default CurrentUserContext;
