import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode'

export default function LoginPage({ url, socket }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/login`, {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("fullName", data.fullName);
      localStorage.setItem("email", data.email);
      localStorage.setItem("profilePict", data.profilePict);
      localStorage.setItem("phoneNumber", data.phoneNumber);

      socket.auth = {
        fullName: localStorage.fullName,
      };

      navigate("/home");

      Toastify({
        text: "success login",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }


  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center bg-gray-100">
        <div className="p-8 flex bg-white rounded-3xl">
          <div className="w-96">
            <img
              className="w-16 mb-5"
              src="https://pbs.twimg.com/profile_images/1440775265928417284/ywTBFW6L_400x400.png"
              alt=""
            />
            <h1 className="text-4xl m-0 font-normal">Sign in</h1>
            <p className="mt-5">Use Your Account</p>
          </div>
          <form onSubmit={handleSubmit} method="post">
            <div className="block w-96 mt-24">
              <label htmlFor="email"></label>
              <input
                className="mb-5 py-2 px-4 w-full border-2 rounded-lg"
                type="email"
                name=""
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password"></label>
              <input
                className="mb-5 py-2 px-4 w-full border-2 rounded-lg"
                type="password"
                name=""
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <p className="text-sm">
                Not your computer? Use Guest mode to sign in privately.
              </p>
              <button className="text-sm text-blue-600 hover:bg-blue-100">
                Learn more about using Guest mode
              </button>

              <div className="flex justify-end mt-5">
                <Link to="/register">
                  <button className="hover:bg-blue-100 mr-5 hover:rounded-3xl px-6 py-2">
                    Create Account
                  </button>
                </Link>
                <button className="text-white px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700">
                  Next
                </button>
                {/* <div id="buttonDiv" type="button">
                    onSuccess={credentialResponse => {
                      const credentialResponseDecoded = jwtDecode(
                        credentialResponse.credential
                      )
                      // console.log(credentialResponse.credential);
                      // console.log(credentialResponseDecoded);
                      localStorage.setItem("token", credentialResponse.credential);
                      localStorage.setItem("fullName", credentialResponseDecoded.name);
                      localStorage.setItem("email", credentialResponseDecoded.email);
                      localStorage.setItem("profilePict", credentialResponseDecoded.picture);
                      // localStorage.setItem("phoneNumber", data.phoneNumber);

                      navigate('/home')
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
