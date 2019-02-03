import React,{Component} from 'react'
import {withRouter} from "react-router-dom"
import EditForm from '../components/EditNewForm'
import {editNew, uploadNewImage} from '../utils/requests'
import {isAuthenticated, getUserEmail, isAdmin} from '../utils/auth'


class EditNew extends Component {
    constructor(props) {
        super(props)
        const item = props.item
        this.state = {
            title : item.title,
            text : item.text,
            image : item.image,
            error : '',
            isLoading : false,
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onTitleChange = this.onTitleChange.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
        this.onBackClick = this.onBackClick.bind(this)
    }

    componentDidMount() {
        if((isAuthenticated() && getUserEmail() !== '') || isAdmin()) {
            if(!this.props.item) this.props.history.push('/error')
        }
        else this.props.history.push('/login')
    }

    onSubmit = async () => {
        try {
            const item = this.props.item
            const {title,image,text} = this.state
            if(60 < title.length < 4) this.setState({
                error : 'Invalid title length'
            })
            if(text.length < 15) this.setState({
                error : 'Invalid text length'
            })
            if(this.state.error === '') {
                let obj = {}
                if(title !== item.title) obj.title = title
                if(text !== item.text ) obj.text = text
                if(image !== item.image) obj.image = image
                if(Object.keys(obj).length === 0) this.setState({
                    error : 'You did not change post'
                })
                else {
                    this.setState({
                        isLoading : true
                    })
                    const response = await editNew({
                        obj : obj,
                        old : item.title
                    })
                    response.success ? this.props.history.push('/') : this.setState({
                        isLoading : false,
                        error : response.text
                    })
                }
            }
        }
        catch (e) {
            this.setState({
                error : e.message,
                isLoading : false
            })
        }
    }

    onBackClick = () => this.props.onBackClick()

    onTitleChange(e) {
        this.setState({
            title : e.target.value
        })
    }

    onTextChange(e) {
        this.setState({
            text : e.target.value
        })
    }

     onImageChange = async (e) => {
        try {
            if(e.target.files[0] === null) this.setState({
                error : 'You did not chose file'
            })
            else {
                const response = await uploadNewImage(e.target.files[0])
                response.success ? this.setState({
                    isLoading : false,
                    image : response.data
                }) : this.setState({
                    isLoading : false,
                    error : response.text
                })
            }
        }
        catch (e) {
            this.setState({
                error : e.message,
                isLoading : false
            })
        }
    }

    render() {
        return (
            <EditForm onSubmit={this.onSubmit}
                      onTitleChange={this.onTitleChange}
                      onTextChange={this.onTextChange}
                      onImageChange={this.onImageChange}
                      onBackClick={this.onBackClick}
                      isLoading={this.state.isLoading}
                      image={this.state.image}
                      title={this.state.title}
                      text={this.state.text}
                      error={this.state.error}/>
        )
    }
}


export default withRouter(EditNew)