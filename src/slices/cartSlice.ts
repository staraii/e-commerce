import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface CartState {
	items: CartItem[];
}
interface CartItem {
	productName: string;
	productId: ProductId;
	price: number;
	quantity: number;
}
type ProductId = string;

const initialState: CartState = {
	items: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartItem>) => {
			const itemInCart = state.items.find((item) => item.productId === action.payload.productId);
			console.log("itemInCart: " + itemInCart)
			console.log("payload: " + action.payload.quantity)
			if (itemInCart) {
				itemInCart.quantity += action.payload.quantity;
			} else {
				state.items.push(action.payload)
			}
		},
		removeItem: (state, action: PayloadAction<ProductId>) => {
			const itemInCart = state.items.findIndex((item) => item.productId === action.payload)
			if (itemInCart !== -1) {
				state.items.splice(itemInCart, 1);
			}
		},
		incrementItem: (state, action: PayloadAction<ProductId>) => {
			const itemInCart = state.items.find((item) => item.productId === action.payload);
			itemInCart ? itemInCart.quantity += 1 : null;
		},
		decrementItem: (state, action: PayloadAction<ProductId>) => {
			const itemInCart = state.items.findIndex((item) => item.productId === action.payload);
			if (itemInCart !== -1) {
				if (state.items[itemInCart].quantity === 1) {
					state.items.splice(itemInCart, 1);
				} else {
					state.items[itemInCart].quantity -= 1
				}
			}
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, incrementItem, decrementItem, clearCart } = cartSlice.actions;



export default cartSlice.reducer;
