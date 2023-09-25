import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { supabase } from "../utils/db.js";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Function to generate a random temporary password
function generateTemporaryPassword() {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let temporaryPassword = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    temporaryPassword += charset.charAt(randomIndex);
  }

  return temporaryPassword;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetMode, setResetMode] = useState(false);

  const containerStyle = {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const formStyle = {
    width: "100%",
    marginTop: "1rem",
  };

  const submitStyle = {
    margin: "1rem 0 2rem",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (resetMode) {
        // Update the user's password in the database
        const { error } = await supabase.auth.update({
          email: email,
          password: password,
        });
        console.log(error);
        if (error) {
          setMessage("Password reset failed. Please try again.");
        } else {
          setMessage(
            "Password reset successful. You can now sign in with your new password."
          );
          navigate("/");
        }
      } else {
        const { data, error } = await supabase
          .from("user")
          .select()
          .eq("email", email);

        if (data.length === 0) {
          setMessage("User with this email does not exist.");
        } else {
          // Generate a temporary password
          const temporaryPassword = generateTemporaryPassword();

          // Create a session for the user with the temporary password
          const { session, error: sessionError } = await supabase.auth.signIn({
            email: email,
            password: temporaryPassword,
          });

          if (sessionError) {
            setMessage(
              "Unable to create a session. Temporary password is incorrect."
            );
          } else {
            setMessage("Session created. You can now reset your password.");
            setResetMode(true);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while processing your request.");
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div style={containerStyle}>
        <LockOutlinedIcon fontSize='large' />
        <Typography component='h1' variant='h5'>
          {resetMode ? "Reset Password" : "Forgot Password"}
        </Typography>
        <form style={formStyle} onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {resetMode && (
            <>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='New Password'
                type='password'
                id='password'
                autoComplete='new-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm New Password'
                type='password'
                id='confirmPassword'
                autoComplete='new-password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            style={submitStyle}>
            {resetMode ? "Reset Password" : "Send Reset Email"}
          </Button>
        </form>
        {message && (
          <Typography variant='body2' color='textSecondary' align='center'>
            {message}
          </Typography>
        )}
        <RouterLink to='/' style={{ textDecoration: "none" }}>
          <Typography variant='body2' color='primary' align='center'>
            Back to Sign In
          </Typography>
        </RouterLink>
      </div>
    </Container>
  );
}
