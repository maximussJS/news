import React from 'react';
import {Button,Card,CardBody,CardImage,CardTitle,CardText,Col} from 'mdbreact';

const style = {
   width: '27rem'
}

const New = ({
  item
}) =>
      <Col>
        <Card style={style}>
          <CardImage
            className="img-fluid"
            src={item.image}
            waves/>
          <CardBody>
            <CardTitle>
              <h1>{item.title}</h1>
            </CardTitle>
            <CardText>
              <h2>{item.description}</h2>
            </CardText>
            <Button className='btn-lg btn-info'
                    href={item.url}>
              Read more
            </Button>
          </CardBody>
        </Card>
      </Col>

export default New;