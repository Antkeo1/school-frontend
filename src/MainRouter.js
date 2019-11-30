import React from 'react'
import {Route, Switch} from 'react-router-dom';

import Signup from './user/Signup'
import Signin from './user/Signin'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'

import PrivateRoute from './auth/PrivateRoute'

import Home from './core/Home'
// import Menu from './core/Menu'
// import Side from './Side'

import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/EditProfile'
import FindPeople from './user/FindPeople'

import EditUpload from './upload/EditUpload'
import SingleUpload from './upload/SingleUpload'
import UserUpload from './upload/UserUpload'
import NewUpload from './upload/NewUpload'

import SinglePost from './post/SinglePost'
import NewPost from './post/NewPost';
import EditPost from './post/EditPost'

import NewGroup from './group/NewGroup'
import MyGroup from './group/MyGroup'
import SingleGroup from './group/SingleGroup'
import EditGroup from './group/EditGroup'
import Groups from './group/Groups'


import Admin from './admin/Admin'


const MainRouter = () => {
    return (
        <div >
            
            
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/forgot-password' component={ForgotPassword} />
                <Route exact path='/reset-password/:resetPasswordToken' component={ResetPassword} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/signin' component={Signin} />
                <PrivateRoute exact path='/findpeople' component={FindPeople} />
                <PrivateRoute exact path='/admin' component={Admin} />

                <Route exact path='/users' component={Users} />
                <PrivateRoute exact path='/user/:userId' component={Profile} />
                <PrivateRoute exact path='/user/edit/:userId' component={EditProfile} />
               
                
                
                <PrivateRoute exact path='/post/create' component={NewPost} />
                <Route exact path='/post/:postId' component={SinglePost} />
                <PrivateRoute exact path='/post/edit/:postId' component={EditPost} />
               
                
                {/* <PrivateRoute exact path='/uploads/by/:userId' component={Upload} /> */}
                <PrivateRoute exact path='/upload/create' component={NewUpload} />
                <PrivateRoute exact path='/upload/edit/:uploadId' component={EditUpload} />
                <Route exact path='/upload/:uploadId' component={SingleUpload} />
                <Route exact path='/uploads/by/:userId' component={UserUpload} />

                <PrivateRoute exact path='/group/create' component={NewGroup} />
                <PrivateRoute exact path='/group/edit/:groupId' component={EditGroup} />
                <Route exact path='/group/:groupId' component={SingleGroup} />
                <PrivateRoute exact path='/groups' component={Groups} />
                <PrivateRoute exact path='/mygroups' component={MyGroup} />
            </Switch>
        </div>
    )
}

export default MainRouter