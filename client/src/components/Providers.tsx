'use client'

import { reduxStore } from '@/redux/reduxStore';
import { User } from '@/types/types';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';



const userInitials:User = {
    userName: null,
    token: null,
}

export default function Providers(
    {
        children
    }:
    Readonly<{
        children: React.ReactNode
    }>
){
    const queryClient = new QueryClient();
    const store = reduxStore({userInitials});
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Toaster />
                {children}
            </Provider>
        </QueryClientProvider>
    );
}