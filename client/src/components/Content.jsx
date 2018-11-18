import React from 'react'
import {Container} from 'mdbreact'
import New from './New'

const container = {
  height: 1200,
  marginTop : 40
}

let a = {
  title : 'NEW',
  description : 'Hadasfasfasfasff',
  url : 'adasdasd',
  avaUrl : 'https://res.cloudinary.com/maximuss/image/upload/v1541690540/wp3mopgb7v7iqjqwz4uv.jpg'
}
const Content = () =>
  <Container style={container} className="text-center">
    <div className='row col-md-12'>
   <New item={a}/>
    </div>
  </Container>

export default Content