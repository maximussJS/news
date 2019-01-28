import React from 'react'
import {Container,Input,Button} from 'mdbreact'
import PropTypes from 'prop-types'


const LoginForm = ({
    onSubmit,
    onEmailChange,
    onPasswordChange,
    onReset,
    email,
    password,
    isLoading,
    error
}) =>
    <Container className='authorization-container'>
        <form className='authorization-form'>
            <h1 className="text-center">
                Sign in
            </h1>
            <div className="h1">
                <Input label="Type Your Email"
                       icon="envelope"
                       group type="email"
                       validate error="wrong"
                       success="right"
                       onChange={onEmailChange}
                       required
                       maxLength='20'
                       minLength='8'
                       value={email}>
                </Input>
                <Input label="Type Your Password"
                       icon="lock"
                       group type="password"
                       validate
                       onChange={onPasswordChange}
                       required
                       maxLength='20'
                       minLength='8'
                       value={password}>
                </Input>
            </div>
            {error ?
                <span className='text-danger h4'>
                    {error}
                </span>
                : undefined
            }
            <div className="text-center">
                     <Button className='btn-lg'
                             color='success'
                             type='submit'
                             disabled={isLoading}
                             onClick={onSubmit}>
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


LoginForm.propTypes = {
  onSubmit : PropTypes.func.isRequired,
  onEmailChange : PropTypes.func.isRequired,
  onPasswordChange : PropTypes.func.isRequired,
  onReset : PropTypes.func.isRequired,
  email : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired,
  isLoading : PropTypes.bool.isRequired,
  error : PropTypes.string.isRequired
}


export default LoginForm;