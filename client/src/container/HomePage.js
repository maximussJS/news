import React,{Component} from 'react'
import Header from '../components/Header'
import Content from '../components/Content'

class HomePage extends Component {
  render() {
     return (
       <div>
          <Header/>
         <br/><br/>
          <Content/>
       </div>
     )
  }
}

export default HomePage