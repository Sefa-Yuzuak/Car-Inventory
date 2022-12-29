import React from 'react'
import { Button, Container } from 'react-bootstrap'

const NotFound = () => {
  return (
    <Container 
      style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
  }}>
      <Container className='mt-5 d-block justify-content-start '>
          <h1 class="display-1">404</h1>
          <h3>This page could not be found...</h3>
      </Container>
      <hr></hr>
      <Container className=' d-flex justify-content-end'>
        <Button href='/' size='md' className='btn btn-secondary'>Home</Button>
      </Container>
    </Container>
  )
  
}

export default NotFound