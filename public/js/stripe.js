const stripe = Stripe(
  'pk_test_51KhVXISAGHX2FkPUlGdyhuadwv9TGkmnnVrann1lkNSvK32kk1PtmZXE3sEJZbnFFeUFZwsTUbjxKcGXa703cJu6003iZ5N0IZ'
);
import axios from 'axios';
import { showAlert } from './alerts';
export const bookTour = async (tourid) => {
    try{
  const session = await axios(
    `http://localhost:3000/api/v1/bookings/checkout-session/${tourid}`
  );

  await stripe.redirectToCheckout({
      sessionId:session.data.session.id
  })
    }catch(err){
        console.log(err)
        showAlert('error',err)
    }

};
