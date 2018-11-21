import React from 'react'
import {Container,Input,Button} from 'mdbreact'
import {Form,Field} from 'react-final-form'
import {required,email,password} from '../utils/validation'

const LoginForm = ({
   onSubmit,
   onLoginChange,
   onPasswordChange,
   error
}) => {
    return (
      <Form onSubmit={onSubmit}
            render={({
              handleSubmit,
              reset,
              submitting,
              pristine
            }) =>
              <Container className='authorization-container'>
                <form className='authorization-form'
                      onSubmit={handleSubmit}>
                  <p className="text-center">
                    <h1>Sign in</h1>
                  </p>
                  <div className="h1">
                    <Field name='email'
                           validate={email}>
                      { ({input , meta}) =>
                        <Input label="Type Your Email"
                               icon="envelope"
                               group type="email"
                               validate error="wrong"
                               success="right">
                          {meta.error && meta.touched &&  <span>{meta.error}</span>}
                        </Input>
                        }}
                    </Field>
                    <Input label="Type Your Password" icon="lock" group type="password" validate/>
                   </div>
                   <div className="text-center">
                     <Button className='btn-lg'>Login</Button>
                   </div>
                 </form>
              </Container>}
      />
    )
}

export default LoginForm;