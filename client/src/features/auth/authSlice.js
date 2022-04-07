import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const user = localStorage.getItem('user')
// console.log(user);

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        const res = await fetch("/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await res.json();
         console.log(data.token);
        if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(data.token))
             return data;
        } else { return thunkAPI.rejectWithValue(data) }

    } catch (error) {
     //   console.log("error");
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})
export const logout = createAsyncThunk('auth/logout', async () => {
    var raw = "";
    var requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json", },
        body: raw,
        redirect: 'follow'
    };
    fetch("/api/logout", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    await localStorage.clear('user');
})

export const deleteProfileAndUser=createAsyncThunk('auth/delProf',async(thunkAPI)=>{
try {
    const res= await fetch('/api/profile',{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const data=await res.json()
    console.log(data);
    if(res.status===400){return}
    else{ return await data}
} catch (error) {
    const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString();
    return thunkAPI.rejectWithValue(message)
}
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: user ? user : null,
        isError: false,
        isSuccess: false,
        isLoading: false,
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
               // console.log(action.payload);
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload.token
                console.log("ins");
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user = null
                console.log("inbuilder");
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(deleteProfileAndUser.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(deleteProfileAndUser.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.user=null
                console.log("insu");
            })
            .addCase(deleteProfileAndUser.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                console.log("inbuilder");
            })

    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;