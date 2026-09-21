import { stripe } from "../../index.js";
import { CreateOrder } from "../Controller/OrderController.js";
import { User } from "../Models/Users.js";
import { CreateMyOrder } from "../Services/OrderServices.js";

export const Webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    const userId = paymentIntent.metadata.userId;
    const courseIdMeta = paymentIntent.metadata.courseId;
    const courseIdsMeta = paymentIntent.metadata.courseIds;

    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found for this webhook event!");
      }
    
      const payment_info = {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount_received / 100, 
        status: paymentIntent.status
      };
      
      if (courseIdsMeta) {
        const courseIds = JSON.parse(courseIdsMeta);
        for (const cId of courseIds) {
          await CreateMyOrder(user, cId, payment_info);
        }
      } 
      else if (courseIdMeta) {
        await CreateMyOrder(user, courseIdMeta, payment_info);
      }
      
      console.log('Payment successful and db updated:', paymentIntent.id);
    } catch (error) {
      console.error('Database Update Error:', error.message);
    }
  }

  res.json({ received: true });
};