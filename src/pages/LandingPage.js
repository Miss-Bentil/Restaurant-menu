import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/landingpage.css';
import { Modal } from 'react-bootstrap';

function LandingPage() {
  const navigationLinks = [
    { to: '/menu', label: 'Menu' },
    {
      to: '',
      label: 'Feedback',
    
    },
    { to: '/upload', label: 'Upload' },
  ];



  return (
    <div className="h-screen landbackground">
      <div className="landingPage ">
        <div className="logo-container"></div>

        <div className="flex justify-center items-center ">
          <div className="links ">
            {navigationLinks.map((link, index) => (
              <div className=" " key={index}>
                <Link to={link.to} className="">
                  <div className="link-button mb-4">{link.label}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
