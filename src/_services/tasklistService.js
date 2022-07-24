import axios from 'axios';

async function getUserTasklists(userId) {
  try{
    const res = await axios.get(`${process.env.REACT_APP_API}tasklists/userId/${userId}`);
    return res.data;
  } catch (err) { throw err; }
}

async function createTasklist(tasklist) {
  try{
    const res = await axios.post(`${process.env.REACT_APP_API}tasklists`, tasklist, 
        { headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    return res.data;
  } catch (err) { throw err; }
}

export const tasklistService = {
  getUserTasklists, createTasklist
}
