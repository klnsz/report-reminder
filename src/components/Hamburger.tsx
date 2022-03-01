import {FC, useState} from "react";
import {
  Box,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {Add, Article, Close, Logout, Menu} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import {useNavigate} from "react-router-dom";

const Hamburger: FC<any> = (props) => {
  const [open, setState] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    setState(open);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton aria-label="open drawer" onClick={() => toggleDrawer(true)} >
        <Menu />
      </IconButton>

      {/* The outside of the drawer */}
      <Drawer

        anchor="right" //from which side the drawer slides in

        variant="temporary" //if and how easily the drawer can be closed

        open={open} //if open is true, drawer is shown

        onClose={() => toggleDrawer(false)} //function that is called when the drawer should close
      >

        <Box>
          {/* The inside of the drawer */}
          <IconButton sx={{mb: 2}} onClick={() => toggleDrawer(false)}>
            <Close />
          </IconButton>
          <Divider sx={{mb: 2}} />
          <Box sx={{mb: 2}}>

              <ListItemButton onClick={() => navigate('/send-report')}>
                  <ListItemIcon>
                      <Add />
                  </ListItemIcon>
                  <ListItemText primary="New Report" />
              </ListItemButton>

              <ListItemButton onClick={() => navigate('/my-report')}>
                  <ListItemIcon>
                      <Article />
                  </ListItemIcon>
                  <ListItemText primary="List Reports" />
              </ListItemButton>

              <Divider sx={{mb: 2}} />

              <ListItemButton onClick={() => props.logout()}>
                  <ListItemIcon>
                      <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
              </ListItemButton>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
export default Hamburger