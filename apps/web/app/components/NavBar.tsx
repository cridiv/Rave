import React from "react";

const NavBar = () => {
  return (
    <div
      className="
  navbar 
  bg-gradient-to-r 
  from-white/10 
  via-white/15 
  to-white/10 
  backdrop-blur-xl 
  shadow-2xl 
  shadow-black/10
  rounded-full
  border 
  border-white/20 
  fixed
  top-0
  left-0
  right-20
  z-50
  mx-4
  mr-20
  mt-4
  hover:bg-gradient-to-r
  hover:from-white/15
  hover:via-white/20
  hover:to-white/15
  transition-all
  duration-500
"
    >
      {/* Glass shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl opacity-30 pointer-events-none"></div>

      <div className="navbar-start relative z-10">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="
          menu 
          menu-sm 
          dropdown-content 
          bg-white/10 
          backdrop-blur-xl 
          border 
          border-white/20 
          rounded-box 
          z-1 
          mt-3 
          w-52 
          p-2 
          shadow-xl
          shadow-black/20
        "
          >
            <li>
              <a className="text-white hover:bg-white/20">Features</a>
            </li>
            <li>
              <a className="text-white hover:bg-white/20">How It Works</a>
            </li>
            <li>
              <a className="text-white hover:bg-white/20">Pricing</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold border-none bg-gradient-to-r from-sky-500 to-sky-100 text-transparent bg-clip-text hover:from-sky-400 hover:to-sky-200 transition-all duration-300">
          Rave
        </a>
      </div>

      <div className="navbar-center hidden lg:flex relative z-10">
        <ul className="menu menu-horizontal px-1">
          <li className="">
            <a className=" relative text-white hover: transition-all duration-300 px-3 py-2 pr-6 overflow-hidden group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 shadow-[0_0_10px_#0ea5e9] group-hover:w-full group-hover:shadow-[0_0_20px_#0ea5e9] transition-all duration-500 ease-out"></span>
            </a>
          </li>
          <li>
            <a className="relative text-white hover: transition-all  duration-300 px-3 py-2 pr-6 overflow-hidden group">
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 shadow-[0_0_10px_#0ea5e9] group-hover:w-full group-hover:shadow-[0_0_20px_#0ea5e9] transition-all duration-500 ease-out"></span>
            </a>
          </li>
          <li>
            <a className="relative text-white hover: transition-all duration-300 px-3 py-2 overflow-hidden group">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 shadow-[0_0_10px_#0ea5e9] group-hover:w-full group-hover:shadow-[0_0_20px_#0ea5e9] transition-all duration-500 ease-out"></span>
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar-end relative z-10">
        <button className="btn bg-sky-500 text-white px-6 py-3 rounded-full shadow-lg shadow-sky-500/50 border-none hover:shadow-pink-sky/75">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default NavBar;
