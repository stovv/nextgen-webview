import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.';

// Define a type for the slice state
interface SearchState {
  from: string;
  to: string;
}

// Define the initial state using that type
const initialState: SearchState = {
  from: '',
  to: '',
}

export const searchSlice = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFrom: (state, action: PayloadAction<string>) => {
      state.from = action.payload;
    },
    setTo: (state, action: PayloadAction<string>) => {
      state.to = action.payload;
    }
  },
})

export const { setFrom, setTo } = searchSlice.actions

export const selectDirection = (state: RootState) => ({
  from: state.search.from,
  to: state.search.to
})

export default searchSlice.reducer