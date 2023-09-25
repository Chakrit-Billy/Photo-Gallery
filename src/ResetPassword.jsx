import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/db.js";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setMessage("Password reset failed. Please try again.");
      } else {
        setMessage(
          "Password reset successful. You can now sign in with your new password."
        );
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while processing your request.");
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <LockOutlinedIcon fontSize='large' />
        <Typography component='h1' variant='h5'>
          Reset Password
        </Typography>
        <form
          style={{ width: "100%", marginTop: "1rem" }}
          onSubmit={handleSubmit}>
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
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            style={{ margin: "1rem 0 2rem" }}>
            Reset Password
          </Button>
        </form>
        {message && (
          <Typography variant='body2' color='textSecondary' align='center'>
            {message}
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default ResetPassword;
