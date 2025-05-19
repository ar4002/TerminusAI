import { Eye } from 'lucide-react'
import axios from 'axios' 
import React, {useState} from "react" 
import { Link,  useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

function Login() {
    const [formData, setFormData] = useState({
       
        email: "",
        password: ""

    })


    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()

    const [,setAuthUser]=useAuth();
const handleChange=(e)=>{


const value= e.target.value
const name=e.target.name
setFormData({
    ...formData,
    [name]:value
})
}
    const handleLogin = async() => {
        setLoading(true)
        setError("")
        try {
       const {data} = await axios.post("http://localhost:4002/api/v1/user/Login",{
          
            email:formData.email,
            password:formData.password,

        },{
            withCredentials:true
        })
        console.log(data)
    alert(data.message||"Login succeeded")
 localStorage.setItem("token",data.token)
    localStorage.setItem("user",JSON.stringify(data.user)) 
    
    setAuthUser(data.token); 

    
    navigate("/login")  
    }
        catch (error) {
          const msg=error?.response?.data?.errors ||"Login failed"
          setError(msg)
        }
        finally { 
            setLoading(false)

        }
    }
    


    return (
        <div className='min-h-screen flex items-center justify-center bg-black px-4'>
            <div className ='bg-[#1e1e1e] text-white w-full max-w-md rounded-2xl p-6 shadow-lg'>
                {/*Heading */}
                <h1 className='text-white items-center justify-center text-center'>Login</h1>
             
                {/* email*/}
                <div className='mb-4 mt-2'>
                    <input className='w-full bg-transparent border border-gray-600  rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none foucs:ring-2 focus:ring-[#7a6ff0]' type="text"
                        name='email'
                        placeholder='email'
                          value={formData.email}
                        onChange={handleChange}

                    />
                </div>
                {/* password*/}

                <div className='mb-4 mt-2 relative'>
                    <input className='w-full bg-transparent border border-gray-600  rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none foucs:ring-2 focus:ring-[#7a6ff0]' type="password"
                        name='password'
                        placeholder='password'
                          value={formData.password}
                        onChange={handleChange} />
                    <span className='right-3 top-3 text-gray-400 absolute'><Eye size={18} /> </span>
                </div>
                {/*error msg*/}
                     {error && <span className='text-red-600 text-sm mb-4 '>{error}</span>}
                {/*Terms & Condition*/}
                <p className='text-xs text-gray-400 mt-4 mb-6 '>By signing up or logging in, you consent to Terminus {" "}
                    <a className='undeline ' href="Terms of Use" ></a>and  <a className='underline' href="Privacy Policy"></a>.</p>

                {/*Login button*/}
                <button onClick={handleLogin} 
                disabled={loading}
                className='w-full bg-[#7a6ff6] hover:bg-[#6c61a6] text-white font-semibold py-3 rounded-lg transition disabled:opacity-50'>
                    {loading? "logging in...":"Login"}
                    </button>
                   

                {/*Links*/}
                <div className='flex justify-between mt-4 text-sm '>
                    <a className='text-[#7a6ff6] hover:underline' href="">Haven't account?</a>
                    <Link className='text-[#7a6ff6] hover:underline' to={"/signup"}> Signup  </Link>
                </div>

            </div>
        </div>
    )
}

export default Login