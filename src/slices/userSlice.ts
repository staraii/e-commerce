import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface UserState {
	isAdmin: boolean;
	email: string;
}

const initialState: UserState = {
	isAdmin: false,
	email: ""
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAdmin: (state, action: PayloadAction<boolean>) => {
			state.isAdmin = action.payload;
		},
		signOut: (state) => {
			state.isAdmin = false;
		},
	},
});

export const { setAdmin, signOut } =
	userSlice.actions;


export default userSlice.reducer;
