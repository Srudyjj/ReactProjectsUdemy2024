import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import App from './App';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import './index.css'
import RecipePage from './pages/RecipePage';
import ErrorPage from './pages/ErrorPage';
import Ingredients from './components/Ingredients';
import Instructions from './components/Instructions';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorPage />}>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/recipe/:id' element={<RecipePage />} >
        <Route path="/recipe/:id/ingredients" element={<Ingredients />} />
        <Route path="/recipe/:id/instructions" element={<Instructions />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
