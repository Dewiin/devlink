import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.tsx'

// components
import { Toaster } from 'sonner';

// contexts
import { UIProvider } from '@/components/contexts/UIContext.tsx';
import { AuthProvider } from '@/components/contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UIProvider>
        <Toaster />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UIProvider>
    </AuthProvider>
  </StrictMode>,
)
