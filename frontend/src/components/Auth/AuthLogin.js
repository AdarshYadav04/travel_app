import "./Auth.css";
import validateNumber from "../../utils/number-regex";
import validatePassword from "../../utils/password-regex";
import validateName from "../../utils/name-regex";
import { useAuth } from "../../Context/auth-context";


import 'react-toastify/dist/ReactToastify.css';
import { useToast } from "@chakra-ui/react";
import axios from "axios";


let isNumberValid, isPasswordValid,is,isNameValid;

const AuthLogin = () => {
  const toast=useToast()
  const { authDispatch, number, password,username,accessToken} = useAuth();

  const handleNumberChange = (event) => {
    isNumberValid = validateNumber(event.target.value);
    if (isNumberValid) {
      authDispatch({
        type: "NUMBER",
        payload: event.target.value,
      });
    }
  };
  const handleUsernameChange = (event) => {
    isNameValid= validateName(event.target.value);
    if (isNameValid) {
      authDispatch({
        type: "NAME",
        payload: event.target.value,
      });
    }
  };

  const handlePasswordChange = (event) => {
    isPasswordValid = validatePassword(event.target.value);
    if (isPasswordValid) {
      authDispatch({
        type: "PASSWORD",
        payload: event.target.value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(!number || !username || !password){
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (isNumberValid && isPasswordValid && isNameValid) {
      
      
      try {
        const{data}= await axios.post(`http://localhost:3500/api/auth/login`,{
          number:number,
          password:password
        })
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        
      
        authDispatch({
          type:"SET_ACCESS_TOKEN",
          payload:data.accessToken
        })
        
        authDispatch({
          type:"SHOW_AUTH_MODAL"
        })
        localStorage.setItem("userInfo", JSON.stringify(data));
        

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
  };

  const handleTestCredentialsClick = async () => {

    try {
      const{data}= await axios.post(`http://localhost:3500/api/auth/login`,{
        number:1234567890,
        password:"test123"
      })
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
    
      authDispatch({
        type:"SET_ACCESS_TOKEN",
        payload:data.accessToken
      })
      
      authDispatch({
        type:"SHOW_AUTH_MODAL"
      })
      localStorage.setItem("userInfo", JSON.stringify(data));
      

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

  return (
    <div className="auth-container">
      <form onSubmit={handleFormSubmit}>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Mobile Number <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={number}
            type="number"
            className="auth-input"
            maxLength="10"
            placeholder="Enter Mobile Number"
            required
            onChange={handleNumberChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Name<span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={username}
            className="auth-input"
            placeholder="Enter Name"
            required
            onChange={handleUsernameChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Password <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={password}
            className="auth-input"
            placeholder="Enter Password"
            type="password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button className="button btn-primary btn-login cursor">Login</button>
        </div>
      </form>
      <div className="cta">
        <button
          className="button btn-outline-primary cursor-pointer"
          onClick={handleTestCredentialsClick}
        >
          Login with Test Credentials
        </button>
      </div>
    </div>
  );
};

export default AuthLogin