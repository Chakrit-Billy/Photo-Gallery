import Button from "@mui/material/Button";
import { supabase } from "../utils/db.js";

function LogoutButton() {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      window.location.href = "/"; // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button color='inherit' onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
