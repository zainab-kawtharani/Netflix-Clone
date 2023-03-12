import React, { useState } from 'react';
import images from '../constant';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {BackgroundImage, Header} from '../components';
import {firebaseAuth} from '../utils/firbase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const StyledDiv=styled.div`

   
   position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;

    grid-template-rows: 15vh 85vh;
    .body{
      gap: 1rem;
      .text{
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        .h1{
          padding: 0 25rem;

        }
      }
      .form{

        display:grid;
        

        width:60;
        input{
          color:black;
          border:none;
          padding: 1.5rem;
          font-size:1.2rem;
          border: 1px solid black;
          &:focus{
            outline: none;
          }
        }
        button{
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          border-radius: 0.2rem;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button{
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
   
  
`

const Signup = () => {
  const navigate= useNavigate();
  const [showPassword,setShowPassword]=useState(false);
  const [formValue,setFormValue]=useState(
    {
      email : "",
      password: "",
    }
  );
  const handleSignUp= async ()=>{
    try{
      const {email, password} =formValue;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);


    } catch(err){
      console.log(err);

    }
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
      if(currentUser) navigate('/');
    })
  }
  return (

    <StyledDiv >
      <BackgroundImage/>
      <div className='content'>
        <Header/>
        <div  className='body flex column a-center j-center'>
          <div className='text flex column'>
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere, cancil anytime</h4>
            <h6>
              Ready to watch? Enter email to create or to start a membership
            </h6>
          </div>
          <div className='form'>
            <input 
               type='email' 
               placeholder='Email Address'
               name='email'
               value={formValue.email} 
               onChange={(e)=>setFormValue({...formValue,[e.target.name]:e.target.value,})}
                />
            { showPassword && 
              <input 
                type='password' 
                placeholder='Password' 
                name='password'
                value={formValue.password} 
                onChange={(e)=>setFormValue({...formValue,[e.target.name]:e.target.value,})}
               
                />}
            { !showPassword  && <button onClick={()=>setShowPassword(true)}> Get Started</button>}
          </div>
            {showPassword && <button onClick={handleSignUp}> Signup </button>} 
        </div>
      </div>
    </StyledDiv>
  )
}


export default Signup;
/*
at form
grid-template-columns:${({showPassword})=>
          showPassword? "1fr 1fr": "2fr 1fr"
        }
 */