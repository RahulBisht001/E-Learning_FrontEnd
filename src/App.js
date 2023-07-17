import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';

import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';

import Courses from './components/Courses/Courses';
import CoursePage from './components/CoursePage/CoursePage';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';

import Subscribe from './components/Payments/Subscribe';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';

import NotFound from './components/Layout/NotFound/NotFound';

import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import ChangePassword from './components/Profile/ChangePassword';

import Dashboard from './components/Admin/Dashboard/Dashboard';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import Users from './components/Admin/Users/Users';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';

import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { getMyProfile } from './redux/actions/user';

import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layout/Loader/Loader';

function App() {
  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getMyProfile())
  }, [dispatch]);

  return (
    <>
      <Router>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header isAuthenticated={isAuthenticated} user={user} />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/request" element={<Request />} />
                <Route path="/about" element={<About />} />

                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CoursePage user={user} />
                  </ProtectedRoute>}
                />

                {/* //? User Profile Routes */}
                {/* //*________________________________________________________________ */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      redirect="/login"
                    >
                      <Profile user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/update-profile"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      redirect="/login"
                    >
                      <UpdateProfile user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      redirect="/login"
                    >
                      <ChangePassword />
                    </ProtectedRoute>
                  }
                />
                {/* //*________________________________________________________________ */}

                {/* //? Authentication Routes */}
                {/* //!________________________________________________________________ */}
                <Route
                  path="/login"
                  element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated}
                      redirect="/profile"
                    >
                      <Login />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated}
                      redirect="/profile"
                    >
                      <Register />
                    </ProtectedRoute>
                  }
                />
                <Route path="/forgot-password" element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
                    <ForgotPassword />
                  </ProtectedRoute>}
                />
                <Route
                  path="/reset-password/:token"
                  element={
                    <ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
                      <ResetPassword />
                    </ProtectedRoute>
                  }
                />
                {/* //!________________________________________________________________ */}

                {/* //? Payment Gateway pages */}
                {/* //* ______________________________________________________________ */}
                <Route
                  path="/subscribe"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Subscribe user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-fail" element={<PaymentFail />} />
                {/* //* ______________________________________________________________ */}

                {/* //? Admin Routes */}
                {/* //^________________________________________________________________ */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      adminRoute={true}
                      isAdmin={user && user.role === 'admin'}
                    >
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/create-course"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      adminRoute={true}
                      isAdmin={user && user.role === 'admin'}
                    >
                      <CreateCourse />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      adminRoute={true}
                      isAdmin={user && user.role === 'admin'}
                    >
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/courses"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      adminRoute={true}
                      isAdmin={user && user.role === 'admin'}
                    >
                      <AdminCourses />
                    </ProtectedRoute>
                  }
                />
                {/* //^________________________________________________________________ */}


                {/* //? 404 Page Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>

              <Footer />

            <Toaster />
          </>
        )}
      </Router>
    </>
  );
}

export default App;
