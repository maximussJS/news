import React,{Component} from 'react'
import {getNewsArray} from '../utils/requests'
import ContentComponent from '../components/Content'

class Content extends Component {
  constructor (props) {
    super(props)
    this.state = {
      news : null,
      isLoading: false,
      error: null
    }
  }

  componentDidMount () {
    if(!this.state.isLoading) {
      this.setState({
        isLoading: true
      }, async () => {
          try {
            const result = await getNewsArray()
            await this.setState({
              news: result.news,
              isLoading: false
            })
          }
          catch(e) {
            this.setState({
              isLoading: false,
              error: e
            })
          }
       }
      )
    }
  }

  render () {
    const {news,isLoading,error} = this.state
    return (
      <ContentComponent items={news}
                        loading={isLoading}
                        error={error}/>
    )
  }
}

export default Content