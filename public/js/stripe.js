import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51NYYWKESThnEQN4LNSohuaXlixlHiEmxBxMvhp8a2RqLs5T1U6xyf2eHghPcq70la1q52ZoHfktnQRMtgq9n9QSJ00zvRnOmm7')

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};