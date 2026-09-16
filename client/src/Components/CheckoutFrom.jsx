import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const PaymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={PaymentHandler} className="space-y-4">
      <PaymentElement />

      <button 
        disabled={!stripe || isProcessing}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-md disabled:opacity-50 cursor-pointer" 
        type="submit"
      >
        {isProcessing ? 'Processing...' : 'Pay & Enroll Now'}
      </button>

      {errorMessage && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
          {errorMessage}
        </div>
      )}
    </form>
  );
};
export default CheckoutForm