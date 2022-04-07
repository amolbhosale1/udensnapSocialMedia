import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const myProfile = createAsyncThunk('profile/my', async (thunApi) => {
    try {
        const res = await fetch("/api/profile/myProfile", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await res.json();
        return await data;
    } catch (error) {

        console.log("error");
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()

        return thunApi.rejectWithValue(message)
    }
})

// export const allProfile = createAsyncThunk('profile/all', async ( thunApi) => {
//     try {
//         const res = await fetch("/api/profile/allprofile", {
//             method: "GET",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//           });
//           const data =await res.json();
//           if (res.status === 200) {
//             console.log("server");
//             return await data;
//         }{ return thunApi.rejectWithValue(data) } 
//     } catch (error) {

//         console.log("error");
//         const message =
//             (error.response &&
//                 error.response.data &&
//                 error.response.data.message) ||
//             error.message ||
//             error.toString()

//        return thunApi.rejectWithValue(message)
//     }
// })

export const allProfile = createApi({
    reducerPath: "allProfileApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/profile" }),
    endpoints: (builder) => ({
        allpros: builder.query({
            query: () => '/allprofile'
        })
    })
})

export const getProfilebyId = createAsyncThunk('profile/getbyid', async (profile_ID, thunApi) => {
    try {
        console.log(profile_ID);
        const res = await fetch(`/api/profile/${profile_ID}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await res.json();
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

        return thunApi.rejectWithValue(message)
    }
})

export const createProfile = createAsyncThunk('profile/createPro', async (inpData, thunApi) => {
    try {

        const { website, skills, bio } = inpData;
        // console.log(website, skills, bio);
        const res = await fetch("/api/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                website, skills, bio
            }),
        });

        const data = await res.json();
        return await data;
    } catch (error) {

        console.log("error");
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()

        return thunApi.rejectWithValue(message)
    }
})

export const addEducation = createAsyncThunk('profile/addEdu', async (inpData, thunApi) => {
    try {
        // console.log(inpData);
        const { school, degree, from, to, current, fieldOfStudy } = inpData;
        console.log(to, "server");
        const res = await fetch("/api/profile/education", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                school, degree, from, to, current, fieldOfStudy
            }),
        });

        const data = await res.json();
        console.log(data);
        return await data;
    } catch (error) {

        console.log("error");
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()

        return thunApi.rejectWithValue(message)
    }
})

export const delEducation = createAsyncThunk('profile/delEdu', async (id, thunApi) => {
    try {
        //console.log(id,"server");
        const res = await fetch(`/api/profile/education/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            // body: JSON.stringify({

            // }),
        });
        const data = await res.json();
        //console.log(data);
        if (res.status === 400) {
            return
        } else { return await data; }
    } catch (error) {

        console.log("error");
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()

        return thunApi.rejectWithValue(message)
    }
})

export const addExp = createAsyncThunk('profile/addExp', async (inpData, thunApi) => {
    try {
        //    console.log(inpData);
        const { title, company, location, from, to, current, description } = inpData;
        console.log(title, company, location, from, to, current, description, "server");
        const res = await fetch("/api/profile/experiance", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                title, company, location, from, to, current, description
            }),
        });

        const data = await res.json();
        //console.log(data);
        return await data;
    } catch (error) {

        console.log("error");
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()

        return thunApi.rejectWithValue(message)
    }
})

export const delExp = createAsyncThunk('profile/delExp', async (id, thunApi) => {
    try {

        //   console.log(`/api/profile/experiance/${id}`,"server");
        const token = thunApi.getState().auth.user
        // console.log(token);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", `jwtoken=${token}`);

        var raw = "";

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const res = await fetch(`/api/profile/experiance/${id}`, requestOptions)
        const data = await res.json();
        //console.log(data)
        if (res.status === 400) {
            return
        } else {
            return await data;
        }
    } catch (error) {
        console.log("error");
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()

        return thunApi.rejectWithValue(message)
    }
})

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: [],
        isloading: false,
        isSuccess: false,
        isError: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {

        builder
            .addCase(myProfile.pending, (state) => {
                state.isloading = true
            })
            .addCase(myProfile.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.isloading = false
                state.isSuccess = true
                state.profile = action.payload;

                // state.isError=false;
            })
            .addCase(myProfile.rejected, (state, action) => {
                state.isloading = false
                // state.isSuccess = false
                state.profile = null
                console.log("inbuilder");
                state.isError = true
            })
            // .addCase(allProfile.pending, (state) => {
            //     state.isloading = true

            // })
            // .addCase(allProfile.fulfilled, (state, action) => {
            //    // console.log(action.payload);
            //     state.isloading = false
            //     state.isSuccess = true
            //     state.profile = action.payload
            // })
            // .addCase(allProfile.rejected, (state, action) => {
            //     state.isloading = false
            //     state.isSuccess = false
            //     state.profile = null
            //     console.log("inbuilder");
            // })
            .addCase(getProfilebyId.pending, (state) => {
                state.isloading = true

            })
            .addCase(getProfilebyId.fulfilled, (state, action) => {
                //  console.log(action.payload);
                state.isloading = false
                state.isSuccess = true
                state.profile = action.payload
            })
            .addCase(getProfilebyId.rejected, (state, action) => {
                state.isloading = false
                state.isSuccess = false
                state.profile = null
                console.log("inbuilder");
            })
            .addCase(createProfile.pending, (state) => {
                state.isloading = true
            })
            .addCase(createProfile.fulfilled, (state, action) => {
                //console.log(action.payload);
                state.isloading = false
                state.isSuccess = true
                state.profile = action.payload
            })
            .addCase(createProfile.rejected, (state, action) => {
                state.isloading = false
                state.isError = true
                state.profile = null
                console.log("inbuilder");
            })
            .addCase(addEducation.pending, (state) => {
                state.isloading = true

            })
            .addCase(addEducation.fulfilled, (state, action) => {
                //  console.log(action.payload);
                state.isloading = false
                state.isSuccess = true
                state.profile = action.payload
            })
            .addCase(addEducation.rejected, (state, action) => {
                state.isloading = false
                state.isSuccess = false
                state.profile = null
                console.log("inbuilder");
            })
            .addCase(delEducation.pending, (state) => {
                state.isloading = true
            })
            .addCase(delEducation.fulfilled, (state, action) => {
                // console.log(action.payload.profile);
                state.isloading = false
                state.isSuccess = true
                state.profile = action.payload.profile

            })
            .addCase(delEducation.rejected, (state, action) => {
                state.isloading = false
                state.isError = true
                state.profile = null
                console.log("inbuilder");
            })
            .addCase(addExp.pending, (state) => {
                state.isloading = true
            })
            .addCase(addExp.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.isloading = false
                state.isSuccess = true
                state.profile = action.payload
            })
            .addCase(addExp.rejected, (state, action) => {
                state.isloading = false
                //     state.isSuccess = false
                state.profile = null
                console.log("inbuilder");
            })
            .addCase(delExp.pending, (state) => {
                state.isloading = true
            })
            .addCase(delExp.fulfilled, (state, action) => {
                // console.log(action.payload.profile);
                state.isloading = false
                state.isSuccess = true
                state.profile = action.payload.profile

            })
            .addCase(delExp.rejected, (state, action) => {
                state.isloading = false
                state.isError = true
                state.profile = null
                console.log("inbuilder");
            })

    }
})

export const { getme } = profileSlice.actions;
export const { useAllprosQuery } = allProfile;
export default profileSlice.reducer;


