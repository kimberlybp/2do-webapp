import axios from 'axios';

async function getAllModules() {
  try {
    const res = await axios.get(`https://api.nusmods.com/v2/2022-2023/moduleList.json`);
    return res.data;
  } catch (err) { throw err; }
}

export const moduleService = {
  getAllModules
}