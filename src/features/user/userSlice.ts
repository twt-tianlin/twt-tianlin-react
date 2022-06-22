import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../../api/user";
import { message } from "antd";

const initialState: UserState = {
  value: 0,
  status: "idle",
};

export const changeUserInfo = createAsyncThunk(
  "user/login",
  async (data: any) => {
    login(data)
      .then((res) => {
        let data = res.data;
        if (data.state === 200) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("name", data.data.name);
          localStorage.setItem("uid", data.data.id);
          message.success("登录成功");
        } else {
          message.error(data.msg);
        }
      })
      .catch(() => {
        message.error("系统异常 请联系管理员");
      });
  }
);

export const userSlice = createSlice({
    
})
