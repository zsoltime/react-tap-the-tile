import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ className, size }) => (
  <svg
    className={className}
    fill="none"
    height={size}
    viewBox="0 0 512 512"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="35" y="35" width="200" height="200" fill="#e3e3e3" />
    <rect x="277" y="35" width="200" height="200" fill="#363636" />
    <rect x="35" y="277" width="200" height="200" fill="#363636" />
    <rect x="277" y="277" width="200" height="200" fill="#363636" />
  </svg>
);

Logo.defaultProps = {
  size: 128,
};

Logo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default Logo;
