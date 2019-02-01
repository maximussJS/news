import React,{Component} from 'react'
import Page from '../components/NewPage'
import {getNew, deleteNew} from '../utils/requests'
import {isAuthenticated, getPassword, getUserEmail, isAdmin} from '../utils/auth'


export default class NewPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item : '',
            error : '',
            isLoading : false,
            isAuthor : false
        }
        this.onEditClick = this.onEditClick.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
    }

    componentDidMount() {
        if(isAuthenticated() && getPassword() !== '') {
            if(!this.state.isLoading) {
                this.setState({
                    isLoading : true
                }, async () => {
                    try {
                        const url = this.props.match.params.url
                        if(url.length < 4) this.props.history.push('/error')
                        const response = await getNew(url)
                        if(response.success) {
                            if(response.data.email === getUserEmail() || isAdmin()) this.setState({
                                isAuthor : true,
                            })
                            this.setState({
                                item : response.data,
                                isLoading : false
                            })
                        }
                        else this.props.history.push('/error')
                    }
                    catch (e) {
                        this.props.history.push('/error')
                    }
                })
            }
        }
        else this.props.history.push('/login')
    }

    onEditClick(e) {
        alert(this.state.item)
    }

    onDeleteClick = async () => {
        try {
            this.setState({
                isLoading : true
            })
            const title = this.state.item.title
            const response = await deleteNew(title)
            response.success ? this.props.history.push('/') : this.setState({
                error : response.text,
                isLoading : false
            })
        }
        catch (e) {
            this.setState({
                error : e.message
            })
        }
    }

    render() {
        return (
            <Page item={this.state.item}
                  error={this.state.error}
                  isLoading={this.state.isLoading}
                  isAuthor={this.state.isAuthor}
                  onDeleteClick={this.onDeleteClick}
                  onEditClick={this.onEditClick}/>
        )
    }
}