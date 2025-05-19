// 


// import { Promt } from "../model/promt.model.js";

// const openai = new OpenAI({
//         baseURL: 'https://api.deepseek.com',
//         apiKey: process.env.OPENAI_API_KEY
// });
// console.log("openai",openai.apikey);
// export const sendPromt= async(req,res)=>{
//     const {content} = req.body;
//     console.log("promt sending ...");

// if(!content||content.trim().length===""){
//         return res.status(400).json({error:"Please provide a prompt"});
//     }
//     try{
//         // userPromt  me promt save kra 
//         const userPromt=await Promt.create({
//             role:"user",
//             content
//         })


//         const completion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: content }],
//     model: "deepseek-chat",
//   });


//   const aiContent=completion.choices[0].message.content;
//       const aiMessage=await Promt.create({
//             role:"user",
//             content:aiContent
//         })
//        return res.status(200).json({reply :aiContent});
//     }catch(error){
//         console.log("Error in sendPromt function",error);
//         return res.status(500).json({error:"something went wrongn with AI response "});
//     }

// };

import axios from "axios";
import { Promt } from "../model/promt.model.js";

const OLLAMA_URL = "http://localhost:11434/api/generate"; // default Ollama chat endpoint
const MODEL_NAME = "deepseek-r1:1.5b"; // or whatever model you pulled in Ollama

export const sendPromt = async (req, res) => {
  const { content } = req.body;
  const userId=req.userId;
  console.log("Prompt sending...");

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: "Please provide a prompt" });
  }

  try {
    // Save user prompt
    const userPrompt = await Promt.create({
      userId,
      role: "user",
      content,
    });

    // Send request to Ollama local API
    const ollamaResponse = await axios.post(OLLAMA_URL, {
      model: MODEL_NAME,
      prompt: userPrompt.content,
      stream: false,
    });

    const aiContent = ollamaResponse.data.response;
    console.log("AI response:", aiContent);

    // Save AI response
    const aiMessage = await Promt.create({
      userId,
      role: "assistant",
      content: aiContent,
    });

    return res.status(200).json({ reply: aiContent });
  } catch (error) {
    console.error("Error in sendPromt function", error.message || error);
    return res.status(500).json({ error: "Something went wrong with AI response" });
  }
}; 