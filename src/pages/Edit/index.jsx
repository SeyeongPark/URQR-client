import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'animate.css';

const EditCard  = (props) => {
    let now = new Date();
    now = + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    const URL_BASE = "https://sptech-urqr.herokuapp.com";
    // const URL_BASE = "http://localhost:3000";

    // const API_BASE = "https://sptech-urqr-api.herokuapp.com";
    const API_BASE = "http://localhost:3001";
    
    let [cardInfo, setCardInfo] = useState([]);
    let submitCard = {};
    let [codeText, setCodeText] = useState('');
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
    
    let [isAuth, setIsAuth] = useState(false);
    let [inputPassword, setInputPassword] = useState('');

    const navigate = useNavigate();
    
    const today = new Date().toISOString().substring(0,10);
    let { qrText } = useParams();
    
    useEffect(() => {
        GetCardInfo(qrText)
    })
    
    const GetCardInfo =  async qrText => {
        await fetch(API_BASE + '/card/' + qrText)
        .then(res => res.json())
        .then(data => setCardInfo(data))
        .catch(err => console.error(err))
    }
    
    
    let ElInputPassword = document.getElementById('input-edit-password');

    // mid auth page
    const checkPassword = async (e) => {
        e.preventDefault();
        
        cardInfo.map(card => {
            if(inputPassword === card.password){
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

    const submitForm = async (e) => {
        e.preventDefault();

        cardInfo.map(card => {
            submitCard = card
        })

        const data = await fetch(API_BASE + "/card/edit/"+ qrText, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
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
            })
        }).then(res => res.json())
        .finally(navigate(`/result`, { state: { qrText: qrText }}))
        .catch(err => console.error(err));

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
        qrText = '';
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
        if(password === e.target.value){
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
            { isAuth ? (
            <div className="input-form-container">
                <div className="input-form-title">
                    <h2>Edit information card</h2>
                </div>
                <div className="container">
                    <form className="input-form" onSubmit={submitForm}>
                    {cardInfo.map(card => 
                    <div key={card._id}>
                    <div className="card-item__title">
                        <div className="input_card-item__NameTitle">First Name <em>*</em></div>
                        <div className="input_card_item_col2_NameTitle">Last Name <em>*</em></div>
                    </div>
                    <div>
                        <input id="firstName" type="text" defaultValue={card.firstName} placeholder='First Name'
                        onChange={e => setFirstName(e.target.value)} required/>
                        <input id="lastName" type="text" placeholder="Last Name"
                         defaultValue={card.lastName} onChange={e => setLastName(e.target.value)} required/>
                    </div>
                    <div className="input_card-item__NameTitle">Birth Date</div>
                    <div>
                        <input id="birth" type="date" placeholder="Date of Birth"
                         defaultValue={card.birth} max={today} onChange={e => setBirth(e.target.value)} />
                    </div>
                    <div className="card-item__title">
                        <div className="input_card-item__NameTitle">Cell Phone <em>*</em></div>
                        <div className="input_card_item_col2_NameTitle">Home Phone</div>
                    </div>
                    <div>
                        <input id="cellPhone" type="text" placeholder="Cell Phone"
                        defaultValue={card.cellPhone} onChange={e => setCellPhone(e.target.value)} required/>
                        <input id="homePhone" type="text" placeholder="Home Phone"
                        defaultValue={card.homePhone} onChange={e => setHomePhone(e.target.value)} />
                    </div>
                    <div className="card-item__title">
                        <div className="input_card-item__NameTitle">School Name</div>
                        <div className="input_card_item_col2_NameTitle">School Phone</div>
                    </div>
                    <div>
                        <input id="schoolName" type="text" placeholder="School Name"
                         defaultValue={card.schoolName} onChange={e => setSchoolName(e.target.value)} />
                        <input id="schoolPhone" type="text" placeholder="School Phone Number" defaultValue={card.schoolPhone}
                        onChange={e => setSchoolPhone(e.target.value)} />
                    </div>
                    <div className="input_card-item__NameTitle">Special Information</div>
                    <div>
                        <textarea id="addInfo" type="text" placeholder="Special needs, medical conditions, allergies, Important information"
                         defaultValue={card.addInfo} onChange={e => setAddInfo(e.target.value)} />
                    </div>
                    <div className="card-item__title">
                        <div className="input_card-item__NameTitle">Password <em>*</em></div>
                        <div className="input_card_item_col2_NameTitle">Confirm Password <em>*</em></div>
                    </div>
                    <div>
                        <input type={isHiden ? "password" : "text" }  name="password" placeholder="Password"
                         onChange={e => setPassword(e.target.value)}/>
                         <i className={isToggleOn ? "bi-eye" : "bi bi-eye-slash"} id="togglePassword" defaultValue={card.password} onClick={handlePasswordClick}></i>
                         <input type="password" name="confirmPassword" placeholder="Confirm Password"
                         onChange={e => checkPasswordIsSame(e)} required/>
                    </div>
                    <div className='password-confirm' id="password">
                         <span className="confirmSamePassword" id={isSamePassword}>{textIsSamePassword}</span>
                    </div>
                    <div className="edit-form-bottom">
                    <a className="link-back-to" href={URL_BASE + '/search/' + qrText}>Back to my QR</a>
                    <button type="submit" className="submit-btn" style={{marginLeft:'9.2rem'}} disabled={disableForm}>Submit</button>
                    </div>
                    </div>
                    )}
                    </form>
                    <div>
                        <img src={require('../../assets/images/account.svg').default}/>
                    </div>
                </div>
            </div>
                    ) : 
                    <div className="container">
                    <form className="input-form-password" onSubmit={checkPassword}>
                        <h2>Password for editing <b>{qrText}</b></h2>
                        <input type="password" id='input-edit-password' className ='input-edit-password'
                        onChange={e => setInputPassword(e.target.value)}></input>
                        <button className ='btn-edit-password' type="submit">Enter</button>
                        <div className='edit-password-confirm' id="edit-password">
                            <span className="confirmSamePassword" id={isSamePassword}>{textIsSamePassword}</span>
                        </div>
                    </form>
                </div> }
        </div>
        </>
    )
}

export default EditCard;