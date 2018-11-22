import React from 'react'
import {Container,Input,Button} from 'mdbreact'

const RegisterForm = ({
   onSubmit,
   onNameChange,
   onEmailChange,
   onConfirmEmailChange,
   onPasswordChange,
   onConfirmPasswordChange,
   onAgeChange,
   onCountryChange,
   onReset,
   isLoading,
   name,
   email,
   confirmEmail,
   password,
   confirmPassword,
   age,
   country,
   error
}) => {
    return (
      <Container className='authorization-container'>
            <form className='authorization-form'
                  onSubmit={onSubmit}>
              <h1 className="text-center">
                Sign up
              </h1>
              <div className="h1-responsive">
                <Input label="Your Name"
                       icon="user"
                       group type="text"
                       validate error="wrong"
                       success="right"
                       maxLength="16"
                       minLength="2"
                       value={name}
                       required
                       onChange={onNameChange}/>
                <Input label="Your Email"
                       icon="envelope"
                       group type="email"
                       validate error="wrong"
                       success="right"
                       maxLength="20"
                       minLength="8"
                       value={email}
                       required
                       onChange={onEmailChange}/>
                <Input label="Confirm Your Email"
                       icon="exclamation-triangle"
                       group type="text"
                       validate error="wrong"
                       success="right"
                       maxLength="20"
                       minLength="8"
                       value={confirmEmail}
                       required
                       onChange={onConfirmEmailChange}/>
                <Input label="Your Password"
                       icon="lock"
                       group type="password"
                       validate
                       maxLength="20"
                       minLength="8"
                       value={password}
                       required
                       onChange={onPasswordChange}/>
                <Input label="Confirm Your Password"
                       icon="exclamation-triangle"
                       group type="password"
                       validate error="wrong"
                       success="right"
                       maxLength="20"
                       minLength="8"
                       value={confirmPassword}
                       required
                       onChange={onConfirmPasswordChange}/>
                <Input label="Your Age"
                       icon="male"
                       type="number"
                       value={age}
                       validate
                       max='70'
                       min='6'
                       required
                       onChange={onAgeChange}/>
                <Input label="Your country"
                       group text="text"
                       icon="flag"
                       validate error="wrong"
                       success="right"
                       maxLength="16"
                       minLength="4"
                       value={country}
                       required
                       onChange={onCountryChange}/>
                {error ? <span className='text-danger h4'>{error}</span> : undefined }
              </div>
              <div className="text-center">
                <Button className='btn-lg'
                        type="submit"
                        color="primary"
                        disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Register'}
                </Button>
                <Button className='btn-lg'
                        type="button"
                        color="white"
                        onClick={onReset}
                        disabled={isLoading}>
                  Reset
                </Button>
              </div>
            </form>
      </Container>
    )
}

export default RegisterForm;