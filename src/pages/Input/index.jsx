import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploadWidget from '../../app/common/ImageUploadWidget';

const InputData = (props) => {
    let now = new Date();
    now = + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    const today = new Date().toISOString().substring(0, 10);
    const currentDate = now + ' ' + today;

    const URL_BASE = "https://sptech-urqr.herokuapp.com";
    const API_BASE = "https://sptech-urqr-api.herokuapp.com";
    const URL_SEARCH = URL_BASE + "/search";

    const [card, setCard] = useState([]);
    const [codeText, setCodeText] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birth, setBirth] = useState('');
    const [homePhone, setHomePhone] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [schoolPhone, setSchoolPhone] = useState('');
    const [addInfo, setAddInfo] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState();
    const navigate = useNavigate();
    
    const [isMobile, setIsMobile] = useState(false);
    useEffect(()=>{
        window.innerWidth <= 1024 ? setIsMobile(true) : setIsMobile(false);
    },[window.innerWidth])

    const GenerateCode = () => {
        return new Array(5).join().replace(/(.|$)/g, function () { return ((Math.random() * 36) | 0).toString(36); }).toUpperCase();
    }

    const submitForm = async () => {
        let code = GenerateCode();
        const object = {
            cardCode: code,
            firstName: firstName,
            lastName: lastName,
            birth: birth,
            homePhone: homePhone,
            cellPhone: cellPhone,
            schoolName: schoolName,
            schoolPhone: schoolPhone,
            addInfo: addInfo,
            password: password,
            issueDate: currentDate
        }
        let formData = new FormData();
        for (const key in object) {
            formData.append(key, object[key])
        }
        formData.append('Image', image);
        const data = await fetch(API_BASE + "/card/new", {
            method: 'POST',
            body: formData
        }).then(navigate(`/result`, { state: { qrText: code } }))

        setCard([...card, data]);
        setCodeText('');
        setFirstName('');
        setLastName('');
        setBirth('');
        setHomePhone('');
        setCellPhone('');
        setSchoolName('');
        setSchoolPhone('');
        setAddInfo('');
        setPassword('');
        setIsSamePassword('false');
        setTextIsSamePassword('');
        setDisableForm(false);
    }

    const [isToggleOn, setIsToggleOn] = useState(false);
    const [isHiden, setIsHiden] = useState(true);
    const [isSamePassword, setIsSamePassword] = useState('false');
    const [textIsSamePassword, setTextIsSamePassword] = useState('');
    const [disableForm, setDisableForm] = useState(false);

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
        if (password == e.target.value) {
            setDisableForm(false);
            setTextIsSamePassword(<i className='bi bi-check'></i>)
            setIsSamePassword('true')
        } else {
            setDisableForm(true);
            setTextIsSamePassword("The password confirmation does not match")
            setIsSamePassword('false')
        }
    }

    return (
        <>
        <div className="input-container">
            <div className="input-form-container">
                <div className="input-form-title">
                    <h2>Create new card</h2>
                </div>
                <div className="container">
                    <form className="input-form" onSubmit={submitForm}>
                    <div className="two-column-form">
                    <div className="form-group"/>
                    <div className="form-group">
                        <label>First Name<em> *</em></label>
                        <input id="firstName" type="text" 
                        onChange={e => setFirstName(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label>Last Name<em> *</em></label>
                        <input id="lastName" type="text" 
                        onChange={e => setLastName(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label>Birth Date</label>
                        <input id="birth" type="date"
                         max={today} onChange={e => setBirth(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Cell Phone <em> *</em></label>
                        <input id="cellPhone" type="tel" 
                        onChange={e => setCellPhone(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label>Home Phone</label>
                        <input id="homePhone" type="tel" 
                        onChange={e => setHomePhone(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>School Name</label>
                        <input id="schoolName" type="text"
                        onChange={e => setSchoolName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>School Phone</label>
                        <input id="schoolPhone" type="text"
                        onChange={e => setSchoolPhone(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Special Information</label>
                        <textarea id="addInfo" type="text" placeholder="Special needs, medical conditions, allergies, Important information"
                        onChange={e => setAddInfo(e.target.value)} />
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
                        <label>Confirm Password  <em>*</em></label>
                        <input type="password" name="confirmPassword" 
                         onChange={e => checkPasswordIsSame(e)} required/>
                         <div className='password-confirm' id="password">
                            <span className="confirmSamePassword" id={isSamePassword}>{textIsSamePassword}</span>
                         </div>
                    </div>


                    <div className="form-group">
                        <button type="submit" className="submit-btn" disabled={disableForm}>Make My QR</button>
                        { isMobile ? 
                        <div className='search-href'>
                            <a href="/">Back to main</a>
                        </div> : '' }
                    </div>

                    </div>
                    </form>

                    { isMobile ? '' : <>
                    <div className='right-form'>
                        <h3>Upload Image</h3>
                        <div>
                            <ImageUploadWidget setFile={setImage} isMobile={isMobile} />
                        </div>
                        <div className='search-href'>
                            <a href="/">Back to main</a>
                        </div> 
                        </div> 
                    </>
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default InputData;