import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ isAuthenticated, component: Component }) => {
    const location = useLocation();
  
    // If user is authenticated, render the component
    // Otherwise, redirect to the login page with the current location as the referrer
    return isAuthenticated ? (
      <Component />
    ) : (
      <Navigate to="/login" state={{ from: location.pathname }} replace />
    );
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  
  export default connect(mapStateToProps)(PrivateRoute);