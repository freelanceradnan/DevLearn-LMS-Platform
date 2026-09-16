import { CatchAsyncError } from "../Middleware/CatchAsyncError.js";
import course from "../Models/Course.js";
import { stripe } from "../../index.js"; 
export const PaymentIntent = CatchAsyncError(async (req, res, next) => {
    try {
        const { productId, userId } = req.body;
       
        const fullCourse = await course.findById(productId);
        if (!fullCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        const amountInCents = fullCourse.price * 100;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            metadata: {
                userId: userId,
                courseId: productId
            }
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});