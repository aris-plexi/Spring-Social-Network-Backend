import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faGlassCheers } from '@fortawesome/free-solid-svg-icons';
import Comment from './Comment';

const style = {
    objectFit: 'cover',
    borderRadius: '50%',
    width: '50px',
    height: '50px'
};

function Post(props) {

    const [postImageUrl, setPostImageUrl] = React.useState("");
    const [dateTime, setDateTime] = React.useState(new Date());

    function insertComment(evt) {
        evt.preventDefault();

        fetch("/post/insertComment",{
            method: 'POST',
            credentials: "include",
            headers: {
                'input': evt.target.input.value,
                'postId': props.post.postId
            }
        })
            .then(response => response.json())
            .then(data => props.value.setValue(!props.value.value));

        evt.target.input.value = "";
    }

    React.useEffect(() => {
        let tempDate = new Date(props.post.created);
        tempDate.setHours(tempDate.getHours()+3,tempDate.getMinutes(),tempDate.getSeconds(),tempDate.getMilliseconds());
        setDateTime(tempDate);

        if (props.post.imageUrl != null) {
            document.getElementById("postImage").style.display = "block";
            setPostImageUrl(props.post.imageUrl);
        }
        else if (props.post.postImage != null) {
            document.getElementById("postImage").style.display = "block";
            setPostImageUrl("");
        }
    },[]);
    return (
        <>
            <div className="card p-0 my-3"> {/*col-md-6 col-xs-12 col-sm-8*/}
                <div className="card-body d-flex flex-row p-3">
                    <img style={style} src={"http://localhost:8080/api/profile/searchUsers/" + props.post.user.userId}
                        className="avatar rounded-circle mx-3" 
                        alt="Profile picture"/>
                    <div>
                    <h5 className="card-title mb-0">{props.post.user.firstName + " " + props.post.user.lastName}</h5>
                    <p className="card-text text-secondary"><small><i className="far fa-clock pr-2"></i>{dateTime.toLocaleString("en-GB",{timeZone: "UTC"})}</small></p>

                </div>
                </div>
                <div className="card-body p-1">
                    <img src={postImageUrl} alt="rick" className="img-fluid rounded" id="postImage" style={{display: "none"}}/>
                    <blockquote className="card-text p-3 m-0">
                        <p className="mb-0">{props.post.text}</p>
                    </blockquote>
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-4 m-2">
                            <FontAwesomeIcon className="mx-2" icon={faGlassCheers} />{props.post.cheers.length}
                            <FontAwesomeIcon className="mx-2" icon={faComments} />{props.post.comments.length}
                        </div>
                    </div>
                </div>
                <form className="mx-2" onSubmit={insertComment}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="commentInput"
                               placeholder="Enter a comment..." name="input"/>
                    </div>
                </form>
                <small className="ml-2 mt-0 mb-1" data-toggle="collapse" data-target={"#collapseExample" + props.post.postId}
                        aria-expanded="false" aria-controls="collapseExample" style={{cursor: "pointer"}}>
                    Show/Hide Comments
                </small>
                <div className="collapse" id={"collapseExample" + props.post.postId}>
                    {props.post.comments.map((comment) => (
                        <Comment comment={comment}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Post;