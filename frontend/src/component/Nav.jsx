import React, { useContext, useState, useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import {
  FaRegUser,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaHome,
  FaThList,
  FaPhone,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/authContext";
import { shopDataContext } from "../context/ShopContext";

function Nav() {
  const [showProfile, setShowProfile] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false); // 🔹 New
  const { getCurrentUser, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { getCartCount, search, setSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      navigate("/");
      getCurrentUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow">
      <div className="relative">

        <div className="w-full px-4 md:px-6 py-3 flex justify-between items-center border-b border-gray-200">
          {/* Logo */}
          <div
            className="text-xl font-bold tracking-wide cursor-pointer"
            onClick={() => navigate("/")}
          >
            MERCAZO
          </div>


          <div className="hidden md:flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                navigate("/collection");
              }}
              placeholder="Search Mercazo Store"
              className="w-[250px] px-4 py-2 border border-gray-300 text-sm rounded-l-md focus:outline-none"
            />
            <button className="px-3 py-2 bg-black text-white rounded-r-md">
              <IoSearchOutline size={18} />
            </button>
          </div>


          <div className="hidden md:flex items-center gap-5 text-sm text-gray-700 relative">
            <div className="relative">
              <FaRegUser
                className="text-lg cursor-pointer"
                onClick={() => setShowProfile((prev) => !prev)}
              />
              {showProfile && (
                <div
                  ref={profileRef}
                  className="absolute right-0 top-10 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50"
                >
                  <ul className="flex flex-col text-sm text-gray-800">
                    {!userData && (
                      <li
                        onClick={() => {
                          navigate("/login");
                          setShowProfile(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
                      >
                        Login
                      </li>
                    )}
                    {userData && (
                      <>
                        <li
                          onClick={() => {
                            handleLogout();
                            setShowProfile(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
                        >
                          Logout
                        </li>
                        <li
                          onClick={() => {
                            navigate("/order");
                            setShowProfile(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
                        >
                          Orders
                        </li>
                      </>
                    )}
                    <li
                      onClick={() => {
                        navigate("/about");
                        setShowProfile(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
                    >
                      About
                    </li>
                  </ul>
                </div>
              )}
            </div>


            <div
              className="relative cursor-pointer text-lg"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingBag />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-3 bg-black text-white text-xs px-[4px] rounded-full">
                  {getCartCount()}
                </span>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">

            <IoSearchOutline
              onClick={() => setShowSearchMobile((prev) => !prev)}
              className="text-xl cursor-pointer"
            />

            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingBag />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-[6px] rounded-full">
                  {getCartCount()}
                </span>
              )}
            </div>
            <button onClick={() => setShowMobileMenu((prev) => !prev)}>
              {showMobileMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>


        {showSearchMobile && (
          <div className="md:hidden px-4 py-2 border-b bg-white shadow-sm">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                navigate("/collection");
              }}
              placeholder="Search Mercazo Store"
              className="w-full px-4 py-2 border border-gray-300 text-sm rounded-md focus:outline-none"
              autoFocus
            />
          </div>
        )}


        <div className="w-full bg-black text-white text-sm px-6 py-2 justify-center gap-4 tracking-wide hidden md:flex">
          <button
            onClick={() => navigate("/")}
            className="hover:underline cursor-pointer"
          >
            HOME
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/collection")}
            className="hover:underline cursor-pointer"
          >
            COLLECTIONS
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/about")}
            className="hover:underline cursor-pointer"
          >
            ABOUT
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/contact")}
            className="hover:underline cursor-pointer"
          >
            CONTACT
          </button>
        </div>


        {showMobileMenu && (
          <div className="md:hidden w-full bg-black text-white text-sm flex flex-col px-6 py-4 gap-3 z-40">
            <button
              onClick={() => {
                navigate("/");
                setShowMobileMenu(false);
              }}
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("/collection");
                setShowMobileMenu(false);
              }}
            >
              Collections
            </button>
            <button
              onClick={() => {
                navigate("/about");
                setShowMobileMenu(false);
              }}
            >
              About
            </button>
            <button
              onClick={() => {
                navigate("/contact");
                setShowMobileMenu(false);
              }}
            >
              Contact
            </button>
            <hr className="border-gray-600" />
            {!userData && (
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMobileMenu(false);
                }}
              >
                Login
              </button>
            )}
            {userData && (
              <button
                onClick={() => {
                  handleLogout();
                  setShowMobileMenu(false);
                }}
              >
                Logout
              </button>
            )}
          </div>
        )}


        <div className="fixed bottom-0 left-0 w-full bg-black text-white flex justify-around items-center py-3 text-xs md:hidden z-40">
          <button onClick={() => navigate("/")}>
            <FaHome size={23} />
          </button>
          <button onClick={() => navigate("/collection")}>
            <FaThList size={20} />
          </button>
          <button onClick={() => navigate("/contact")}>
            <FaPhone size={20} />
          </button>
          <button onClick={() => navigate("/cart")} className="relative">
            <FaShoppingBag size={20} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs px-[6px] rounded-full">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
