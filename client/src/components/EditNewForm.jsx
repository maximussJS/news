import React from 'react'
import PropTypes from 'prop-types'
import {Container,MDBInput,MDBCard,MDBCardBody,MDBCol,MDBRow,MDBView,MDBBtn} from 'mdbreact'


const EditNewForm = ({
    isLoading,
    onSubmit,
    onTitleChange,
    onTextChange,
    onImageChange,
    onBackClick,
    title,
    text,
    image,
    error
}) =>
   <div>
       {isLoading ?
          <h1>
            Loading...
          </h1> :
          <Container className='container'>
                <MDBCard className="my-5 px-12 pb-5">
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol lg="5">
                                <MDBView className="rounded z-depth-2 mb-lg-0 mb-4"
                                         hover
                                         waves>
                                    <img className="img-fluid"
                                         src={`${image}`}
                                         alt=""/>
                                </MDBView>
                            </MDBCol>
                            <MDBCol lg="7">
                                <form encType='multipart/form-data'>
                                    <h3 className='text-center'>
                                        Here you can edit post
                                    </h3>
                                    <MDBInput label='Edit title'
                                              size='lg'
                                              maxLength="60"
                                              minLength="4"
                                              value={title}
                                              icon="user"
                                              onChange={onTitleChange}/>
                                    <hr/>
                                    <MDBInput type="textarea"
                                              label="Edit text"
                                              size='lg'
                                              value={text}
                                              minLength='15'
                                              rows="6"
                                              icon="edit"
                                              onChange={onTextChange}/>
                                    <hr/>
                                    <h4 className='text-center'>
                                        Chose new image
                                    </h4>
                                    <MDBInput type='file'
                                              icon='camera'
                                              onChange={onImageChange}/>
                                    <hr/>
                                    {error ?
                                         <span className='text-danger h4'>
                                             {error}
                                         </span>
                                         : ''
                                    }
                                    <div align="center">
                                         <MDBBtn color="success"
                                                 size="lg"
                                                 className="waves-light center"
                                                 onClick={onSubmit}
                                                 disabled={isLoading}>
                                             {isLoading ? 'Loading' : 'Save'}
                                         </MDBBtn>
                                         <MDBBtn color="success"
                                                 size="lg"
                                                 className="waves-light center"
                                                 onClick={onBackClick}
                                                 disabled={isLoading}>
                                             {isLoading ? 'Loading' : 'Back'}
                                         </MDBBtn>
                                     </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
          </Container>
       }
   </div>


EditNewForm.propTypes = {
    isLoading : PropTypes.bool.isRequired,
    onSubmit : PropTypes.func.isRequired,
    onImageChange : PropTypes.func.isRequired,
    onTitleChange : PropTypes.func.isRequired,
    onTextChange : PropTypes.func.isRequired,
    onBackClick : PropTypes.func.isRequired,
    title : PropTypes.string.isRequired,
    image : PropTypes.string.isRequired,
    text : PropTypes.string.isRequired,
    error : PropTypes.string.isRequired
}


export default EditNewForm