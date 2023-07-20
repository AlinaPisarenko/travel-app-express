import axios from 'axios'
import { showAlert } from './alerts'

export const updateInfo = async (name, email) => {
  try {
    const res = await axios.patch(
        '/api/v1/users/updateMe', 
        { name, email }, 
        )

    if (res.data.status === 'success') {
      showAlert('success', 'Data was updated successfully 🎉');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};