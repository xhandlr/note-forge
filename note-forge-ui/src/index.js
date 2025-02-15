import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'boxicons';

import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import CreateExercise from './pages/Exercises/CreateExercise';
import Dashboard from './pages/Dashboard/Dashboard';
import Categories from './pages/Categories/CategoriesPage';
import Exercises from './pages/Exercises/ExercisesPage';
import Guides from './pages/Guides/Guides';
import CreateCategory from './pages/Categories/CreateCategory';
import EditCategory from './pages/Categories/EditCategory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-exercise" element={<CreateExercise />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} /> 
        <Route path="/categories" element={<Categories />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/guides" element={<Guides />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
