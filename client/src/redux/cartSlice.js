import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    quantity: 0,
    total: 0,
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addProducts: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity
        }
    }
})

export const { addProducts } = cartSlice.actions
export default cartSlice.reducer