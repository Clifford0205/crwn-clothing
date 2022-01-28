import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51KMlcLB2lNHL2h7bT9zCxbISKpUlf6lEn6doK2LMi6V5LcnYWB6ZtoQzbikPGjJe0in1x2ziULkCiL9va1rzJNUg00c0M17okN';

  const onToken = token => {
    console.log(token);
    alert('Payment Succesful!');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      locale="en"
    />
  );
};

export default StripeCheckoutButton;
