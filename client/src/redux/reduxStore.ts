import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/redux/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { User } from '@/types/types';

export const reduxStore = ({userInitials}:{userInitials: User})=>{
    return configureStore({
        reducer: {
            user: userReducer
        },
        preloadedState: {
            user: userInitials
        }
    });
}

export type AppStore = ReturnType<typeof reduxStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()