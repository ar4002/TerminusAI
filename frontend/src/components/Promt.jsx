import React from 'react';
import {ArrowUp,Bot,Globe,Paperclip} from "lucide-react";                                                            
 import logo from "../../public/logo.jpg"
// import React ,{useState} from "react";
function Promt() {
     const [inputValue,setInputValue]=useState("")
       const [typeMessage,setTypeMessage]=useState("")
       const handleSend=()=>{
        const trimmed=inputValue.trim()
        if(!trimmed) return
        setTypeMessage(trimmed)
        setInputValue("")
       }
 return <div>
    {/*Greeting*/}
    <div>
      <div>
        <img src={logo} alt=''/>
        <h1>Hi, I'm Terminus </h1>
      </div>
      <p> 💬How can i help you today?</p>
    </div>
    {/*promt */}
    <div >
      <div>

      </div>
    </div>
    {/* input box*/}
    <div>
      <div>
        <input type="text" 
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
         placeholder='💬Message Terminus' />
        <div>
          <div> <button> <Bot/> DeepThink ( R1)</button>
          <button> <Globe/>Search </button>
          </div>
          <div>
            <button> <Paperclip/> </button>
            <button><ArrowUp/></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
}

export default Promt