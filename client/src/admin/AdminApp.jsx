import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import ProjectsList from './pages/ProjectsList';
import ProjectForm from './pages/ProjectForm';
import ExperienceList from './pages/ExperienceList';
import ExperienceForm from './pages/ExperienceForm';
import Messages from './pages/Messages';

function PrivateRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return admin ? children : <Navigate to="/admin/login" replace />;
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path=""
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/edit/:id" element={<ProjectForm />} />
        <Route path="experience" element={<ExperienceList />} />
        <Route path="experience/new" element={<ExperienceForm />} />
        <Route path="experience/edit/:id" element={<ExperienceForm />} />
        <Route path="messages" element={<Messages />} />
      </Route>
    </Routes>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminRoutes />
    </AuthProvider>
  );
}
