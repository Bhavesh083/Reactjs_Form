import React,{useState} from 'react'
import {useForm} from 'react-hook-form';
import './App.css';


function App() {

  const [peye, setPeye] = useState(false);
  const [cpeye, setCpeye] = useState(false);

  const {register,handleSubmit,errors,watch } = useForm({});

  const cp = watch("password",'');

  const changePeye = () =>{
    setPeye(!peye);
  }
  const changeCpeye = () =>{
    setCpeye(!cpeye);
  }

  const onSubmit = (data) => {
      console.log(data);
  }

  return (
    <div className='bg-form'>
         <form className='form' onSubmit={handleSubmit(onSubmit)} >
              <span>SignUp</span>


              <label>Your Full Name</label>
              <input name='fullname' placeholder='Enter Your Full Name' type='text'  ref={register({required:true})} />
              {errors.fullname && <p className='error'>
              <i className="fas fa-exclamation-circle"></i>Full name is required</p>}
              

              <label>Your Email Address</label>
              <input  name='email' placeholder='Enter Email Address' type='email'  ref={register({required:true})}   />
              {errors.email && <p className='error'>
              <i className="fas fa-exclamation-circle"></i> Email is required
              </p>}

              <label>Password</label>
              <div><input type={peye?'text':'password'} name='password'  placeholder='Enter Password'   ref={register({required:true,
                 pattern : { 
                 value : /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[!@#$%^&*_-]).{8,}$/ ,   
                 message: "Your password must have at least 8 characters, one of each of the following: uppercase character (A-Z), lowercase character (a-z), digit (0-9), and symbol (any non-alphanumeric character)", 
             } 
             })} />{peye?<i onClick={changePeye} className="fas fa-eye"></i>:<i onClick={changePeye} className="fas fa-eye-slash"></i>}</div>
              {errors.password?.type === "pattern" && <p className='error'> 
              <i className="fas fa-exclamation-circle"></i>{errors.password.message}  
              </p>}
              {errors.password?.type === "required" && <p className='error'>
              <i className="fas fa-exclamation-circle"></i>Password is required
              </p>}

              <label>Confirm password</label>
              <div><input  name='confirmPassword' placeholder='Confirm your password' type={cpeye?'text':'password'}  ref={register({required:true,
                      validate : value => value === cp || "Did not match" ,
              })}/>{cpeye?<i onClick={changeCpeye} className="fas fa-eye"></i>:<i onClick={changeCpeye} className="fas fa-eye-slash"></i>}</div>
              {errors.confirmPassword?.type === "validate" && <p className='error'>
              <i className="fas fa-exclamation-circle"></i>{errors.confirmPassword.message}
              </p>}
              {errors.confirmPassword?.type === "required" && <p className='error'>
              <i className="fas fa-exclamation-circle"></i>Confirm your password
              </p>}
              
                <button>Signup</button>
         </form>
    </div>
  )
}

export default App
