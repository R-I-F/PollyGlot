import { useState, useEffect } from 'react'

export default function Form({formInput, setFormInput}){

    function handleRadioChange(e){
        if(e.target.id==='fr'){
            setFormInput((prev)=>{return{
                fr:!prev.fr, sp:false, jpn:false
            }})
        }
        else if(e.target.id==='sp'){
            setFormInput((prev)=>{return{
                fr:false, sp:!prev.sp, jpn:false
            }})
        }
        else if(e.target.id==='jpn'){
            setFormInput((prev)=>{return{
                fr:false, sp:false, jpn:!prev.jpn
            }})
        }
    }

    return(
        <form>
                <div className='form-el'>
                    <input 
                    type='radio' 
                    id='fr' 
                    name='lang-form'
                    onChange={(event)=>handleRadioChange(event)}
                    checked={formInput.fr}/>
                    <label htmlFor='fr'>French</label>
                    <img className='flag' src='/fr-flag.png'/>
                </div>
                <div className='form-el'>
                    <input 
                    type='radio' 
                    id='sp' 
                    name='lang-form'
                    onChange={(event)=>handleRadioChange(event)}
                    checked={formInput.sp}/>
                    <label htmlFor='sp'>Spanish</label>
                    <img className='flag' src='/sp-flag.png'/>
                </div>
                <div className='form-el'>
                    <input 
                    type='radio' 
                    id='jpn' 
                    name='lang-form'
                    onChange={(event)=>handleRadioChange(event)}
                    checked={formInput.jpn}/>
                    <label htmlFor='jpn'>Japanese</label>
                    <img className='flag' src='/jpn-flag.png'/>
                </div>
              </form>
    )
}