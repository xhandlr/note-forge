import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'boxicons';

import Login from './pages/Login';
import Registration from './pages/Registration';
import CreateExercise from './pages/CreateExercise';
import Dashboard from './pages/Dashboard';
import Categories from './pages/CategoriesPage';
import Exercises from './pages/ExercisesPage';
import Guides from './pages/Guides';
import CreateCategory from './pages/CreateCategory';

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
