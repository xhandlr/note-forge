import React from 'react';
import './i18n';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'boxicons';

import { NotificationProvider } from './contexts/NotificationContext';
import NotificationContainer from './components/UI/NotificationContainer';
import { DemoProvider } from './contexts/DemoContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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
        <DemoProvider>
            <AuthProvider>
                <NotificationProvider>
                    <Router basename="/note-forge">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Registration />} />

                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
                        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />

                        <Route path="/create-exercise" element={<ProtectedRoute><CreateExercise /></ProtectedRoute>} />
                        <Route path="/edit-exercise/:id" element={<ProtectedRoute><EditExercise /></ProtectedRoute>} />
                        <Route path="/exercise/:id" element={<ProtectedRoute><ExerciseView /></ProtectedRoute>} />
                        <Route path="/exercises" element={<ProtectedRoute><Exercises /></ProtectedRoute>} />

                        <Route path="/create-category" element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
                        <Route path="/edit-category/:id" element={<ProtectedRoute><EditCategory /></ProtectedRoute>} />
                        <Route path="/category/:id" element={<ProtectedRoute><CategoryView /></ProtectedRoute>} />
                        <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />

                        <Route path="/guides" element={<ProtectedRoute><Guides /></ProtectedRoute>} />
                        <Route path="/create-guide" element={<ProtectedRoute><CreateGuide /></ProtectedRoute>} />
                        <Route path="/edit-guide/:id" element={<ProtectedRoute><EditGuide /></ProtectedRoute>} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <NotificationContainer />
                </Router>
            </NotificationProvider>
        </AuthProvider>
    </DemoProvider>
</React.StrictMode>
);