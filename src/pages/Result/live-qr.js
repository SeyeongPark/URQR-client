/* eslint-disable react/prop-types */
// Create this js for using same name, QRCode but different module
import React from 'react';
import QRCode from 'react-qr-code';

const LiveQrCode = ({value}) => {
  return <QRCode value={value}/>;
};

export default LiveQrCode;
