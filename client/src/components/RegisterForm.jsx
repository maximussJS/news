import React from 'react'
import {Container,Input,Button,FormInline} from 'mdbreact'
import PropTypes from 'prop-types'

const RegisterForm = (props) => {
    const {onSubmit,onNameChange,onEmailChange,onPasswordChange,onConfirmPasswordChange,
           onAgeChange,onCountryChange,onRadioChecked,onReset,isLoading,name,email,
           password,confirmPassword,age,country,radio,error} = props
    return (
      isLoading ?
        <h1>Loading...</h1> :
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
                     minLength="3"
                     value={country}
                     required
                     onChange={onCountryChange}/>
              <FormInline required>
                <Input
                  onClick={() => onRadioChecked(1)}
                  checked={radio === 1}
                  icon='male'
                  type="radio"
                  id="radio1"/>
                <Input
                  onClick={() => onRadioChecked(0)}
                  checked={radio === 0}
                  icon='female'
                  type="radio"
                  id="radio2"/>
              </FormInline>
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

RegisterForm.propTypes = {
  onSubmit : PropTypes.func.isRequired,
  onNameChange : PropTypes.func.isRequired,
  onEmailChange : PropTypes.func.isRequired,
  onPasswordChange : PropTypes.func.isRequired,
  onConfirmPasswordChange : PropTypes.func.isRequired,
  onAgeChange : PropTypes.func.isRequired,
  onCountryChange : PropTypes.func.isRequired,
  onRadioChecked : PropTypes.func.isRequired,
  onReset : PropTypes.func.isRequired,
  isLoading : PropTypes.bool.isRequired,
  name : PropTypes.string.isRequired,
  email :  PropTypes.string.isRequired,
  password : PropTypes.string.isRequired,
  confirmPassword : PropTypes.string.isRequired,
  age : PropTypes.number.isRequired,
  country :  PropTypes.string.isRequired,
  radio : PropTypes.number.isRequired,
  error :  PropTypes.string.isRequired
}

export default RegisterForm;