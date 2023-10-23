import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Footer() {
  return (
    <Box
      component="footer"
      className="footer footer-center bg-base-300 text-base-content mt-10"
    >
      <Container>
        <Typography variant="body2" align="center">
          Copyright © 2023 - All rights reserved by IF vates Ltd
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
