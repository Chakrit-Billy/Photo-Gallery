import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { supabase } from "../utils/db.js";
import { Link as RouterLink, useNavigate } from "react-router-dom";

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
  const [newPassword, setNewPassword] = useState("");
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

  const handleSendResetEmail = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/forgot-password",
      });

      if (error) {
        setMessage("Password reset email could not be sent.");
      } else {
        setMessage("Password reset email sent successfully. Check your inbox.");
        setResetMode(true); // Enable the password reset mode
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while processing your request.");
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const { error } = await supabase.auth.api.updateUser({
        password: newPassword,
      });

      if (error) {
        setMessage("Password reset failed. Please try again.");
      } else {
        setMessage(
          "Password reset successful. You can now sign in with your new password."
        );
        navigate("/"); // Redirect the user to the login page or any other appropriate page
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
        <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
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
          {resetMode ? (
            <>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='newPassword'
                label='New Password'
                type='password'
                id='newPassword'
                autoComplete='new-password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
          ) : null}
          {resetMode ? (
            <Button
              type='button'
              fullWidth
              variant='contained'
              color='primary'
              style={submitStyle}
              onClick={handlePasswordReset}>
              Reset Password
            </Button>
          ) : (
            <Button
              type='button'
              fullWidth
              variant='contained'
              color='primary'
              style={submitStyle}
              onClick={handleSendResetEmail}>
              Send Reset Email
            </Button>
          )}
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
