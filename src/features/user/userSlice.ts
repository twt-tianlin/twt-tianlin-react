import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { login } from "../../api/user";
import { RootState } from "../../app/store";

export interface UserState {
  uid: number;
  name: string;
  role: string;
  email: string;
}

const initialState: UserState = {
  uid: 0,
  name: "",
  role: "",
  email: "",
};

export const changeUserInfo = createAsyncThunk(
  "user/login",
  async (data: any) => {
    const res = await login(data);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeUserInfo.fulfilled, (state, action) => {
      const data = action.payload;
      if (data.state === 200) {
        state.uid = data.data.id;
        state.name = data.data.name;
        state.email=data.data.email;
        state.role=data.data.role
        localStorage.setItem("token", data.data.token);
        message.success("登录成功")
      } else {
        message.error(data.msg);
      }
    });
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
