import React,{Component} from 'react'
import {getUser,getPassword,isAuthenticated} from '../utils/auth'
import {createNew as create, uploadNewImage} from '../utils/requests'
import Form from '../components/CreateNewForm'


export default class CreateNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title : '',
            text : '',
            name : '',
            email : '',
            password : '',
            image : null,
            error : '',
            isLoading : false,
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onTitleChange = this.onTitleChange.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
    }

    componentDidMount() {
        if(isAuthenticated() && getPassword() !== '') {
            const user = getUser()
            const password = getPassword()
            this.setState({
                name : user.name,
                email : user.email,
                password : password
            })
        }
        else this.props.history.push('/login')
    }

    onSubmit = async () => {
        try {
            const {title,text,name,email,password,image} = this.state
            if(title.length < 4) this.setState({
                error : 'Invalid title length'
            })
            if(text.length < 15) this.setState({
                error : 'Invalid text length'
            })
            if(image === null) this.setState({
                error : 'You did not chose an image for post'
            })
            if(this.state.error === '') {
                this.setState({
                    isLoading : true
                })
                const url = await uploadNewImage(image)
                alert(url)
                // const response = await create({
                //    title : title,
                //    text : text,
                //    name : name,
                //    email : email,
                //    password : password
                // })
                // response.success ? this.props.history.push('/') : this.setState({
                //     error : response.message,
                //     isLoading : false
                // })
            }
        }
        catch (e) {
            this.setState({
                error : e.message
            })
        }
    }

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

    onImageChange(e) {
        this.setState({
            image : e.target.files[0]
        })
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}
                  onTitleChange={this.onTitleChange}
                  onTextChange={this.onTextChange}
                  onImageChange={this.onImageChange}
                  isLoading={this.state.isLoading}
                  title={this.state.title}
                  text={this.state.text}
                  error={this.state.error}/>
        )
    }
}