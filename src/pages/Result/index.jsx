import React, { useState, useTransition } from 'react';
import { useLocation } from "react-router-dom";
import QRCode from 'qrcode';
import LiveQrCode from './live-qr'
import { useEffect } from 'react';

function Result() {

    const API_BASE = "https://sptech-urqr-api.herokuapp.com";
    const URL_BASE = "https://sptech-urqr.herokuapp.com";
    const URL_SEARCH = URL_BASE + "/search";

    const [cardInfo, setCardInfo] = useState([])
    const [qrCode, setQrCode] = useState("")
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);

    let qrText = location.state.qrText;
    let urlQrText = URL_BASE + '/search/' + location.state.qrText;

    const URL_EDIT = URL_BASE + '/edit/' + qrText;

    useEffect(() => {
        GetCardInfo(qrText)
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
                                <input id="birth" type="date" defaultValue={card.birth} disabled />
                            </div>
                
                            <div className="form-group">
                                <label>Cell Phone<em> *</em></label>
                                <input id="cellPhone" type="text" defaultValue={card.cellPhone} disabled/>
                            </div>
                
                            <div className="form-group">
                                <label>Home Phone</label>
                                <input id="homePhone" type="text" 
                               defaultValue={card.homePhone} disabled />
                            </div>
                
                            <div className="form-group">
                                <label>School Name</label>
                                <input id="schoolName" type="text" defaultValue={card.schoolName} disabled />
                            </div>
                
                            <div className="form-group">
                                <label>School Phone</label>
                                <input id="schoolPhone" type="text" defaultValue={card.schoolPhone} disabled/>
                            </div>
                
                            <div className="form-group">
                                <label>Special Information</label>
                                <textarea id="addInfo" type="text" defaultValue={card.addInfo} disabled/>
                            </div>
                            
                            <div className="form-group"/>

                            <div className="form-group">
                                <a id="create-a" href="/create"> Create new code</a>
                            </div>

                            <div className="form-group">
                                <a id="edit-a" href={"/edit/"+qrText}> Edit Card</a>
                            </div>
                            
                            { isMobile ? 
                            <div className='search-href' style={{margin:'1rem 0 2rem 0'}}>
                                <a href="/search"> Search a code</a>
                            </div> : ''}
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
                    <div className='search-href' style={{marginTop:'3.5rem'}}>
                            <a href="/search"> Search a code</a>
                    </div>
                    </div>
                    </>}

                </div>

            </div>
        </div>
    )
}


export default Result;