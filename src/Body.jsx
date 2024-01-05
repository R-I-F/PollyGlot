import { useState, useEffect } from 'react'
import Form from './Form.jsx'
import OpenAI from 'openai'

export default function Body(){
    const [showResults, setShowResults] = useState(false)
    const [formInput, setFormInput] = useState({fr:false, sp:false, jpn:false})
    //handles form radio input isChecked
    const [textInput, setTextInput] = useState('')
    const [translationInput, setTranslationInput] = useState('')
    // handles text area input value 
    const [areFieldsEmpty, setAreFieldsEmpty] = useState(false)
    // if fields are empty areFieldsEmpty is true

    const openai = new OpenAI({
        apiKey: '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', 
        dangerouslyAllowBrowser: true // used to overide the security
    })
    async function responseTxt(message, lang){
        try{
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role:'system', 
                        content:'You are a language translator, the user will prompt you with a message and the desired translation language, you will respond to the user with a translation of the text in the specified language by the user. keep your response accurate and semi equal to the provided text in length '
                    },{
                        role:'user', 
                        content:`${message}. translation language:${lang}`
                    }
                ],
                temperature: 1, // a variable between 0-2 that controls the creativity of the reply
                max_tokens: 100, // limits the number of completion tokens to 16 // default inf
            })
            console.log(response.choices[0].message.content)
            setTranslationInput(response.choices[0].message.content)
        }
        catch (error) {
            console.error('Error:', error);
            // Handle errors appropriately
        }
    }



    function isLangSelected(){
        let isTrue = false;
        for(const key in formInput){
            if(formInput[key]){
                isTrue = true;
                break;
            }
        }
        return isTrue
    }

    const translationLang = ()=>{
        let lang = ''
        if(formInput.fr){
            lang='french'
        }
        else if(formInput.sp){
            lang='spanish'
        }
        else if(formInput.jpn){
            lang='japanese'
        }
        return lang
    }

    function handleSubmit(e){
        e.preventDefault()
        if(isLangSelected()&&textInput.length!==0){
            console.log('page2')
            const lang = translationLang()
            responseTxt(textInput, lang)
            setAreFieldsEmpty(false)
            setShowResults(true)
        }
        else {
            console.log('page1')
            setAreFieldsEmpty(true) // render error message to complete fields}
        }
    }

    function handleChange(e){
        setTextInput(e.target.value)
    }

    function handleStartOver(){
        console.log('page1')
        setShowResults(false)
        setTextInput('')
        setFormInput({fr:false, sp:false, jpn:false})
        setTranslationInput('')
    }

    const renderBodySection = ()=>{
        if(showResults){
            return (<>
              <p className='blue-title'>Original text 👇</p>
              <textarea 
              className='text-area'
              value={textInput}
              onChange={(event)=>{handleChange(event)}}
              />
              <p className='blue-title'>Your translation 👇</p>
              <textarea 
              className='text-area'
              value={translationInput}
              onChange={(event)=>{handleChange(event)}}
              />
              <button 
              className='submit-btn'
              onClick={(event)=>{handleStartOver(event)}}
              >Start over</button>
            </>)
        }
        else {
          return(
            <>
              <p className='blue-title'>Text to Translate 👇</p>
              <textarea 
              className='text-area'
              value={textInput}
              onChange={(event)=>{handleChange(event)}}
              />
              <p className='blue-title'>Select language 👇</p>
              <Form 
              formInput={formInput}
              setFormInput={setFormInput}/>
              <button 
              className='submit-btn'
              onClick={(event)=>{handleSubmit(event)}}
              >Translate</button>
            </>
          )
        }
      }

      return(
        <section className='body-section'>
            {renderBodySection()}
        </section>
      )
}