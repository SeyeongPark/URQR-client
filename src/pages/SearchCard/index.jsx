import React, { useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import QRCode from 'qrcode';
import { useEffect } from 'react';

function SearchCard() {
    
    const API_BASE = "https://sptech-urqr-api.herokuapp.com";
    const URL_BASE = "https://sptech-urqr.herokuapp.com";

    const [cardInfo, setCardInfo] = useState([])
    const [qrCode, setQrCode] = useState("")
    const { qrText } = useParams();
    const URL_EDIT = URL_BASE+'/edit/'+qrText;

    useEffect(() => {
        GetCardInfo(qrText)
        generateQrCode()
    })

    const GetCardInfo =  async qrText => {
        await fetch(API_BASE + '/card/' + qrText)
        .then(res => res.json())
        .then(data => setCardInfo(data))
        .catch(err => console.error(err))
    }

    const generateQrCode = () => {
        QRCode.toDataURL(qrText, {
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
                        <h2>Card Information</h2>
                    </div>
                    <div className="container">
                    <div className="input-form">
                    {cardInfo.map(card => (
                        <div key={card._id}>
                    <div className="card-item__title">
                        <div className="input_card-item__NameTitle">First Name</div>
                        <div className="input_card-item__NameTitle">Last Name</div>
                    </div>
                        <input value={card.firstName} disabled/>
                        <input value={card.lastName} disabled/>
                    <div>
                    <div className="input_card-item__NameTitle">Birth Date</div>
                        <input value={card.birth} disabled/>
                    </div>
                    <div className="card-item__title">
                        <div className="input_card-item__NameTitle">Home Phone</div>
                        <div className="input_card-item__NameTitle">Cell Phone</div>
                    </div>
                    <div>
                        <input value={card.homePhone} disabled/>
                        <input value={card.cellPhone} disabled/>
                    </div>
                    <div>
                    <div className="card-item__title">
                        <div className="input_card-item__NameTitle">School Name</div>
                        <div className="input_card-item__NameTitle">School Phone</div>
                    </div>
                        <input value={card.schoolName} disabled/>
                        <input value={card.schoolPhone} disabled/>
                    </div>
                    <div>
                        <div className="input_card-item__NameTitle">Special Information</div>
                        <textarea value={card.addInfo} disabled/>
                    </div>
                </div>    
                ))}
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


export default SearchCard;