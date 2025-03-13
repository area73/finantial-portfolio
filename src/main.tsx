import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { worker } from './mocks/browser';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

async function startApp() {
  if (process.env.NODE_ENV === 'development') {
    try {
      // Disable MSW's console logging
      const { worker: mockWorker } = await import('./mocks/browser');
      await mockWorker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      });
      console.log('MSW Worker started');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
}

startApp();