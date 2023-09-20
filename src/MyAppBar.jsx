import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import LogoutButton from "./LogoutButton.jsx";
import { Link } from "react-router-dom"; // Import Link

function MyAppBar() {
  return (
    <AppBar position='relative'>
      <Toolbar>
        <PhotoCamera className='mr-[20px]' />

        <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant='h6' gutterBottom>
            Photo Album
          </Typography>
        </Link>
        <div style={{ flexGrow: 1 }}></div>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
