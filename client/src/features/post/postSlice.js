import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPost=createAsyncThunk('post/get',async(err)=>{
    try {
        const res = await fetch("/api/post", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const data =await res.json();
        //   console.log(data,"server");
          return await data;
    } catch (error) {
        
        console.log("error");
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()

       return err.rejectWithValue(message)
    }
})

const postSlice=createSlice({
    name:"post",
    initialState:{
        post:null,
        isloading:true,
        isSuccesss:false,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getPost.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getPost.fulfilled, (state, action) => {
           // console.log(action.payload);
            state.isLoading = false
            state.isSuccess = true
            state.post = action.payload
        })
        .addCase(getPost.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.post = null
            console.log("inbuilder");
        })
    }
})

export const{get}=postSlice.actions;
export default postSlice.reducer;