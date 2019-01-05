import React from 'react';
import {Button,Card,CardBody,CardImage,CardTitle,CardText,Col} from 'mdbreact';
import PropTypes from 'prop-types'

const New = props => {
  const {image,title,text,url} = props.item
  return (
    <Col>
      <Card className='card-style'>
        <CardImage className="img-fluid"
                   src={image}
                   waves/>
        <CardBody>
          <CardTitle>
            <h1>{title}</h1>
          </CardTitle>
          <CardText>
            <h2>{text}</h2>
          </CardText>
          <Button className='btn-lg btn-info'
                  href={url}>
            Read more
          </Button>
        </CardBody>
      </Card>
    </Col>
  )
}

New.propTypes = {
   item : PropTypes.object.isRequired
}

export default New;