
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Divider from '@mui/material/Divider';
import {Logout} from "@mui/icons-material";

const styles = () => ({
  "button-box": {
    "& > *": {
      marginRight: "10px"
    }
  }
})

const Header: FC<any> = () => {
  const navigate: NavigateFunction = useNavigate();

  let auth = useSelector((state: any) => state.rootReducer.auth)



  return (
    <AppBar position="relative" color="transparent" sx={{ borderBottom: 1, borderColor: 'grey.400', mb: 2}} elevation={0}>
      <Toolbar>
        <Typography variant="h6" onClick={() => navigate("/")}>
          Report Reminder
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {auth.isLoggedIn && <Box className="button-box" sx={{ display: 'flex', '& :not(:last-child)': {
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
            <Button variant="text" endIcon={<Logout />}>
                Logout
            </Button>
        </Box>}
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
  );
}

export default withStyles(styles)(Header);