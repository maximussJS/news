import React,{Component} from 'react'
import {getNewsArray} from '../utils/requests'
import ContentComponent from '../components/Content'


export default class Content extends Component {
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
                        const response = await getNewsArray()
                        response.success ? this.setState({
                            news: response.data,
                            isLoading: false
                        }) : this.setState({
                            error : response.message,
                            isLoading : false
                        })
                    }
                    catch(e) {
                        this.setState({
                            isLoading: false,
                            error: e.message
                        })
                    }
                }
            )
        }
    }

    render () {
        return (
            <ContentComponent items={this.state.news}
                              loading={this.state.isLoading}
                              error={this.state.error}/>
        )
    }
}