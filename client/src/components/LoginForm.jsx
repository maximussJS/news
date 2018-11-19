import React from 'react'
import {Container,Input,Button} from 'mdbreact'

const LoginForm = () =>  {
    return (
      <Container className='authorization-container'>
            <form className='authorization-form' >
              <p className="text-center">
                <h1>Sign in</h1>
              </p>
              <div className="h1">
                <Input label="Type Your Email" icon="envelope" group type="email" validate error="wrong" success="right"/>
                <Input label="Type Your Password" icon="lock" group type="password" validate/>
              </div>
              <div className="text-center">
                <Button className='btn-lg'>Login</Button>
              </div>
            </form>
      </Container>
    )
}

export default LoginForm;