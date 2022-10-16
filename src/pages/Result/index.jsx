import React, { useState, useTransition } from 'react';
import { useLocation } from "react-router-dom";
import QRCode from 'qrcode';
import LiveQrCode from './live-qr'
import { useEffect } from 'react';

function Result() {

    // const API_BASE = "https://sptech-urqr-api.herokuapp.com";
    const API_BASE = "http://localhost:3001";

    const URL_BASE = "http://localhost:3000";
    // const URL_BASE = "https://sptech-urqr.herokuapp.com";

    const [cardInfo, setCardInfo] = useState([])
    const [qrCode, setQrCode] = useState("")
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);

    let qrText = location.state.qrText;
    let urlQrText = URL_BASE + '/code/' + location.state.qrText;

    const URL_EDIT = URL_BASE + '/edit/' + qrText;

    useEffect(() => {
        GetCardInfo(qrText)
        console.log()
        qrText = location.state.qrText;
        generateQrCode()

        window.innerWidth <= 1024 ? setIsMobile(true) : setIsMobile(false);
    }, [qrText, window.innerWidth])

    const GetCardInfo = async qrText => {
        await fetch(API_BASE + '/card/' + qrText)
            .then(res => res.json())
            .then(data => setCardInfo(data))
            .catch(err => console.error(err))
    }

    const generateQrCode = () => {
        QRCode.toDataURL(urlQrText, {
            width: 400,
            margin: 3,
        }, (err, url) => {
            if (err) return console.log(err)
            setQrCode(url)
        })
    }

    return (
        <div className="input-container">
            <div className="input-form-container">
                <div className="input-form-title">
                    <h2>It's ready for your QR!</h2>
                </div>
                <div className="container">
                    <div className="input-form">
                        {cardInfo.map(card => (
                            <div key={card._id}>
                            <div className="two-column-form" >
                            <div className="form-group">

                            { isMobile ?
                            <div className="form-group">
                                <img id='qrcode' src={qrCode} />
                                <h5>{qrText}</h5>
                                <a className="btn-download" href={qrCode} download={`URQR-${qrText}.png`}>download</a>
                            </div> : ''} 

                            </div>
                
                            <div className="form-group">
                               <label>First Name<em> *</em></label>
                               <input id="firstName" type="text" defaultValue={card.firstName}
                                   disabled/>
                            </div>
                
                            <div className="form-group">
                                <label>Last Name<em> *</em></label>
                                <input id="lastName" type="text" defaultValue={card.lastName}
                                   disabled/>
                            </div>
                
                            <div className="form-group">
                                <label>Birth Date</label>
                                <input id="birth" type="date" placeholder="Date of Birth" defaultValue={card.birth} disabled />
                            </div>
                
                            <div className="form-group">
                                <label>Cell Phone<em> *</em></label>
                                <input id="cellPhone" type="text" placeholder="Cell Phone" defaultValue={card.cellPhone} disabled/>
                            </div>
                
                            <div className="form-group">
                                <label>Home Phone</label>
                                <input id="homePhone" type="text" placeholder="Home Phone"
                               defaultValue={card.homePhone} disabled />
                            </div>
                
                            <div className="form-group">
                                <label>School Name</label>
                                <input id="schoolName" type="text" placeholder="School Name" defaultValue={card.schoolName} disabled />
                            </div>
                
                            <div className="form-group">
                                <label>School Phone</label>
                                <input id="schoolPhone" type="text" placeholder="School Phone Number" defaultValue={card.schoolPhone} disabled/>
                            </div>
                
                            <div className="form-group">
                                <label>Special Information</label>
                                <textarea id="addInfo" type="text" placeholder="Special needs, medical conditions, allergies, Important information" defaultValue={card.addInfo} disabled/>
                            </div>
                            
                            <div className="form-group"/>

                            <div className="form-group">
                                <a id="create-a" href={URL_BASE}> Create new code</a>
                            </div>

                            <div className="form-group">
                                <a id="edit-a" href={URL_EDIT}> Edit Card</a>
                            </div>

                            <div className="form-group"/>

                            </div>
                            </div>
                        ))}
                    </div>
                    { isMobile ? '' : <>
                    <div className="qr-code-container">
                        <img src={qrCode} />
                        <h5>{qrText}</h5>
                        <a className="btn-download" href={qrCode} download={`URQR-${qrText}.png`}>download</a>
                    </div>
                    </>}

                </div>

            </div>
        </div>
    )
}


export default Result;