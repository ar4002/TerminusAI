import axios from "axios";

const OLLAMA_URL = "http://localhost:11434/api/generate"; // default Ollama chat endpoint
const MODEL_NAME = "deepseek-r1:1.5b"; 

const ollamaResponse = await axios.post(OLLAMA_URL, {
      model: MODEL_NAME,
      prompt: "what is javascript",
      stream: false,
    });

console.log(ollamaResponse.data.response);