import axios from 'axios';

async function getUserTags(userId) {
  try{
    const res = await axios.get(`${process.env.REACT_APP_API}tags/userId/${userId}`);
    return res.data;
  } catch (err) { throw err; }
}

async function createTag(tag) {
  try{
    const res = await axios.post(`${process.env.REACT_APP_API}tags`, tag, 
        { headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    return res.data;
  } catch (err) { throw err; }
}

export const tagService = {
  getUserTags, createTag
}
