import React,{Component} from 'react'

class Options extends Component {
   constructor (props) {
     super(props)
     this.state = {
       name : '',
       email : '',
       password : '',
       country : '',
       age : null,
       gender : ''
     }
   }
}

export default Options