import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from 'axios'


const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios('/auth/logout')
      logout();
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row  justify-between bg-green-50 space-y-7">
      <div>
        <h1 className="text-center sm:text-left text-4xl font-bold  text-green-500 tracking-wide mt-6">
          <Link to="/">
            Blogs
          </Link>
          <span className="text-green-700">.</span>
        </h1>
      </div>
      <div className="flex gap-3">
        <div className="hidden sm:flex gap-3 semi-bold uppercase items-center">
          <Link to="/?cat=Art">art</Link>
          <Link to="/?cat=Science">science</Link>
          <Link to="/?cat=Technology">technology</Link>
          <Link to="/?cat=Cinema">cinema</Link>
          <Link to="/?cat=Design">design</Link>
          <Link to="/?cat=Food">food</Link>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-green-600 font-bold rounded-md">
            {currentUser && currentUser.username}
          </span>
          {
            currentUser ? (
              <>
                <button onClick={handleLogout} className="bg-green-600 text-white py-2 rounded-md font-semibold w-36 hover:bg-slate-50 hover:text-green-600 transition-colors">
                  Logout
                </button>
                <span className="text-green-600 font-bold cursor-pointer hover:text-white hover:bg-green-600 rounded-md p-2">
                  <Link to="/write">
                    Write
                  </Link>
                </span>
              </>
            ) : (
              <span className="text-green-600 font-bold cursor-pointer hover:text-white hover:bg-green-600 rounded-md p-2">
                <Link to="/login">
                  Login
                </Link>
              </span>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;