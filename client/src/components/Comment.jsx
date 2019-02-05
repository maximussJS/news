import React from 'react'
import propTypes from 'prop-types'
import {MDBListGroupItem,MDBBadge} from 'mdbreact'


const Comment = ({
    item
}) =>
    <MDBListGroupItem className="d-flex justify-content-between align-items-center">
        {item.text}
        <MDBBadge color="success"
                  class='space'
                  pill>
           by  <a href={`/${item.author}`}>
                {item.author}
            </a>    at    {item.created}
        </MDBBadge>
    </MDBListGroupItem>


Comment.propTypes = {
    item : propTypes.object.isRequired
}


export default Comment