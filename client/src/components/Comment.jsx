import React from 'react'
import propTypes from 'prop-types'
import {MDBListGroupItem,MDBBadge,MDBBtn,MDBBtnGroup} from 'mdbreact'


const Comment = ({
    item,
    user,
    onEditClick
}) =>
    <MDBListGroupItem className="d-flex align-items-center">
        <textarea cols={60}
                  rows={1}
                  disabled>
            {item.text}
        </textarea>
        <MDBBadge className='my-badge'
                  color="success"
                  class='space'
                  pill>
           by  <a href={`/user/${item.email}`}>
                {item.author}
               </a> at {item.created}
        </MDBBadge>
        {user === item.email ?
            <div>
                <MDBBtnGroup size='lg'>
                    <MDBBtn color='primary'
                            onClick={onEditClick}>
                        Edit
                    </MDBBtn>
                    <MDBBtn color='dark'>
                        Delete
                    </MDBBtn>
                </MDBBtnGroup>
            </div>
            : ''
        }
    </MDBListGroupItem>


Comment.propTypes = {
    item : propTypes.object.isRequired,
    user : propTypes.string.isRequired,
    onEditClick : propTypes.func.isRequired
}


export default Comment