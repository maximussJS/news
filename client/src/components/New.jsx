import React from 'react';
import {Button,Card,CardBody,CardImage,CardTitle,CardText,Col} from 'mdbreact';
import PropTypes from 'prop-types'


const New = ({
   item
}) =>
    <Col>
        <Card className='card-style'>
            <CardImage className="img-fluid"
                       src={item.image}
                       waves/>
            <CardBody>
                <CardTitle>
                    <h1>{item.title}</h1>
                </CardTitle>
                <CardText>
                    <h2>{item.text}</h2>
                </CardText>
                <Button className='btn-lg btn-info'
                        href={`/new/${item.url}`}>
                    Read more
                </Button>
            </CardBody>
        </Card>
    </Col>


New.propTypes = {
    item : PropTypes.object.isRequired
}


export default New;