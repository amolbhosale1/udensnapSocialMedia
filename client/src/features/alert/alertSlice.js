import { createSlice } from "@reduxjs/toolkit";
let index = 0;
export const Alertslice = createSlice({
    name: "alert",
    initialState: {
        alerts: []
    },
    reducers: {
        CreateAlert: (state, action) => {
            state.alerts.push({
                id: ++index,
                message: action.payload.message,
                type: action.payload.type
            });
        }
    }
})

export const alertActions = Alertslice.actions;

export default Alertslice;