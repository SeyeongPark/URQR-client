import React, { useState, useTransition } from 'react';
import { useLocation } from "react-router-dom";
import QRCode from 'qrcode';
import LiveQrCode from './live-qr'
import { useEffect } from 'react';

function Test() {
    
    const API_BASE = "https://sptech-urqr-api.herokuapp.com";
    // const API_BASE = "http://localhost:3001";

    // const URL_BASE = "http://localhost:3000";
    const URL_BASE = "https://sptech-urqr.herokuapp.com";

    const [cardInfo, setCardInfo] = useState([])
    const [qrCode, setQrCode] = useState("")
    const location = useLocation();
    let qrText = location.state.qrText; 
    let urlQrText = URL_BASE + '/search/' + location.state.qrText;

    const URL_EDIT = URL_BASE+'/edit/'+qrText;

    useEffect(() => {
        GetCardInfo(qrText)
        qrText = location.state.qrText; 
        generateQrCode()
    })

    const GetCardInfo =  async qrText => {
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
                    <div className="card-item__title">
                        <div className="card-item__NameTitle">First Name</div>
                        <div className="card-item__col2_NameTitle">Last Name</div>
                    </div>
                        <input value={card.firstName} disabled/>
                        <input value={card.lastName} disabled/>
                    <div>
                    <div className="card-item__NameTitle">Birth Date</div>
                        <input value={card.birth} disabled/>
                    </div>
                    <div className="card-item__title">
                        <div className="card-item__NameTitle">Cell Phone</div>
                        <div className="card-item__col2_NameTitle">Home Phone</div>
                    </div>
                    <div>
                        <input value={card.cellPhone} disabled/>
                        <input value={card.homePhone} disabled/>
                    </div>
                    <div>
                    <div className="card-item__title">
                        <div className="card-item__NameTitle">School Name</div>
                        <div className="card-item__col2_NameTitle">School Phone</div>
                    </div>
                        <input value={card.schoolName} disabled/>
                        <input value={card.schoolPhone} disabled/>
                    </div>
                    <div>
                        <div className="card-item__NameTitle">Special Information</div>
                        <textarea value={card.addInfo} disabled/>
                    </div>
                </div>    
                ))}
                    </div>
                    <div className="qr-code-container">
                            <img src={qrCode}/>
                            <h5>{qrText}</h5>
                            <a className="btn-download" href={qrCode} download={`URQR-${qrText}.png`}>download</a>
                    </div>
                </div>
                <div className="form-bottom">
                    <a className="link-new-code" href={URL_BASE}> Create new code</a>
                    <a className="link-edit-code" href={URL_EDIT}> Edit Card</a>
                </div>
                </div>
            </div>
        )
    }


export default Test;