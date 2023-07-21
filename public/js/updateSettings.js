import axios from 'axios'
import { showAlert } from './alerts'

export const updateInfo = async (data, type) => {
  try {
    const endPoint = type === 'password' ? 'updateMyPassword' : 'updateMe'
    const res = await axios.patch(
        `/api/v1/users/${endPoint}`, 
        data, 
        )
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} was updated successfully 🎉`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
 
}; 