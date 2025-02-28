import React, { useEffect, useState } from "react";
import config from "./config/config";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "./components/Button";
import Home from "./components/pages/Home";
import {
  AuthLayout,
  Login,
  Signup,
  AllPosts,
  AddPost,
  Post,
  EditPost,
} from "./components";
const App = () => {
  const data = useSelector(state => state.authReducer.userData)
  console.log(data)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap justify-between bg-gray-400">
      <div className="w-full ">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <AuthLayout authentication={false}>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout authentication={false}>
                  <Signup />
                </AuthLayout>
              }
            />
            <Route
              path="/all-posts"
              element={
                <AuthLayout authentication>
                  {" "}
                  <AllPosts />
                </AuthLayout>
              }
            />
            <Route
              path="/add-posts"
              element={
                <AuthLayout authentication>
                  {" "}
                  <AddPost />
                </AuthLayout>
              }
            />
            <Route
              path="/edit-post/:slug"
              element={
                <AuthLayout authentication>
                  {" "}
                  <EditPost />
                </AuthLayout>
              }
            />
            <Route
              path="/post/:slug"
              element={
                <AuthLayout authentication>
                  {" "}
                  <Post />
                </AuthLayout>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
};

export default App;
