'use client'

import { reduxStore } from '@/redux/reduxStore';
import { User } from '@/types/types';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import MainAppBar from './MainAppBar';



const userInitials:User = {
    userName: null,
    token: null,
}

export default function Providers(
    {
        children,
        token,
    }:
    Readonly<{
        children: React.ReactNode,
        token: string | null
    }>
){
    userInitials.token = token;
    const queryClient = new QueryClient();
    const store = reduxStore({userInitials});
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <AppRouterCacheProvider>
                    <Toaster />
                    <MainAppBar />
                    {children}
                </AppRouterCacheProvider>
            </Provider>
        </QueryClientProvider>
    );
}