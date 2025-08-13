import { configureStore } from '@reduxjs/toolkit'
import {useDispatch, useSelector} from "react-redux";
import {travelApi} from "./api";
import search from './search-slice';


export const store = configureStore({
  reducer: {
    search,
    [travelApi.reducerPath]: travelApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(travelApi.middleware),
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()