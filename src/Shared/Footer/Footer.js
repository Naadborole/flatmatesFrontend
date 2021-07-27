import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';
const Footer = () => (
  <center>
  <div className="footer fixed-bottom " >
    
    
    <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            
          </div>
        </div>
        <div className='footer-link-wrapper'>
          
          <div class='footer-link-items'>
            <h2>Privacy policy</h2>
            
          </div>
        </div>
      </div>
    <section class='social-media'>
        <div class='social-media-wrap'>
        <Link to ="/">
          <span className="text-white -pl-2" style={{fontSize:"30px"}}  >
              <i className="fas fa-home"/>
              
              &nbsp; FindFlatmates
              
          </span>
        </Link>
          <small class='website-rights'></small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    
  </div>
  </center>
  
);

export default Footer;