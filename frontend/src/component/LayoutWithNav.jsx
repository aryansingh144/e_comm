// components/LayoutWithNav.jsx
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Ai from "./Ai";
function LayoutWithNav() {
  return (
    <>
      <Nav />
      <Outlet />
      <Ai />
    </>
  );
}

export default LayoutWithNav;
