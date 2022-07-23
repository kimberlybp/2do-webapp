import axios from 'axios';

async function getUserTasks(userId) {
  try{
    const res = await axios.get(`${process.env.REACT_APP_API}tasks/userId/${userId}`);
    return res.data;
  } catch (err) { throw err; }
}

async function updateUserTask(task) {
  try{
    const res = await axios.put(`${process.env.REACT_APP_API}tasks/update/${task._id}`, task, 
        { headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    return res.data;
  } catch (err) { throw err; }
}

async function createTask(task) {
  try{
    const res = await axios.post(`${process.env.REACT_APP_API}tasks`, task, 
        { headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    return res.data;
  } catch (err) { throw err; }
}

export const taskService = {
  getUserTasks, updateUserTask, createTask
}
