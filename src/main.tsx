import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <FavoritesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavoritesProvider>
    </ApolloProvider>
  </StrictMode>,
)
