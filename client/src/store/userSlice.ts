import {createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/dataTypes';




export interface UserState {
  user: IUser | null;
  selectedSeat:string | number | null;
  bookedSeat:string | number | null;
}

export const initialState: UserState  = {
  user:null,
  selectedSeat:null,
  bookedSeat:null,
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
    setSelectedSeat:(state,action: PayloadAction<string | number>)=>{
      state.selectedSeat = action.payload;
      state.bookedSeat = null;
    },
    removeSelectedSeat:(state)=>{
      state.selectedSeat = null;
    },
    setBookedSeat:(state,action: PayloadAction<string | number>)=>{
      state.bookedSeat = action.payload;
      state.selectedSeat = null;
    },
    removeBookedSeat:(state)=>{
      state.bookedSeat = null;
    },
    removeBothSeat:(state)=>{
      state.bookedSeat = null;
      state.selectedSeat = null;
    }
  },
})


export const userActions = userSlice.actions

export default userSlice;