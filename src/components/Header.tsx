
import {AppBar, Box, Button, Toolbar, Typography, useMediaQuery} from "@mui/material";
import { FC } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Divider from '@mui/material/Divider';
import {Logout} from "@mui/icons-material";
import {AuthService} from "../services/auth.service";
import {LOGOUT} from "../actions/types";
import Hamburger from "./Hamburger";

const styles = () => ({
  "button-box": {
    "& > *": {
      marginRight: "10px"
    }
  }
})

const Header: FC<any> = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispath = useDispatch()

  let auth = useSelector((state: any) => state.rootReducer.auth)

  const isMobileMatch = useMediaQuery("(max-width:700px)");

  function logout() {
    AuthService.logout().then(res => {
      console.log(res);
      if (res.data.loggedOut) {
        dispath({
          type: LOGOUT
        });
        navigate('/')
      }
    })
  }

  function desktop () {
    return (
      <>
        <Box className="button-box" sx={{ display: 'flex', '& :not(:last-child)': {
            mx: 1
          },  }}>
            <Button
                variant="contained"
                onClick={() => navigate("/send-report")}
            >
                New Report

            </Button>
            <Button variant="text" onClick={() => navigate("/my-report")}>
                My Reports
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button variant="text" endIcon={<Logout />} onClick={() => logout()}>
                Logout
            </Button>
        </Box>
      </>
    )
  }



  return (
    <>
    <AppBar position="relative" color="transparent" sx={{ borderBottom: 1, borderColor: 'grey.400', mb: 2}} elevation={0}>
      <Toolbar>
        <Typography variant="h6" onClick={() => navigate("/")}>
          Report Reminder
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        {(auth.isLoggedIn && !isMobileMatch) && desktop()}
        {(auth.isLoggedIn && isMobileMatch) && <Hamburger logout={logout} />}

        {!auth.isLoggedIn && <Box>
            <Button
                variant="text"
                onClick={() => navigate("/login")}
            >
                Login
            </Button>
        </Box>}
      </Toolbar>
    </AppBar>
    </>
  );
}

export default withStyles(styles)(Header);