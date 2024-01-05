import React from "react";

export default function Header(){
    return(
        <section className='header'>
        <div className='header-container'>
          <img 
          className='header-img'
          src='/worldmap.png'/>
          <div className='header-title-container'> 
            <img className='header-title-img' src='/parrot.png'/>
            <div className='header-title'>
              <h1>PollyGlot</h1>
              <p>Perfect translation every time</p>
            </div>
          </div>        
        </div>
      </section>
    )
}