import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: '',
            redirectToReferer: false,
            loading: false
        }
    }

    handleChange = (name) => event => {
        this.setState({error: ''})
        this.setState({open: false})
        this.setState({
            [name]: event.target.value
        })
    }
 
    //signin fetch method
    signin = user => {
        return fetch("http://localhost:8000/api/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }

    authenticate (jwt, next) {
        if(typeof window !== 'undefined') {
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next()
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})
        const {email, password} = this.state
        const user = {
            email,
            password
        }
        console.log(user)
        this.signin(user)
        .then(data => {
            if(data.error) {
                this.setState({ error: data.error, loading: false })
            }
              else {
                  // authenticate user 
                  this.authenticate(data, () => {
                      this.setState({redirectToReferer: true})
                  })
              }
        })
    }

    signinForm = (email, password) => {
        return (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={this.handleChange('email')} type='email' className='form-control' value={email} />
            </div>
            
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={this.handleChange('password')} type='password' className='form-control' value={password} />
            </div>
            <button onClick={this.handleSubmit} className='btn btn-raised btn-primary'>Submit</button>
        </form>
        )
    }



    render() {
        const {email, password, error, redirectToReferer, loading} = this.state
        
        if(redirectToReferer) {
            return <Redirect to='/' />
        }

        return (
            <div className='container'>
                <h2 className='mt-5 mb-5'>SignIn</h2>

                <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                
                {loading ? ( 
                <div className='jumbotron text-center'>
                    <h2>Loading....</h2>
                </div>
                ) : (
                    ""
                )
            }

                {this.signinForm(email, password)}
            </div>
        )
    }
}

export default Signin