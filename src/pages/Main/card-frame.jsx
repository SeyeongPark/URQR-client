import React from "react"

const CardFrame = (props) => {
    return (
       <>
        <div className="nav-box">
            <a href={props.href}>
                    <img src={props.src}/>
                    <h2>{props.title}</h2>
            </a>
        </div>
       </>
    )
   }

export default CardFrame