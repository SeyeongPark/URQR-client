import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');
    const [fourth, setFourth] = useState('');
    const [fifth, setFifth] = useState('');

    const navigate = useNavigate();
    
    const API_BASE = "https://sptech-urqr-api.herokuapp.com";
    const URL_BASE = "https://sptech-urqr.herokuapp.com";

    const clickEventUp = (first, next, before) => {
        if (first?.length && next != null) {
            document.getElementById(next).focus();
        }
    
        if (!first?.length && before != null){
            document.getElementById(before).focus();
        }
    }

    const [cardInfo, setCardInfo] = useState([])
    const [isVaildCode, setIsVaildCode] = useState(true)
    const codeText = (first + second + third + fourth + fifth).toUpperCase();

    const searchCode = (e) => {
        e.preventDefault();

        fetch(API_BASE + '/card/' + codeText)
            .then(res => res.json())
            .then(data => {
                setCardInfo(data);
            data.length > 0 ? navigate('/search/' + codeText) : setIsVaildCode(false)
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="background">
        <div className="input-search-container">
             <div style={{ textAlign:"center"}} className="container-edit-password">
                <div className='input-search'>
                <h1>SEARCH CARD CODE</h1>
                    <form onSubmit={searchCode}>
                        <input type='text' id='is-first' maxLength={1} onKeyUp={e => clickEventUp(e.target.value, 'is-second', null)} onChange={e => setFirst(e.target.value)} /> 
                        <input type='text' id='is-second' maxLength={1} onKeyUp={e => clickEventUp(e.target.value, 'is-third', 'is-first')} onChange={e => setSecond(e.target.value)}/> 
                        <input type='text' id='is-third' maxLength={1} onKeyUp={e => clickEventUp(e.target.value, 'is-fourth', 'is-second')} onChange={e => setThird(e.target.value)}/> 
                        <input type='text' id='is-fourth' maxLength={1} onKeyUp={e => clickEventUp(e.target.value, 'is-fifth', 'is-third')} onChange={e => setFourth(e.target.value)}/> 
                        <input type='text' id='is-fifth' maxLength={1} onKeyUp={e => clickEventUp(e.target.value, null, 'is-fourth')} onChange={e => setFifth(e.target.value)}/> 
                    <button type='submit'>Search</button>
                    <div className='search-msg'>
                        {!isVaildCode ? 
                        <span style={{color:'red', fontSize:'22px'}}>Hmm.. This code cannot be found</span> 
                        :  <span style={{fontSize:'22px'}}>&nbsp;</span> }
                    </div>
                    </form>
                </div>
            <div className='search-href'>
                <a href="/create"> BACK TO HOME</a>
            </div>
        </div>
    </div>
    </div>
    )
}

export default SearchPage;