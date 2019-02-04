import React from 'react'
import propTypes from 'prop-types'
import {Container,MDBCard,MDBCardBody,MDBCol,MDBRow,MDBView} from 'mdbreact'


const Profile = ({
    item
}) =>
    <Container className='container'>
         <MDBCard className="my-5 px-5 pb-5">
             <MDBCardBody>
                 <MDBRow>
                     <MDBCol lg="12"
                             className='text-center'>
                         <img className="center-block"
                              height={200}
                              width={200}
                              src={`${item.ava_url}`}
                              alt="image"/>
                         <hr/>
                         <h2 className='response'>
                             Name : {item.name}
                         </h2>
                         <h2>
                             Email : {item.email}
                         </h2>
                         <h2>
                             Age : {item.age}
                         </h2>
                         <h2>
                             Country : {item.country}
                         </h2>
                         <h2>
                             Gender : {item.gender ? 'Male' : 'Female'}
                         </h2>
                     </MDBCol>
                 </MDBRow>
             </MDBCardBody>
         </MDBCard>
    </Container>


Profile.propTypes = {
    item : propTypes.object.isRequired,
}


export default Profile