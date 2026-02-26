import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home/Home';
import DynamicPage from './pages/Dynamic/DynamicPage';
import Yonalishlar from './pages/Dynamic/Yonalishlar';
import Faxrlar from './pages/Dynamic/Faxrlar';
import Rahbariyat from './pages/Dynamic/Rahbariyat';
import Oqituvchilar from './pages/Dynamic/Oqituvchilar';
import NewsDetail from './pages/Dynamic/NewsDetail';
import Login from './pages/Admin/Login';
import DashboardLayout from './pages/Admin/DashboardLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TeachersManager from './pages/Admin/TeachersManager';
import AdminManager from './pages/Admin/AdminManager';
import NewsManager from './pages/Admin/NewsManager';
import AchieversManager from './pages/Admin/AchieversManager';
import DirectionsManager from './pages/Admin/DirectionsManager';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="page/faoliyat/yonalishlar" element={<Yonalishlar />} />
          <Route path="page/faoliyat/faxrlar" element={<Faxrlar />} />
          <Route path="page/maktab/rahbariyat" element={<Rahbariyat />} />
          <Route path="page/maktab/oqituvchilar" element={<Oqituvchilar />} />
          <Route path="page/:category/:slug" element={<DynamicPage />} />
          <Route path="news/:id" element={<NewsDetail />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="teachers" element={<TeachersManager />} />
          <Route path="administration" element={<AdminManager />} />
          <Route path="news" element={<NewsManager />} />
          <Route path="achievers" element={<AchieversManager />} />
          <Route path="directions" element={<DirectionsManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
