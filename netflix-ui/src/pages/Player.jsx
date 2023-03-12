import React from 'react';
import styled from 'styled-components';
import {BsArrowLeft} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import video1 from "../assets/video1.mp4"

const StyledPlayer= styled.div`
.player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

`;
const Player = () => {
   const navigate =useNavigate();

   return (
    <StyledPlayer>
        <div className="player">
            <div className="back">
                <BsArrowLeft onClick={()=>{
                    navigate(-1);
                }}/>
            </div>
            <video src={video1} autoPlay loop controls muted/> 


        </div>
    </StyledPlayer>
  )
}

export default Player;
