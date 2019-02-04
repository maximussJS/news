import React,{Component} from 'react'
import Page from '../components/NewPage'
import Comments from '../components/Comments'
import EditNew from 'EditNew'
import {getNew, deleteNew, getNewComments} from '../utils/requests'
import {isAuthenticated, getPassword, getUserEmail, isAdmin} from '../utils/auth'


export default class NewPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item : '',
            error : '',
            comments : [],
            isLoading : false,
            isAuthor : false,
            showEditPage : false
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
                            const comment = await getNewComments(response.data.title)
                            if(comment.success) {
                                if (response.data.email === getUserEmail() || isAdmin()) this.setState({
                                    isAuthor: true,
                                })
                                this.setState({
                                    comments : comment.data,
                                    item: response.data,
                                    isLoading: false
                                })
                            }
                            else this.setState({
                                isLoading : false,
                                error : comment.text
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
        this.setState(state => ({
            showEditPage : !state.showEditPage
        }))
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
        const {showEditPage,item,error,isLoading,isAuthor,comments} = this.state
        return (
            <div>
                { showEditPage ?
                    <div>
                        <EditNew item={item}
                                 onBackClick={this.onEditClick}/>
                        <Comments items={comments}
                                  error={error}
                                  isLoading={isLoading}/>
                    </div>
                    :
                    <Page item={item}
                          error={error}
                          isLoading={isLoading}
                          isAuthor={isAuthor}
                          onDeleteClick={this.onDeleteClick}
                          onEditClick={this.onEditClick}/>
                }
            </div>
        )
    }
}