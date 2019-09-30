import React from 'react'
import {Link} from 'react-router-dom'
import { directive } from '@babel/types';

const Menu = () => {
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/signin'>Sign In</Link>
        </div>
    )
}

export default Menu