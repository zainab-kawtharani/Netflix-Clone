import React from 'react';
import images from '../constant';
import styled from 'styled-components';

const Container =styled.div`
  height: 100vh;
  width: 100vw;
  img{
    height:100vh;
    width:100vw;
  }
`

const BackgroundImage = () => {
  return (
    <Container>
      <img src={images.login} alt='background'/>
    </Container>
    
  )
}

export default BackgroundImage;
