import { Route, Router, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/authentication/login';
import SignUp from './pages/authentication/signup';
import Posts from './pages/posts/posts';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePost from './pages/createpost/CreatePost';
import Profile from './pages/profile/Profile';

export default function App() {
  return (
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
    </Routes>
  );
}