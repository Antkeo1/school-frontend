import React from 'react'
// withRouter to give us access to props
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: '#ff9900'}
        else return {color: "#ffffff"}
}


const Menu = ({history}) => {
    return (
        <nav className="navbar navbar-expand">
            <div className="container-fluid">
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <Link className='nav-link' style={isActive(history, '/')} to='/'>Home</Link>
                    </li>
                </ul>
                    
                {!isAuthenticated() && (
                    <ul className="nav navbar-nav navbar-right">
                            <li >
                                <Link className='nav-link' style={isActive(history, '/signup')} to='/signup'>Sign Up</Link>
                            </li>
                        
                            <li >
                                <Link className='nav-link' style={isActive(history, '/signin')} to='/signin'>Sign In</Link>
                            </li>
                        </ul>
                )}

                    {isAuthenticated() && (
                        <ul className="nav navbar-nav navbar-right">
                            <li >
                                <a className='nav-link' style={{cursor: 'pointer', color: '#fff'}} onClick={() => signout(() => history.push('/'))}>Sign Out</a>
                            </li>

                            <li >
                                <a className='nav-link'  >{isAuthenticated().user.name}</a>
                            </li>
                        </ul>
                    )}
            </div>
        </nav>
    )
}

export default withRouter(Menu)

