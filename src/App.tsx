import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import header from "./images/header.png";
import Main from "./pages/Main";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import Apply from "./pages/Apply";
import Notices from "./pages/Notices";
import PublishNotice from "./pages/PublishNotice";
import NoticeDetail from "./pages/NoticeDetail";
import Confirm from "./pages/Confirm";
import CheckProcess from "./pages/CheckProcess";
import ApplierDetail from "./pages/ApplierDetail";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <img src={header} alt="" />
        <Routes>
          <Route index element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/apply" element={<Apply />}></Route>
          <Route path="/confirm" element={<Confirm />}></Route>
          <Route path="/notices" element={<Notices />}></Route>
          <Route path="/notice/:id" element={<NoticeDetail />}></Route>
          <Route path="/publishNotice" element={<PublishNotice />}></Route>
          <Route path="/checkProcess" element={<CheckProcess />}></Route>
          <Route path="/applierDetail/:id" element={<ApplierDetail />}></Route>
        </Routes>
      </BrowserRouter>
      <AppFooter />
    </div>
  );
}

export default App;
