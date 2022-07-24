import axios from 'axios';

async function getUser(sub, accessToken) {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}users/sub/${sub}`,
      { headers: { "Authorization": `Bearer ${accessToken}` } });
    return res;
  } catch (err) { throw err; }
}

async function createUser(user) {
  try{
    const res = await axios.post(`${process.env.REACT_APP_API}users`, user, 
    { headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    return res;
  } catch (err) { throw err; }
}

export const userService = {
  getUser, createUser
}
