import React,{Component} from 'react'
import Page from '../components/NewPage'
import Comments from '../components/Comments'
import EditNew from '../container/EditNew'
import {isAuthenticated, getPassword, getUserEmail, isAdmin} from '../utils/auth'
import {getNew, deleteNew, getNewComments, createComment, deleteComment} from '../utils/requests'


export default class NewPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item : '',
            error : '',
            text : '',
            user : '',
            commentText : '',
            editId : -1,
            comments : [],
            isLoading : false,
            isAuthor : false,
            showEditPage : false,
        }
        this.onTextChange = this.onTextChange.bind(this)
        this.onCommentClick = this.onCommentClick.bind(this)
        this.onEditClick = this.onEditClick.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.onDeleteCommentClick = this.onDeleteCommentClick.bind(this)
        this.onEditCommentSubmit = this.onEditCommentSubmit.bind(this)
        this.onEditCommentClick = this.onEditCommentClick.bind(this)
        this.onCancelCommentClick = this.onCancelCommentClick.bind(this)
        this.onEditCommentTextChange = this.onEditCommentTextChange.bind(this)
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
                                if(response.data.email === getUserEmail() || isAdmin()) {
                                    this.setState({
                                        isAuthor: true
                                    })
                                }
                                this.setState({
                                    user : getUserEmail(),
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

    onTextChange(e) {
        this.setState({
            text : e.target.value
        })
    }

    onEditCommentSubmit(e) {
        alert(this.state.commentText)
        this.setState({
            error : ''
        })
    }

    onEditCommentTextChange(e) {
        this.setState({
            commentText : e.target.value
        })
    }

    onEditCommentClick(id) {
        this.setState({
            editId: id
        })
    }

    onDeleteCommentClick = async id => {
       try {
           const comments = this.state.comments
           this.setState({
               isLoading : true
           })
           const response = await deleteComment(id)
           if(response.success) {
               let updated = comments.filter(c => c.id !== id)
               this.setState({
                   isLoading : false,
                   comments : updated
               })
           }
           else this.setState({
               isLoading : false,
               error : response.text
           })
       }
       catch (e) {
           this.setState({
               error : e.message
           })
       }
    }

    onCancelCommentClick() {
        this.setState({
            editId : -1
        })
    }

    onCommentClick = async () => {
        try {
            const {text, item, comments} = this.state
            if(text.trim().length !== 0) {
                this.setState({
                    isLoading : true
                })
                const response = await createComment({
                    text : text,
                    title : item.title
                })
                if(response.success) {
                    comments.unshift(response.data)
                    this.setState({
                         isLoading : false,
                         comments : comments
                    })
                }
                else this.setState({
                    isLoading : false,
                    error : response.text
                })
            }
            else this.setState({
                error : 'Invalid comment text'
            })
        }
        catch (e) {
            this.setState({
                error : e.message
            })
        }
    }

    onEditClick() {
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
        const {showEditPage,item,error,isLoading,isAuthor,comments,user,editId} = this.state
        return (
            <div>
                { showEditPage ?
                    <EditNew item={item}
                             onBackClick={this.onEditClick}/>
                    :
                    <div>
                        <Page item={item}
                              error={error}
                              isLoading={isLoading}
                              isAuthor={isAuthor}
                              onDeleteClick={this.onDeleteClick}
                              onEditClick={this.onEditClick}/>
                        <Comments onTextChange={this.onTextChange}
                                  onSubmit={this.onCommentClick}
                                  onEditCommentTextChange={this.onEditCommentTextChange}
                                  onEditCommentClick={this.onEditCommentClick}
                                  onEditCommentSubmit={this.onEditCommentSubmit}
                                  onCancelCommentClick={this.onCancelCommentClick}
                                  onDeleteCommentClick={this.onDeleteCommentClick}
                                  edit={editId}
                                  user={user}
                                  items={comments}
                                  error={error}
                                  isLoading={isLoading}/>
                    </div>
                }
            </div>
        )
    }
}