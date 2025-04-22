import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.tsx';
import { Providers } from './components/Providers.tsx';
import {MemeProvider} from "./store/MemeContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Providers>
            <MemeProvider>
                <RouterProvider
                    future={{ v7_startTransition: true }}
                    router={router}
                />
            </MemeProvider>
        </Providers>
    </StrictMode>
);