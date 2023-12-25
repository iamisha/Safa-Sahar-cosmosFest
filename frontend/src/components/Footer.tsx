"use client";
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  background: linear-gradient(to bottom, #ff4b2b,#ff416c); /* Set the background color */
  color: #fff; /* Set the text color */
  padding: 20px; /* Set padding to create space inside the footer */
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      &copy; 2023 team TNT. All rights reserved.
    </FooterContainer>
  );
};

export default Footer;
