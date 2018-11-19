import React from 'react'
import {Container,Input,Button} from 'mdbreact'

const RegisterForm = () => {
    return (
      <Container className='authorization-container'>
            <form className='authorization-form'>
              <p className="text-center">
                <h1>Sign up</h1>
              </p>
              <div className="h1-responsive">
                <Input label="Your Name"
                       icon="user"
                       group type="text"
                       validate error="wrong"
                       success="right"/>
                <Input label="Your Email"
                       icon="envelope"
                       group type="email"
                       validate error="wrong"
                       success="right"/>
                <Input label="Confirm Your Email"
                       icon="exclamation-triangle"
                       group type="text"
                       validate error="wrong"
                       success="right"/>
                <Input label="Your Password"
                       icon="lock"
                       group type="password"
                       validate/>
                <Input label="Confirm Your Password"
                       icon="exclamation-triangle"
                       group type="password"
                       validate error="wrong"
                       success="right"/>
              </div>
              <div className="text-center">
                <Button className='btn-lg'
                        color="primary">
                  Register
                </Button>
              </div>
            </form>
      </Container>
    )
}

export default RegisterForm;