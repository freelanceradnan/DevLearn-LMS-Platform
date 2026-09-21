import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCreatePaymentIntentMutation, useGetPubCourseDetailsQuery } from "../Features/ApiSlice";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Components/CheckoutFrom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const PaymentCheckout = () => {
  const location = useLocation();
  const detailsData = location.state; 
  const cart=useSelector((state)=>state.AddToCart)
  const user = useSelector((state) => state.auth);
  // const { id } = useParams();

  // const { data: course, isLoading: isCourseLoading } = useGetPubCourseDetailsQuery(id, {
  //   skip: !id,
  // });
  const [CourseLoading,isCourseLoading]=useState(false)
  const [createIntent] = useCreatePaymentIntentMutation();
  const [clientSecret, setClientSecret] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(true);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        setLoadingPayment(true);
       if(Array.isArray(detailsData)){
         const courseIds = cart.map((item) => item._id);
         const result = await createIntent({
            productId: courseIds, 
            userId: user?.user?._id,
        }).unwrap();

        if (result?.clientSecret) {
            setClientSecret(result.clientSecret);
        }
       }
       else{
         const result = await createIntent({
          productId: detailsData._id,
          userId: user?.user?._id,
        }).unwrap();

        if (result?.clientSecret) {
          setClientSecret(result.clientSecret);
        }
       }
      } catch (error) {
        console.error("Payment intent error:", error);
      } finally {
        setLoadingPayment(false);
      }
    };

    if (user?.user?._id) {
      fetchPaymentIntent();
    }
  }, [user, createIntent]);
const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const tax = 0; 
    const total = subtotal + tax;
  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
     {detailsData.length>0?  <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Checkout</h1>
          <p className="text-sm text-slate-500 mt-1">Complete your transaction securely.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 border-b pb-3 mb-4">
              Orders Summary
            </h2>

            
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Course</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {detailsData.map((item)=>item.name)}</h3>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal || 0}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Taxes & Fees</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold text-lg pt-2 border-t border-slate-100">
                    <span>Total</span>
                    <span className="text-indigo-600">${total || 0}</span>
                  </div>
                </div>

                
              </div>
     
          </div>

          {/* Right Column: Payment Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Payment Details</h2>

            {loadingPayment ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3 text-slate-500">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium">Preparing payment gateway...</p>
              </div>
            ) : clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            ) : (
              <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-center">
                <p className="text-red-600 font-medium text-sm">Failed to load payment gateway.</p>
                <p className="text-xs text-red-400 mt-1">Please refresh or try again later.</p>
              </div>
            )}
          </div>

        </div>
      </div>:
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Checkout</h1>
          <p className="text-sm text-slate-500 mt-1">Complete your transaction securely.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 border-b pb-3 mb-4">
              Order Summary
            </h2>

            
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Course</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{detailsData?.name || "Course Item"}</h3>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Subtotal</span>
                    <span>${detailsData?.price || 0}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Taxes & Fees</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold text-lg pt-2 border-t border-slate-100">
                    <span>Total</span>
                    <span className="text-indigo-600">${detailsData?.price || 0}</span>
                  </div>
                </div>

                
              </div>
     
          </div>

          {/* Right Column: Payment Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Payment Details</h2>

            {loadingPayment ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3 text-slate-500">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium">Preparing payment gateway...</p>
              </div>
            ) : clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            ) : (
              <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-center">
                <p className="text-red-600 font-medium text-sm">Failed to load payment gateway.</p>
                <p className="text-xs text-red-400 mt-1">Please refresh or try again later.</p>
              </div>
            )}
          </div>

        </div>
      </div>
     }
    </div>
  );
};

export default PaymentCheckout;