import React from 'react'
import {Container,Input,Button} from 'mdbreact'

const LoginForm = ({
   onSubmit,
   onLoginChange,
   onPasswordChange,
   onReset,
   login,
   password,
   isLoading
}) => {
    return (
      <Container className='authorization-container'>
          <form className='authorization-form'
                onSubmit={onSubmit}>
              <p className="text-center">
                 <h1>Sign in</h1>
              </p>
              <div className="h1">
                 <Input label="Type Your Email"
                        icon="envelope"
                        group type="email"
                        validate error="wrong"
                        success="right"
                        onChange={onLoginChange}
                        required
                        maxlength='20'
                        minlength='8'
                        value={login}>
                 </Input>
                 <Input label="Type Your Password"
                        icon="lock"
                        group type="password"
                        validate
                        onChange={onPasswordChange}
                        required
                        maxlength='20'
                        minlength='8'
                        value={password}>
                 </Input>
                   </div>
                   <div className="text-center">
                     <Button className='btn-lg'
                             color='success'
                             type='submit'
                             disabled={isLoading}>
                       Login
                     </Button>
                     <Button className='btn-lg'
                             type='button'
                             onClick={onReset}
                             disabled={isLoading}>
                         Reset
                     </Button>
                   </div>
                 </form>
              </Container>
    )
}


export default LoginForm;