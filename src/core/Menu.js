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
        <nav id='nav' className="navbar navbar-expand mb-5" style={{'borderBottom': 'solid black 1px'}}>
            <div className="container-fluid">
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <Link className='nav-link' style={isActive(history, '/')} to='/'>Home</Link>
                    </li>
                    {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                
                                     <li className="nav-item">
                                        <Link
                                            className={history.location.pathname === '/users' ? 'active nav-link' : 'not-active nav-link'}
                                            to="/users"
                                        >
                                            Users
                                        </Link>
                                    </li>
                                
                                )
                            }

                   
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
                                <Link className='nav-link'  to={`/user/${isAuthenticated().user._id}`} style={isActive(history, `/user/${isAuthenticated().user._id}`)} >
                                    {`${isAuthenticated().user.name}'s profile`}
                                </Link>
                            </li>

                            {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                <ul className="nav navbar-nav navbar-left">
                                    <li>
                                        <Link 
                                            to={'/admin'}
                                            style={isActive(history, '/admin')}
                                            className='nav-link'
                                        >
                                            Admin
                                        </Link>
                                    </li>
                                </ul>
                                )
                            }

                            <li >
                                <span className='nav-link' style={{cursor: 'pointer', color: '#fff'}} onClick={() => signout(() => history.push('/'))}>Sign Out</span>
                            </li>
                            
                        </ul>
                    )}

                    
            </div>
        </nav>
    )
}

export default withRouter(Menu)

