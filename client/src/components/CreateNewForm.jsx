import React from 'react'
import {Button,Container,MDBInput} from 'mdbreact'
import PropTypes from 'prop-types'


const CreateNew = ({
   isLoading,
   onSubmit,
   onTitleChange,
   onTextChange,
   onImageChange,
   title,
   text,
   error
}) =>
   <div>
       {isLoading ?
          <h1>
            Loading...
          </h1> :
          <Container className='container-form'>
            <h1 className='text-center'>
              Create new post
            </h1>
              <form className='create-form col-4'
                    encType='multipart/form-data'>
                  <hr/>
                  <MDBInput label='Enter title'
                            size='lg'
                            maxLength="40"
                            minLength="4"
                            icon="user"
                            onChange={onTitleChange}/>
                  <hr/>
                  <MDBInput type="textarea"
                            label="Enter text"
                            size='lg'
                            minLength='15'
                            rows="6"
                            icon="edit"
                            onChange={onTextChange}/>
                  <hr/>
                  <MDBInput type='file'
                            icon='camera'
                            onChange={onImageChange}/>
                  <hr/>
                  {error ?
                      <span className='text-danger h4'>
                          {error}
                      </span>
                      : ''}
                  <div className="text-center">
                      <Button className='btn-lg'
                              type="button"
                              onClick={onSubmit}
                              color="primary"
                              disabled={isLoading}>
                          {isLoading ? 'Loading...' : 'Create'}
                      </Button>
                  </div>
              </form>
          </Container>
      }
    </div>


CreateNew.propTypes = {
   isLoading : PropTypes.bool.isRequired,
   onSubmit : PropTypes.func.isRequired,
   onImageChange : PropTypes.func.isRequired,
   onTitleChange : PropTypes.func.isRequired,
   onTextChange : PropTypes.func.isRequired,
   title : PropTypes.string.isRequired,
   text : PropTypes.string.isRequired,
   error : PropTypes.string.isRequired
}


export default CreateNew