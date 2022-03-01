
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {Route, BrowserRouter, Routes, useLocation, Navigate} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SendMessage from "./pages/SendMessage";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AuthService} from "./services/auth.service";
import {LOGIN_FAIL, LOGIN_SUCCESS} from "./actions/types";
import MyReports from "./pages/MyReports";
import ResetPassword from "./pages/ResetPassword";
function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  let auth = useSelector((state: any) => state.rootReducer.auth)

  useEffect(() => {
    try {
      AuthService.isLoggedIn().then((res) => {
        console.log(res);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.user
        })
      }).catch(err => {
        console.log(err);
        dispatch({
          type: LOGIN_FAIL
        })
      }).finally(() => setLoading(false))
    } catch (e) {
      console.log(e);
    }
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', position: 'absolute', width: '100%', height: '100&', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <BrowserRouter>
      <Header/>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="send-report" element={
            <RequireAuth auth={auth}>
              <SendMessage />
            </RequireAuth>
          } />
          <Route path="my-report" element={
            <RequireAuth auth={auth}>
              <MyReports />
            </RequireAuth>
          } />
        </Routes>
      </Container>

    </BrowserRouter>
  );
}
function RequireAuth({ children, auth }: { children: JSX.Element, auth: any }) {
  let location = useLocation();
  if (auth.user && auth.user.passwordReset) {
    return <Navigate to="/reset-password" state={{ from: location }} replace />;
  }
  if (!auth.isLoggedIn) {
    console.log('Pushed to login');
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
