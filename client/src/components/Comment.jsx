import React from 'react'
import propTypes from 'prop-types'
import {MDBListGroupItem,MDBBadge,MDBBtn,MDBBtnGroup} from 'mdbreact'


const Comment = ({
    item,
    user,
    edit,
    onEditClick,
    onTextChange,
    onCancelClick,
    onDeleteClick,
    onSubmit
}) =>
    <MDBListGroupItem className="d-flex align-items-center">
        <textarea cols={60}
                  rows={1}
                  onChange={onTextChange}
                  disabled={edit !== item.id}>
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
                            onClick={edit === item.id ? () => onSubmit(item.id)
                                                      : () => onEditClick(item.id)}>
                        {edit === item.id ? 'Save' : 'Edit'}
                    </MDBBtn>
                    <MDBBtn color='dark'
                            onClick={edit === item.id ? () => onCancelClick()
                                                      : () => onDeleteClick(item.id)} >
                        {edit === item.id ? 'Cancel' : 'Delete'}
                    </MDBBtn>
                </MDBBtnGroup>
            </div>
            : ''
        }
    </MDBListGroupItem>


Comment.propTypes = {
    item : propTypes.object.isRequired,
    user : propTypes.string.isRequired,
    edit : propTypes.number.isRequired,
    onEditClick : propTypes.func.isRequired,
    onSubmit : propTypes.func.isRequired,
    onCancelClick : propTypes.func.isRequired,
    onDeleteClick : propTypes.func.isRequired,
    onTextChange : propTypes.func.isRequired
}


export default Comment