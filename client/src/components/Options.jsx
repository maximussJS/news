import React from 'react'
import {Container,MDBInput,FormInline,Button} from 'mdbreact'
import PropTypes from 'prop-types'

const OptionForm = (props) => {
  const {onSubmit,onNameChange,onEmailChange,onPasswordChange,onNewPasswordChange,onAgeChange,onCountryChange,
         onGenderChange,name,email,password,country,age,gender,newPassword,isLoading,error} = props
    return (
      <Container className='container-form'>
        <h1 className='text-center'>
          Here you can change your account settings :
        </h1>
        <form className='option-form'
              onSubmit={onSubmit}>
          <MDBInput label='Change name'
                    size='lg'
                    value={name}
                    maxLength="20"
                    minLength="8"
                    icon="user"
                    onChange={onNameChange}/>
          <hr/>
          <MDBInput label='Change email'
                    size='lg'
                    icon="envelope"
                    maxLength="20"
                    minLength="8"
                    value={email}
                    onChange={onEmailChange}/>
          <hr/>
          <MDBInput label='Old password'
                    size='lg'
                    icon="lock"
                    maxLength="20"
                    minLength="8"
                    value={password}
                    type='password'
                    onChange={onPasswordChange}/>
          <hr/>
          <MDBInput label='New password'
                    size='lg'
                    icon='lock'
                    maxLength="20"
                    minLength="8"
                    value={newPassword}
                    onChange={onNewPasswordChange}/>
          <hr/>
          <MDBInput label='Change country'
                    size='lg'
                    icon='flag'
                    maxLength="10"
                    minLength="3"
                    value={country}
                    onChange={onCountryChange}/>
          <hr/>
          <MDBInput label="Change Age"
                    icon="male"
                    type="number"
                    value={age}
                    validate
                    size='lg'
                    max='70'
                    min='6'
                    onChange={onAgeChange}/>
          <hr/>
          <FormInline >
            <MDBInput onClick={() => onGenderChange(1)}
                      checked={gender === 1}
                      icon='male'
                      type="radio"
                      size='lg'
                      id="radio1"/>
            Male
            <mytag className="mytag">
              wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
            </mytag>
            <MDBInput onClick={() => onGenderChange(0)}
                      checked={gender === 0}
                      size='lg'
                      icon='female'
                      type="radio"
                      id="radio2"/>
            Female
          </FormInline>
          <hr/>
          {error ? <span className='text-danger h4'>{error}</span> : undefined }
          <div className="text-center">
            <Button className='btn-lg'
                    type="submit"
                    color="primary"
                    disabled={isLoading}>
              {isLoading ? 'Loading...' : 'SAVE'}
            </Button>
          </div>
        </form>
      </Container>
    )
}

OptionForm.propTypes = {
  name : PropTypes.string.isRequired,
  email : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired,
  newPassword : PropTypes.string.isRequired,
  country : PropTypes.string.isRequired,
  age : PropTypes.number.isRequired,
  gender : PropTypes.number.isRequired,
  isLoading : PropTypes.bool.isRequired,
  error : PropTypes.string.isRequired,
  onSubmit : PropTypes.func.isRequired,
  onNameChange : PropTypes.func.isRequired,
  onEmailChange : PropTypes.func.isRequired,
  onPasswordChange : PropTypes.func.isRequired,
  onNewPasswordChange : PropTypes.func.isRequired,
  onAgeChange :PropTypes.func.isRequired,
  onCountryChange : PropTypes.func.isRequired,
  onGenderChange : PropTypes.func.isRequired
}

export default OptionForm