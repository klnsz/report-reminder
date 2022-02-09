
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Header: FC<any> = () => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <AppBar position="relative" color="transparent" sx={{ borderBottom: 1, borderColor: 'grey.400', mb: 2}} elevation={0}>
      <Toolbar>
        <Typography variant="h6" onClick={() => navigate("/")}>
          Report Reminder
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button
            variant="text"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;