import React from 'react';
import './i18n';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'boxicons';

import { NotificationProvider } from './contexts/NotificationContext';
import NotificationContainer from './components/UI/NotificationContainer';

import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import CreateExercise from './pages/Exercises/CreateExercise';
import Dashboard from './pages/Dashboard/Dashboard';
import Categories from './pages/Categories/CategoriesPage';
import Exercises from './pages/Exercises/ExercisesPage';
import Guides from './pages/Guides/GuidesPage';
import CreateGuide from './pages/Guides/CreateGuide';
import EditGuide from './pages/Guides/EditGuide';
import CreateCategory from './pages/Categories/CreateCategory';
import EditCategory from './pages/Categories/EditCategory';
import CategoryView from './pages/Categories/CategoryView';
import EditExercise from './pages/Exercises/EditExercise';
import ExerciseView from './pages/Exercises/ExerciseView';
import Library from './pages/ResourceLibrary/Library';
import Home from './pages/Auth/Home';
import SearchPage from './pages/Search/SearchPage';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <NotificationProvider>
            <Router basename="/note-forge">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />

                    <Route path="/dashboard" element={<Dashboard /> } />
                    <Route path="/library" element={<Library />} />
                    <Route path="/search" element={<SearchPage />} />

                    <Route path="/create-exercise" element={<CreateExercise />} />
                    <Route path="/edit-exercise/:id" element={<EditExercise />} />
                    <Route path="/exercise/:id" element={<ExerciseView />} />
                    <Route path="/exercises" element={<Exercises />} />

                    <Route path="/create-category" element={<CreateCategory />} />
                    <Route path="/edit-category/:id" element={<EditCategory />} />
                    <Route path="/category/:id" element={<CategoryView />} />
                    <Route path="/categories" element={<Categories />} />

                    <Route path="/guides" element={<Guides />} />
                    <Route path="/create-guide" element={<CreateGuide />} />
                    <Route path="/edit-guide/:id" element={<EditGuide />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <NotificationContainer />
            </Router>
        </NotificationProvider>
    </React.StrictMode>
);