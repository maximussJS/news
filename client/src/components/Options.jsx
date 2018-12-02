import React from 'react'
import {Container,MDBInput,FormInline,Button} from 'mdbreact'
import PropTypes from 'prop-types'

const OptionForm = (props) => {
  const {name,email,password,country,age,gender,newPassword,isLoading,error} = props
    return (
      <Container className='container-form'>
        <h1 className='text-center'>
          Here you can change your account settings :
        </h1>
        <form className='option-form'>
          <MDBInput label='Change name'
                    size='lg'
                    value={name}
                    maxLength="20"
                    minLength="8"
                    icon="user"/>
          <MDBInput label='Change email'
                    size='lg'
                    icon="envelope"
                    maxLength="20"
                    minLength="8"
                    value={email}/>
          <MDBInput label='Old password'
                    size='lg'
                    icon="lock"
                    maxLength="20"
                    minLength="8"
                    value={password}
                    type='password'/>
          <MDBInput label='New password'
                    size='lg'
                    icon='lock'
                    maxLength="20"
                    minLength="8"
                    value={newPassword}/>
          <MDBInput label='Change country'
                    size='lg'
                    icon='flag'
                    maxLength="10"
                    minLength="3"
                    value={country}/>
          <MDBInput label="Change Age"
                    icon="male"
                    type="number"
                    value={age}
                    validate
                    size='lg'
                    max='70'
                    min='6'/>
          <FormInline >
            <MDBInput// onClick={() => onRadioChecked(1)}
                      checked={gender === 1}
                      icon='male'
                      type="radio"
                      id="radio1"/>
            <MDBInput// onClick={() => onRadioChecked(0)}
                     checked={gender === 0}
                     icon='female'
                     type="radio"
                     id="radio2"/>
          </FormInline>
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
  confirmPassword : PropTypes.string.isRequired,
  country : PropTypes.string.isRequired,
  age : PropTypes.number.isRequired,
  gender : PropTypes.number.isRequired,
  isLoading : PropTypes.bool.isRequired,
  error : PropTypes.string.isRequired
}

export default OptionForm