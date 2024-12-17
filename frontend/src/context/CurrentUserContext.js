import React from "react";

const CurrentUserContext = React.createContext({
  name: "",
  about: "",
  avatar: "",
  email: "",
});
export default CurrentUserContext;
