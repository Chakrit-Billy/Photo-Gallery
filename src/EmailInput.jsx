import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/db.js";

const EmailInput = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://react-mui-gilt.vercel.app/reset-password",
      });

      if (error) {
        setMessage("Password reset email could not be sent.");
      } else {
        setMessage("Password reset email sent successfully. Check your inbox.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while processing your request.");
    }
    navigate("/reset-password");
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
          Forgot Password
        </Typography>
        <form
          style={{ width: "100%", marginTop: "1rem" }}
          onSubmit={handleSubmit}>
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
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            style={{ margin: "1rem 0 2rem" }}>
            Send Reset Email
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

export default EmailInput;
