// components/LayoutWithNav.jsx
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Ai from "./Ai";
function LayoutWithNav() {
  return (
    <>
      <Nav />
      <div className="pt-[20px] min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] overflow-x-hidden z-[2]">
        <Outlet />
      </div>
      <Ai />
    </>
  );
}

export default LayoutWithNav;
