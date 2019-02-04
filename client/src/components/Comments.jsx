import React from 'react'
import propTypes from 'prop-types'
import Comment from 'Comment'
import {MDBListGroup,MDBContainer} from 'mdbreact'


const CommentGroup = ({
    items,
    isLoading,
    error,
}) =>
    <div>
        {isLoading ? 'Loading...'
            :
            <MDBContainer>
                <MDBListGroup className='my-list-group'>
                    {items ? items.map(key => <Comment item={key}/>) : "No comments"}
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
    error : propTypes.object
}


export default CommentGroup