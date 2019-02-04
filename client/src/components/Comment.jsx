import React from 'react'
import propTypes from 'prop-types'
import {MDBListGroupItem,MDBBadge} from 'mdbreact'


const Comment = ({
    item
}) =>
    <MDBListGroupItem className="d-flex justify-content-between align-items-center">
        {item.text}
        <MDBBadge color="primary"
                  pill>
            {item.author}
        </MDBBadge>
    </MDBListGroupItem>


Comment.propTypes = {
    item : propTypes.object.isRequired
}


export default Comment