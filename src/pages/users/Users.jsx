import { useEffect, useState } from 'react';

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import styles from './Users.module.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      if (data && Array.isArray(data)) {
        setUsers(data);
      } else {
        throw new Error(
          'Invalid data format. Users array is missing or not an array.'
        );
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchUserPosts = async (userId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=10`
      );
      const data = await response.json();
      setUserPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  const fetchPostComments = async (postId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserPosts(user.id);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    fetchPostComments(post.id);
  };

  console.log(userPosts);
  console.log(comments);
  return (
    <div className={styles.container}>
      <List disablePadding>
        <h2 className={styles.user}>Users</h2>
        {users.map((user) => (
          <div key={user.id}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleUserClick(user)}>
                <ListItemText primary={user.name} />
              </ListItemButton>
            </ListItem>

            <Divider />
          </div>
        ))}
      </List>
      <div className={styles.postsContainer}>
        <List component='ol' disablePadding>
          <h2>Posts</h2>
          {selectedUser && (
            <div className={styles.posts}>
              {userPosts.map((post, index) => (
                <div key={post.id}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handlePostClick(post)}>
                      <ListItemText primary={`${index + 1}. ${post.title}`} />
                    </ListItemButton>
                  </ListItem>

                  <Divider />
                </div>
              ))}
            </div>
          )}
        </List>
      </div>
      <div className={styles.commentsContainer}>
        <h2>Comments</h2>
        {selectedPost && (
          <div className={styles.comments}>
            <List component='ol' disablePadding>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <h3></h3>
                  <ListItem
                    sx={{ backgroundColor: '#d5bcef', p: 2 }}
                    disablePadding
                  >
                    <ListItemText primary={comment.name} />
                  </ListItem>
                </div>
              ))}
            </List>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
