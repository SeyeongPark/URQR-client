import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'animate.css';
import ImageUploadWidget from '../../app/common/ImageUploadWidget';

let now = new Date();
now = + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
const today = new Date().toISOString().substring(0, 10);

const URL_BASE = "https://sptech-urqr.herokuapp.com";
// const URL_BASE = "http://localhost:3000";

const API_BASE = "https://sptech-urqr-api.herokuapp.com";
// const API_BASE = "http://localhost:3001";

const EditCard = (props) => {
    let { qrText } = useParams();
    let [isAuth, setIsAuth] = useState(false);
    let [cardInfo, setCardInfo] = useState([]);
    let [inputPassword, setInputPassword] = useState('');
    
    useEffect(() => {
        GetCardInfo(qrText)
    }, [qrText])
    
    const GetCardInfo = async qrText => {
        await fetch(API_BASE + '/card/' + qrText)
        .then(res => res.json())
        .then(data => setCardInfo(data))
        .catch(err => console.error(err))
    }
    
    let ElInputPassword = document.getElementById('input-edit-password');
    
    const [isSamePassword, setIsSamePassword] = useState('false');
    const [textIsSamePassword, setTextIsSamePassword] = useState('');

    // mid auth page
    const checkPassword = async (e) => {
        e.preventDefault();
        
        cardInfo.map(card => {
            if (inputPassword === card.password) {
                setIsAuth(true)
                setTextIsSamePassword('')
            }
            else {
                ElInputPassword.value = ''
                setIsSamePassword('false')
                setTextIsSamePassword("Try Again, it's wrong password")
            }
        })
    }

    return (
        <>
            <div className="input-container">
                { isAuth ? (
                    <Edit qrText={qrText} cardInfo={cardInfo}/>
                ) :
                    <div className="container-edit-password">
                        <form className="input-form-password" onSubmit={checkPassword}>
                            <h2>Password for editing <b>{qrText}</b></h2>
                            <input type="password" id='input-edit-password'
                                onChange={e => setInputPassword(e.target.value)}></input>
                            <button className='btn-edit-password' type="submit">Enter</button>
                            <div className='edit-password-confirm' id="edit-password">
                                <span className="confirmSamePassword" id={isSamePassword}>{textIsSamePassword}</span>
                            </div>
                        </form>
                    </div>}
            </div>
        </>
    )
}

const Edit = ({cardInfo, qrText}) => {
    let submitCard = {};
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [birth, setBirth] = useState('');
    let [imageUrl, setImageUrl] = useState('');
    let [homePhone, setHomePhone] = useState('');
    let [cellPhone, setCellPhone] = useState('');
    let [schoolName, setSchoolName] = useState('');
    let [schoolPhone, setSchoolPhone] = useState('');
    let [addInfo, setAddInfo] = useState('');
    let [password, setPassword] = useState('');
    const [image, setImage] = useState();

    const [isSamePassword, setIsSamePassword] = useState('false');
    const [textIsSamePassword, setTextIsSamePassword] = useState('');

    const [isToggleOn, setIsToggleOn] = useState(false);
    const [isHiden, setIsHiden] = useState(true);
    const [disableForm, setDisableForm] = useState(false);

    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        window.innerWidth <= 1024 ? setIsMobile(true) : setIsMobile(false);
    }, [qrText, window.innerWidth])

    const handlePasswordClick = () => {
        if (isToggleOn === false) {
            setIsToggleOn(true);
            setIsHiden(false);
        }
        else {
            setIsToggleOn(false);
            setIsHiden(true);
        }
    }

    const checkPasswordIsSame = (e) => {
        if (password === e.target.value) {
            setDisableForm(false);
            setTextIsSamePassword(<i className='bi bi-check'></i>)
            setIsSamePassword('true')
        } else {
            setDisableForm(true);
            setTextIsSamePassword("The password confirmation does not match")
            setIsSamePassword('false')
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();

        cardInfo.map(card => {
            submitCard = card
        })
        const object = {
            cardCode: qrText,
            firstName: firstName === '' ? submitCard.firstName : firstName,
            lastName: lastName === '' ? submitCard.lastName : lastName,
            imageUrl: imageUrl === '' ? submitCard.imageUrl : imageUrl,
            birth: birth === '' ? submitCard.birth : birth,
            homePhone: homePhone === '' ? submitCard.homePhone : homePhone,
            cellPhone: cellPhone === '' ? submitCard.cellPhone : cellPhone,
            schoolName: schoolName === '' ? submitCard.schoolName : schoolName,
            schoolPhone: schoolPhone === '' ? submitCard.schoolPhone : schoolPhone,
            addInfo: addInfo === '' ? submitCard.addInfo : addInfo,
            password: password === '' ? submitCard.password : password,
            issueDate: now
        }

        let formData = new FormData();

        for (const key in object){
            formData.append(key, object[key]);
        }
        
        formData.append('Image', image);
        fetch(API_BASE + "/card/edit/" + qrText, {
            method: 'PUT',
            body: formData
        }).then(res => res.json())
            .finally(navigate(`/result`, { state: { qrText: qrText } }))
            .catch(err => console.error(err));
    }


    return ( 
    <div className="input-container">
        <div className="input-form-container">
            <div className="input-form-title">
                <h2>Edit information card</h2>
            </div>
            <div className="container">
                <form className="input-form" onSubmit={submitForm}>
                {cardInfo.map(card => (
                <div key={card._id}>
                    <div className="two-column-form" >

                <div className="form-group"/>

                <div className="form-group">
                <label>First Name<em> *</em></label>
                <input id="firstName" type="text" defaultValue={card.firstName}
                    onChange={e => setFirstName(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Last Name<em> *</em></label>
                    <input id="lastName" type="text" defaultValue={card.lastName}
                    onChange={e => setLastName(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Birth Date</label>
                    <input id="birth" type="date" placeholder="Date of Birth" defaultValue={card.birth} max={today} onChange={e => setBirth(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Cell Phone<em> *</em></label>
                    <input id="cellPhone" type="text" placeholder="Cell Phone" defaultValue={card.cellPhone} onChange={e => setCellPhone(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Home Phone</label>
                    <input id="homePhone" type="text" placeholder="Home Phone"
                defaultValue={card.homePhone} onChange={e => setHomePhone(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>School Name</label>
                    <input id="schoolName" type="text" placeholder="School Name" defaultValue={card.schoolName} onChange={e => setSchoolName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>School Phone</label>
                    <input id="schoolPhone" type="text" placeholder="School Phone Number" defaultValue={card.schoolPhone} onChange={e => setSchoolPhone(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Special Information</label>
                    <textarea id="addInfo" type="text" placeholder="Special needs, medical conditions, allergies, Important information" defaultValue={card.addInfo} onChange={e => setAddInfo(e.target.value)} />
                </div>

                <div className="form-group">
                { isMobile ? 
                    <div className="right-form">
                        <label id="upload-lb">Upload Image</label>
                        <ImageUploadWidget setFile={setImage} isMobile={isMobile} />
                    </div>
                    : '' }
                </div>

                <div className="form-group">
                <label>Password<em> *</em></label>
                <input id="password-input" type={isHiden ? "password" : "text"} name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <i className={isToggleOn ? "bi-eye" : "bi bi-eye-slash"} id="togglePassword" defaultValue={card.password} onClick={handlePasswordClick}></i>
                </div>

                <div className="form-group">
                    <label>Confirm Password<em> *</em></label>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={e => checkPasswordIsSame(e)} required />
                    <div className='password-confirm' id="password">
                        <span className="confirmSamePassword" id={isSamePassword}>{textIsSamePassword}</span>
                    </div>
                </div>

                <div className="form-group">
                <button type="submit" className="submit-edit-btn" disabled={disableForm}>Edit My QR</button>
            </div>    
            
                </div>
            </div>
            ))}
            </form>

                { isMobile ? '' : <>
                <div className='right-form'>
                    <h3>Upload Image</h3>
                    <div>
                        <ImageUploadWidget setFile={setImage} isMobile={isMobile} />
                    </div>
                    </div> 
                </>
                }
            </div>
        </div>
    </div>
    )
}

export default EditCard;