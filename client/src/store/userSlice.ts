import {createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/dataTypes';




export interface UserState {
  user: IUser | null;
}

export const initialState: UserState  = {
  user:null
}



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action: PayloadAction<IUser | null>) => {
      
      state.user = action.payload;
    },
    removeState: (state) => {
      state.user = null;
    },
  },
})


export const userActions = userSlice.actions

export default userSlice;