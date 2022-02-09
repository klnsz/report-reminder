import {
  Button,
  Grid,
  InputAdornment,
  IconButton,
  TextField,
  Box,
  Link,
  Avatar,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { ChangeEvent, FC, useState } from "react";
import {
  EmailOutlined,
  KeyboardArrowRight,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const Login: FC<any> = () => {
  const [state, setState] = useState<{
    email: string;
    password: string;
    emailError: boolean;
    passError: boolean;
    showPassword: boolean;
    loading?: boolean;
  }>({
    email: "",
    password: "",
    emailError: false,
    passError: false,
    showPassword: false,
  });

  const [windowHeight, setWindowHeight] = useState(window.innerHeight / 2);

  const columns = {
    xs: 12,
    md: 4,
    xl: 3,
  };

  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
    setState((prevState) => ({
      ...prevState,
      email: evt.target.value,
      emailError: !re.test(evt.target.value),
    }));
  };

  const passChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const pass = evt.target.value;
    setState((prevState) => ({
      ...prevState,
      password: pass,
      passError: !pass,
    }));
  };

  const handleClickShowPassword = () => {
    setState((prev) => ({
      ...prev,
      showPassword: !state.showPassword,
    }));
  };

  const login = () => {
    setState((prev) => ({ ...prev, loading: true }));
    if (!re.test(state.email) || !state.password) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }
  };

  return (
    <Grid
      container
      sx={{ height: windowHeight }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        justifyContent="center"
        container
        item
        xs={columns.xs}
        md={columns.md}
        xl={columns.xl}
      >
        <Grid item container justifyContent="center">
          <Avatar>
            <LockOutlined />
          </Avatar>
        </Grid>
        <Grid item container justifyContent="center" sx={{ mb: 5, mt: 1 }}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Grid>

        <TextField
          error={state.emailError}
          label="Email"
          onChange={emailChange}
          fullWidth
          value={state.email}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailOutlined
                  sx={{ ml: 1, mr: 1 }}
                  color={state.emailError ? "error" : "inherit"}
                />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          sx={{ mt: 2 }}
          error={state.passError}
          label="Password"
          type={state.showPassword ? "text" : "password"}
          onChange={passChange}
          fullWidth
          value={state.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <LoadingButton
          loading={state.loading}
          onClick={login}
          endIcon={<KeyboardArrowRight />}
          disabled={state.emailError || state.passError}
          color="primary"
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          size="large"
        >
          Sign In
        </LoadingButton>
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs>
            <Link href="#" underline="hover">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
