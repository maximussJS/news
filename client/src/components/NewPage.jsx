import React from 'react'
import {Container,MDBCard,MDBCardBody,MDBRow,MDBCol,MDBView,MDBMask,MDBIcon, MDBBtn} from 'mdbreact'
import propTypes from 'prop-types'


const NewPage = ({
    item,
    error,
    isLoading,
    isAuthor,
    onEditClick,
    onDeleteClick
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
                              <MDBCol lg='5'>
                                 <MDBView className="rounded z-depth-2 mb-lg-0 mb-4"
                                          hover
                                          waves>
                                     <img className="img-fluid"
                                          src={`${item.image}`}
                                          alt=""/>
                                          <a href="#">
                                              <MDBMask overlay="white-slight"/>
                                          </a>
                                 </MDBView>
                              </MDBCol>
                              <MDBCol lg="7">
                                  <h2 className="font-weight-bold mb-3 text-center">
                                      <MDBIcon icon="utensils"
                                               className="pr-2"/>
                                      {item.title}
                                  </h2>
                                  <hr/>
                                  <h3>
                                      {item.text}
                                  </h3>
                                  <hr/>
                                   <h2>
                                       Written by :
                                       <a href={`/user/${item.email}`}>
                                               <b>
                                                   {item.name}
                                               </b>
                                           email :
                                           <strong>
                                               {item.email}
                                           </strong>
                                       </a>
                                       <hr/>
                                       <h5>
                                           at {item.created}
                                       </h5>
                                   </h2>
                                  <hr/>
                                  { isAuthor ?
                                      <div align="center">
                                          <MDBBtn color="green"
                                                  size="lg"
                                                  className="mb-lg-0 mb-4 waves-light"
                                                  onClick={onEditClick}>
                                              Edit
                                          </MDBBtn>
                                          <MDBBtn color="red"
                                                  size="lg"
                                                  className="mb-lg-0 mb-4 waves-light"
                                                  onClick={onDeleteClick}>
                                              Delete
                                          </MDBBtn>
                                      </div>
                                      :
                                      ''
                                  }
                              </MDBCol>
                          </MDBRow>
                      </MDBCardBody>
                </MDBCard>
            </Container>
        }
    </div>


NewPage.propTypes = {
    item : propTypes.object.isRequired,
    error : propTypes.string.isRequired,
    isLoading : propTypes.bool.isRequired,
    isAuthor : propTypes.bool.isRequired,
    onEditClick : propTypes.func.isRequired,
    onDeleteCLick : propTypes.func.isRequired
}


export default NewPage