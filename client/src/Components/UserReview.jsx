import { Star, Verified } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAddUserReviewMutation } from '../Features/ApiSlice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const UserReview = ({ courseId, courseData }) => {
  const [selectedStar, setSelectedStar] = useState(0);
  const user = useSelector((state) => state.auth);
  const [MyReviews, setMyReviews] = useState([]);
  const [review, setReview] = useState("");
  const [addUserReview] = useAddUserReviewMutation();
     
  useEffect(() => {
    if (courseData && courseData.length > 0 && user?.user?._id) {
      const userReviews = courseData[0]?.reviews?.filter(
        (c) => c.user === user.user._id
      );

      if (userReviews && userReviews.length > 0) {
        setMyReviews(userReviews);
      } else {
        setMyReviews([]);
      }
    }
  }, [courseData, user]);

  const AddReviewHandler = async (e) => {
    e.preventDefault();
    try {
      if (selectedStar === 0) {
        return toast.error("Please select a star rating");
      }
      if (review.trim() === "") {
        return toast.error("Please write a review comment");
      }

      const result = await addUserReview({
        id: courseId,
        review: review,
        rating: selectedStar,
      });
      toast.success("Review added successfully!");
    
      setReview("");
      setSelectedStar(0);
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <>
      <form onSubmit={AddReviewHandler} className="space-y-4 p-4 border-[#FCFCFC] rounded-xl bg-white shadow-sm">
        <div className="flex gap-2 items-center">
          <div className="border h-10 w-10 rounded-full flex items-center justify-center bg-gray-100 font-bold">
            {user?.user?.name ? user.user.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-800">
              Give A Rating
            </div>
            <div>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <button 
                    type="button" 
                    key={index} 
                    onClick={() => setSelectedStar(item)}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`w-6 h-6 transition-colors ${
                        item <= selectedStar 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300"
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <textarea 
            placeholder="Write your review here..."
            className="border-[#aaa2a2] border p-3 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
            rows={3}
            value={review} 
            onChange={(e) => setReview(e.target.value)}
          />
          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition shadow-sm" type="submit">
              Add Review
            </button>
          </div>
        </div>
      </form>

      {/* Display reviews */}
      <div className="space-y-4 mt-6">
        {MyReviews.map((reviewItem) => (
          <div key={reviewItem._id} className="space-y-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
            <div className="flex gap-3 items-start">
              <div className="h-10 w-10 border rounded-full flex items-center justify-center font-bold bg-blue-50 text-blue-600 shrink-0">
                {user?.user?.name ? user.user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium text-sm">{reviewItem.comment}</p>
                
                {/* Star rating display  */}
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-4 h-4 transition-colors ${
                        star <= reviewItem.rating
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300"
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Admin replies  */}
            <div className="pl-12 space-y-2">
              {reviewItem?.commentReplies?.map((item, index) => (
                <div key={item._id || index} className="bg-slate-50 p-3 rounded-md">
                  <h2 className="font-bold flex items-center gap-1 text-sm text-gray-900">
                    Admin <Verified size={16} className="text-blue-500" />
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{item.comment || item.question}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export  default UserReview;