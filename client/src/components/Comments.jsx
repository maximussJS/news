import React from 'react'
import propTypes from 'prop-types'
import Comment from '../components/Comment'
import {MDBBtn,MDBListGroupItem,MDBInput,MDBListGroup,MDBContainer} from 'mdbreact'


const CommentGroup = ({
    items,
    isLoading,
    error,
    user,
    onTextChange,
    onSubmit,
    onEditCommentClick
}) =>
    <div>
        {isLoading ? 'Loading...'
            :
            <MDBContainer>
                <h1>
                    Comments ({items.length}) :
                </h1>
                <MDBListGroup className='my-list-group h3-responsive'>
                    <MDBListGroupItem>
                          <MDBInput label='Write comment'
                                    size='lg'
                                    maxLength="600"
                                    minLength="1"
                                    icon="pencil"
                                    onChange={onTextChange}/>
                           <MDBBtn type='button'
                                   color='success'
                                   disabled={isLoading}
                                   onClick={onSubmit}>
                               Submit
                           </MDBBtn>
                    </MDBListGroupItem>
                    {items ?
                        items.map(key => <Comment item={key}
                                                  user={user}
                                                  onEditClick={onEditCommentClick}/>)
                        :
                        'No comments'
                    }
                </MDBListGroup>
                {error ?
                    <span className='red'>
                        {error}
                    </span>
                    : ''
                }
            </MDBContainer>
        }
    </div>


CommentGroup.propTypes = {
    items : propTypes.arrayOf(propTypes.object).isRequired,
    isLoading : propTypes.bool.isRequired,
    error : propTypes.string.isRequired,
    user : propTypes.string.isRequired,
    onTextChange : propTypes.func.isRequired,
    onSubmit : propTypes.func.isRequired,
    onEditCommentClick : propTypes.func.isRequired
}


export default CommentGroup