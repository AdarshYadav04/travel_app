import "./Auth.css"
import { useAuth } from "../../Context/auth-context"


import "../../utils/email-regex"
import"../../utils/name-regex"
import"../../utils/number-regex"
import "../../utils/password-regex"
import validateNumber from "../../utils/number-regex"
import validateName from "../../utils/name-regex"
import validateEmail from "../../utils/email-regex"
import validatePassword from "../../utils/password-regex"
import { useToast } from "@chakra-ui/react"
import axios from "axios"


let isNameValid,isNumberValid,isEmailValid,isPasswordValid,isConfirmPasswordValid
const AuthSignup=()=>{
    const toast=useToast()
    const {number,username,email,password,confirmPassword,authDispatch}=useAuth()
    const handleNumberChange=(event)=>{
        isNumberValid=validateNumber(event.target.value)
        if(isNumberValid){
            authDispatch({
                type:"NUMBER",
                payload:event.target.value
            })
        }
    }
    const handleNameChange=(event)=>{
        isNameValid=validateName(event.target.value)
        if(isNameValid){
            authDispatch({
                type:"NAME",
                payload:event.target.value
            })
        }
        

    }
    
    const handleEmailChange=(event)=>{
        isEmailValid=validateEmail(event.target.value)
        if(isEmailValid){
            authDispatch({
                type:"EMAIL",
                payload:event.target.value
            })

        }

    }
    const handlePasswordChange=(event)=>{
        isPasswordValid=validatePassword(event.target.value)
        if(isPasswordValid){
            authDispatch({
                type:"PASSWORD",
                payload:event.target.value
            })

        }

    }
    const handleConfirmPasswordChange=(event)=>{
        isConfirmPasswordValid=validatePassword(event.target.value)
        if(isConfirmPasswordValid){
            authDispatch({
                type:"CONFIRM_PASSWORD",
                payload:event.target.value
            })
        }
    }
    const handleFormSubmit=async(event)=>{
       email.preventDefault()
        if(!number || !username || !password || !email || !confirmPassword){
        toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        return;
        }
        if(password!==confirmPassword){
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;

        }
        if (isNumberValid && isPasswordValid && isNameValid) {
        try {
            const{data}= await axios.post(`http://localhost:3500/api/auth/register`,{
                username:username,
                number:number,
                email:email,
                password:password,
            })
            console.log(data)
            toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            authDispatch({
                type:"CLEAR_USER_DATA"
            })
            
        } catch (error) {
            console.log(error)
            toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
            });
            
            }  

        };
        
    }
    return(
        <div className="auth-container">
            <form onSubmit={handleFormSubmit}>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Mobile Number<span className="asterisk">*</span></label>
                    <input defaultValue={number} className="auth-input" maxLength="10" placeholder="Enter Mobile Number" type="number" required onChange={handleNumberChange}/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Name<span className="asterisk">*</span></label>
                    <input defaultValue={username} className="auth-input" placeholder="Enter Name" required onChange={handleNameChange}/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Email<span className="asterisk">*</span></label>
                    <input defaultValue={email} className="auth-input" placeholder="Enter Email" type="email" required  onChange={handleEmailChange}/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Password<span className="asterisk">*</span></label>
                    <input defaultValue={password} className="auth-input" placeholder="Enter Password" type="password" required onChange={handlePasswordChange}/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Confirm Password<span className="asterisk">*</span></label>
                    <input defaultValue={confirmPassword} className="auth-input" placeholder="Enter Password" type="password" required onChange={handleConfirmPasswordChange}/>
                </div>
                <div>
                    <button className="button btn-primary btn-login cursor">Submit</button>
                </div>
            </form>

        </div>
    )
}
export default AuthSignup