import React from 'react';

function clickEventUp(first, next, before) {
    if (first?.length && next != null) {
        document.getElementById(next).focus();
    }

    if (!first?.length && before != null){
        document.getElementById(before).focus();
    }
}


const SearchPage = () => {
    return (
        <div className="input-container">
             <div style={{ textAlign:"center"}} className="container-edit-password">
                <h1>SEARCH CARD CODE</h1>
                <div className='input-search'>
                    <input type='text' id='is-first' maxLength={1} onKeyUp={e => clickEventUp(e.target.value, 'is-second', null)} /> 
                    <input type='text' id='is-second' maxLength={1} onKeyUp={e => clickEventUp(e.target.value, 'is-third', 'is-first')}/> 
                    <input type='text' id='is-third' maxLength={1} onKeyUp={e => clickEventUp(e.target.value, 'is-fourth', 'is-second')} /> 
                    <input type='text' id='is-fourth' maxLength={1} onKeyUp={e => clickEventUp(e.target.value, 'is-fifth', 'is-third')} /> 
                    <input type='text' id='is-fifth' maxLength={1} onKeyUp={e => clickEventUp(e.target.value, null, 'is-fourth')}/> 
                   <button>Search</button>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;