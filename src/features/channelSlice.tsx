import { createSlice } from "@reduxjs/toolkit";
import { initialChannelState } from "../Types";


const initialState: initialChannelState ={
    channelId:null,
    channelName:null,
};

export const channelSlice = createSlice({
    name:"channel",
    initialState,
    reducers:{
        setChannelInfo:(state,action) =>{
            state.channelId = action.payload.channelID;
            state.channelName = action.payload.channelName;
        },
    },
});
// console.log(userSlice);

export  const {setChannelInfo} = channelSlice.actions;
export default channelSlice.reducer;