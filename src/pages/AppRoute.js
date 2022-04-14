import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { HomeLayout } from "../layout/HomeLayout";
import { Home } from "./Home";
import { Login } from "./Login";
import { UserDetails } from "./UserDetails";
import { UserList } from "./UserList";

export const AppRoute = () => {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<UserList />} />
          <Route path="/details" element={<UserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
