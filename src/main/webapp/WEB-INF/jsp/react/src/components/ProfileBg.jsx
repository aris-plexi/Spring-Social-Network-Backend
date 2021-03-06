import React from 'react'

import './profileBg.css';


import DataServices from '../services/DataServices';
import Dropzone from "./Dropzone";
import DropzoneBg from './DropzoneBg'
import {PostsContext} from "./NewsFeed";
import Post from "./Post";
import {CurrentUserContext} from "./Navbar";


export default function ProfileBg(props) {

    const style = {
        objectFit: 'cover',
        borderRadius: '50%',
        width: '250px',
        height: '250px'
    };

    
    const background = {
        background: `url("http://localhost:8080/api/profile/image-background/download")`,
        backgroundSize: "cover",
        height: "300px"
};

const bgImageStyle = {
    height: '340px'
};

const [user, setUser] = React.useState({});

function getCurrentUser() {
    DataServices.getCurrentUser().then(
        response => {
            console.log("user in profile : ", response.data);
            setUser(response.data);
        }
    ).catch(error => { console.log(error.response) });
}

React.useEffect(() => { getCurrentUser() }, []);

return (
    <>
        <div className="col-md-6 col-12 offset-md-3 offset-0">
            <div id="cssSelector">
                <div className="card hovercard">
                    <div style={background}>
                        <DropzoneBg/>
                    </div>
                    <div className="avatar">
                        <img style={style} alt="image-profile" src="http://localhost:8080/api/profile/image/download" />
                        <Dropzone />
                    </div>
                    <div className="info">
                        <div className="title">
                            <h3>{user.firstName} {user.lastName}</h3>
                        </div>
                        <div className="desc">Birthday {new Date(user.birthday).toLocaleDateString("en-GB")}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-12 offset-md-3">
            <PostsContext.Consumer>
                {(context) => (
                    context.map((post) => (
                        (post.user.userId === user.userId) &&
                        <Post post={post}/>
                    ))
                )}
            </PostsContext.Consumer>
        </div>
    </>
)}
