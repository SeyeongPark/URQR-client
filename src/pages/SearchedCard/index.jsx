/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import QRCode from 'qrcode';
import {useEffect} from 'react';

const SearchedCard = () => {
  const API_BASE = 'https://sptech-urqr-api.herokuapp.com';

  const [cardInfo, setCardInfo] = useState([]);
  const [qrCode, setQrCode] = useState('');
  const {qrText} = useParams();
  const [isMobile, setIsMobile] = useState(false);

  const defaultImgUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  useEffect(() => {
    getCardInfo(qrText);
    generateQrCode();

        window.innerWidth <= 1024 ? setIsMobile(true) : setIsMobile(false);
  }, [qrText, window.innerWidth]);

  const getCardInfo = async (qrText) => {
    await fetch(API_BASE + '/card/' + qrText)
        .then((res) => res.json())
        .then((data) => {
          setCardInfo(data);
        })
        .catch((err) => console.error(err));
  };

  const generateQrCode = () => {
    QRCode.toDataURL(qrText, {
      width: 400,
      margin: 3,
    }, (err, url) => {
      if (err) return console.log(err);
      setQrCode(url);
    });
  };

  return (
    <>
      <div className="input-container">
        <div className="input-form-container">
          <div className="input-form-title">
            <h2>Card Information</h2>
          </div>
          <div className="container">
            {cardInfo.map((card) => (
              <>
                <form className="input-form">
                  <div className="two-column-form" key={card._id}>

                    <div className="form-group">
                      { isMobile ?
                    <div className='right-form'>
                      <img src={card.imageUrl == '' ? defaultImgUrl : card.imageUrl} style={{objectFit: 'contain', width: '100%', height: '300px', marginBottom: '20px'}} alt="Image"/>
                    </div> : ''}
                    </div>

                    <div className="form-group">
                      <label>First Name</label>
                      <input value={card.firstName} disabled />
                    </div>

                    <div className="form-group">
                      <label>Last Name</label>
                      <input value={card.lastName} disabled />
                    </div>

                    <div className="form-group">
                      <label>Birth Date</label>
                      <input value={card.birth} disabled />
                    </div>

                    <div className="form-group">
                      <label>Cell Phone</label>
                      <input value={card.cellPhone} disabled />
                    </div>

                    <div className="form-group">
                      <label>Home Phone</label>
                      <input value={card.homePhone} disabled />
                    </div>

                    <div className="form-group">
                      <label>School Name</label>
                      <input value={card.schoolName} disabled />
                    </div>

                    <div className="form-group">
                      <label>School Phone</label>
                      <input value={card.schoolPhone} disabled />
                    </div>

                    <div className="form-group">
                      <label>Special Information</label>
                      <textarea value={card.addInfo} disabled />
                    </div>

                    <div className="form-group"/>

                    <div className="form-group">
                      <a id="create-a" href="/create"> Create new code</a>
                    </div>

                    <div className="form-group">
                      <a id="edit-a" href={'/edit/' + qrText}> Edit Card</a>
                    </div>

                    <div className="form-group"/>

                    { isMobile ?
                    <div className='search-href' style={{margin: '-.5rem 0 2rem 0'}}>
                      <a href="/search"> Search a code</a>
                    </div> : ''}
                  </div>
                </form>

                { isMobile ? '' : <>
                  <div className='right-form'>
                    <img src={card.imageUrl == '' ? defaultImgUrl : card.imageUrl} style={{objectFit: 'contain', width: '380px', height: '470px'}} alt="Image"/>
                    <div className='search-href' style={{marginTop: '1rem'}}>
                      <a href="/search"> Search a code</a>
                    </div>
                  </div>
                </>}
              </>))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedCard;
