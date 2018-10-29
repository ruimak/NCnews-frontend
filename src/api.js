import axios from 'axios';

export const getSingleArticle = path => {
  return axios.get(`https://northcoders-news-ruimak.herokuapp.com/api${path}`);
};

export const getAllArticles = path => {
  return axios.get(
    path && path !== '/'
      ? `https://northcoders-news-ruimak.herokuapp.com/api${path}`
      : 'https://northcoders-news-ruimak.herokuapp.com/api/articles'
  );
};

export const postArticle = (slug, content, title, id) => {
  return axios.post(
    `https://northcoders-news-ruimak.herokuapp.com/api/topics/${slug}/articles`,
    {
      body: content,
      created_by: '5b9bc4254c18302d443a6330',
      title: title,
      votes: 0
    }
  );
};

export const getCommentsForArticle = path => {
  return axios.get(`https://northcoders-news-ruimak.herokuapp.com/api${path}`);
};

export const deleteComments = id => {
  return axios.delete(
    `https://northcoders-news-ruimak.herokuapp.com/api/comments/${id}`
  );
};

export const postComment = (id, content, posterId) => {
  return axios.post(
    `https://northcoders-news-ruimak.herokuapp.com/api/articles/${id}/comments`,
    { body: content, created_by: posterId }
  );
};

export const getTopics = () => {
  return axios.get('https://northcoders-news-ruimak.herokuapp.com/api/topics');
};

export const getSingleUser = name => {
  return axios.get(`https://northcoders-news-ruimak.herokuapp.com/api${name}`);
};

export const getAllUsers = () => {
  return axios.get('https://northcoders-news-ruimak.herokuapp.com/api/users');
};

export const voteFunction = (typeOfVote, id, direction) => {
  return axios.patch(
    `https://northcoders-news-ruimak.herokuapp.com/api/${typeOfVote}/${id}?vote=${direction}`
  );
};
