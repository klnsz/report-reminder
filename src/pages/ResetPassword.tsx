import React, {ChangeEvent, FC, useState} from "react";
import {Alert, Avatar, Grid, IconButton, InputAdornment, Link, TextField, Typography} from "@mui/material";
import {EmailOutlined, KeyboardArrowRight, LockOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {columns} from "./Login";
import ApiService from "../services/api.service";
import Swal, {SweetAlertOptions} from "sweetalert2";
import {AuthService} from "../services/auth.service";
import {LOGOUT} from "../actions/types";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const ResetPassword: FC<any> = () => {

  const [state, setState] = useState({
    newPassFirst: '',
    newPassSecond: '',
    showFirstPassword: false,
    showSecondPassword: false,
    loading: false,
    error: false,
    errorMsg: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const passChange = (field: string = 'first', val: string) => {
    if (field === 'first') {
      setState(prevState => ({
        ...prevState,
        newPassFirst: val,
        error: !val,
      }))
    } else if (field === 'second') {
      setState(prevState => ({
        ...prevState,
        newPassSecond: val,
        error: !val
      }))
    }

  };

  function handleSubmit () {
    if (state.newPassFirst !== state.newPassSecond) {
      setState(prevState => ({
        ...prevState,
        error: true,
        errorMsg: 'Passwords have to be same.'
      }))
      return
    }
    setState(prevState => ({
      ...prevState,
      loading: true
    }))
    ApiService.post('users/reset-password', {
      firstPass: state.newPassFirst,
      secondPass: state.newPassSecond
    }).then(res => {
      console.log(res);
      let fire: SweetAlertOptions = {
        title: 'Success',
        text: '',
        icon: 'success'
      }
      if (res.data.error) {
        fire.title = "Ops"
        fire.text = res.data.message
        fire.icon = 'error'
      } else {
        fire.text = 'Your password has been changed successfully. You need to login again.'
      }
      AuthService.logout().then(res => {
        console.log(res);
        if (res.data.loggedOut) {
          dispatch({
            type: LOGOUT
          });
          navigate('/')
        }
      })
      Swal.fire(fire)
    }).finally(() => {
      setState(prevState => ({
        ...prevState,
        loading: false
      }))
    })
  }

  function changePassState (field: string) {
    if (field === 'first') {
      setState(prevState => ({
        ...prevState,
        showFirstPassword: !state.showFirstPassword
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        showSecondPassword: !state.showSecondPassword
      }))
    }
  }

  return (
    <Grid
      container
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
            Reset Password
          </Typography>
        </Grid>

        {(state.error && state.errorMsg) &&
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{state.errorMsg}</Alert>
        }

        <TextField
  sx={{mt: 2}}
  error={state.error}
  label="New Password"
  type={state.showFirstPassword ? "text" : "password"}
  onChange={evt => passChange('first', evt.target.value)}
  fullWidth
  value={state.newPassFirst}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => changePassState('first')}
        >
          {state.showFirstPassword ? <VisibilityOff/> : <Visibility/>}
        </IconButton>
      </InputAdornment>
    ),
  }}
  />
        <TextField
  sx={{mt: 2}}
  error={state.error}
  label="Retype New Password"
  type={state.showSecondPassword ? "text" : "password"}
  onChange={evt => passChange('second', evt.target.value)}
  fullWidth
  value={state.newPassSecond}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => changePassState('second')}
        >
          {state.showSecondPassword ? <VisibilityOff/> : <Visibility/>}
        </IconButton>
      </InputAdornment>
    ),
  }}
  />
        <LoadingButton
          loading={state.loading}
          onClick={handleSubmit}
          endIcon={<KeyboardArrowRight />}
          disabled={state.error}
          color="primary"
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          size="large"
        >
          Reset Password
        </LoadingButton>
      </Grid>
    </Grid>
  )
}

export default ResetPassword