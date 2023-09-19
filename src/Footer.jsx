import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <footer className='bg-gray-100 text-black pt-[100px] pb-12'>
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant='h6' gutterBottom>
              Contact Info
            </Typography>
            <address className='mb-4'>
              <p>Chakrit Assbilly</p>
              <p>Email: abl.chakrit@gmail.com</p>
              <p>Phone: 099-2318428</p>
            </address>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant='h6' gutterBottom>
              Social Media
            </Typography>
            <div className='flex space-x-4 mt-2'>
              <IconButton>
                <LinkedInIcon fontSize='large' />
              </IconButton>
              <IconButton>
                <GitHubIcon fontSize='large' />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='h6' gutterBottom>
              About Me
            </Typography>
            <p>
              I'm a passionate developer who enjoys creating beautiful and
              functional web applications. My goal is to deliver high-quality
              software solutions that meet the needs of my clients and users.
            </p>
          </Grid>
        </Grid>
        <Typography variant='body2' align='center' className='mt-8'>
          &copy; {new Date().getFullYear()} Your Portfolio. All Rights Reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
