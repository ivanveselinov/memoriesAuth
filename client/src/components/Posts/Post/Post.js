import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardMedia, CardContent, Button, Typography } from '@material-ui/core';
import moment from 'moment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';



function Post({ post, setCurrentId }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    
    return (
       <Card className={classes.card}>

                     {/* Image on Show */}
           <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>

                     {/* Name - Creator */}
           <div className={classes.overlay}>
              <Typography variant="h6">{post.name}</Typography>
              <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
           </div>

                        {/* Edit Button */}    {/* creator is currently login in */}
                        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
           <div className={classes.overlay2}>
              <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                   <MoreHorizIcon fontSize="default" />  
              </Button>
           </div>
                        )}

                        {/* # */}
           <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag}` )}</Typography>  
           </div>
                        {/* Title */}
           <CardContent>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>  
           </CardContent>
                        {/* Message */}
                <Typography variant="body2" component='p' color="textSecondary">{post.message}</Typography>  

                        {/* Card For Like and Delete  */}
           <CardActions className={classes.cardActions}>

                        {/* LIKE */}                   {/*  if not user disable */} 
               <Button size="small" color="primary" disabled={!user?.result} onClick= {() => dispatch(likePost(post._id)) }>
                     <Likes/> {/* Import Component */}
               </Button>

                        {/* DELETE */}                        {/* or */}     {/*If user is creted post he can remove*/}   
                        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && ( 
               <Button size="small" color="secondary" onClick= {() => dispatch(deletePost(post._id))}>
                  <DeleteIcon fontSize="small" />
                      Delete
               </Button>
            )}
           
           </CardActions>
       </Card>
    )
}

export default Post
