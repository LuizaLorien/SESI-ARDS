import React from 'react';
import { useState } from "preact/hooks"
import '../styles/Navbar.css'

export default function Navbar({children}){

    return(
        <>
        <div className="Nav-Box">

        </div>
        </>
    )
}

const MenuModal = ({modal, })=>{
    if(modal===true)
    return(  
        <>  
     <div>
        Este é um Modal
        <button onClick={() => setModal(false)}>Fechar</button>
    </div>
    </>
    )
    
    return null
}