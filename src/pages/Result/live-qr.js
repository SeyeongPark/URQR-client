// Create this js for using same name, QRCode but different module

import QRCode from "react-qr-code";

const LiveQrCode = ({value}) => {
    return <QRCode value={value} />;
}

export default LiveQrCode;