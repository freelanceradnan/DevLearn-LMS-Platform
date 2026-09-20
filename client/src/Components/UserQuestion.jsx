import { User, Verified } from "lucide-react";
import React, { useState } from "react";
import { useAddUsersQuestionsMutation } from "../Features/ApiSlice";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";

dayjs.extend(relativeTime);

const UserQuestion = ({ courseId, contentId, ActiveContent }) => {
  const user = useSelector((state) => state.auth);
  const [addQuestion] = useAddUsersQuestionsMutation();
  const [currentQuestion, setCurrentQuestion] = useState("");

  const addQuestionHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentQuestion.trim() === "") {
        return toast.error("Please enter a valid question");
      }

      const result = await addQuestion({
        contentId: contentId,
        question: currentQuestion,
        courseId,
      });
      
      setCurrentQuestion(""); 
      toast.success("Question submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit question");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-4">
    

      {/* Questions List */}
      <div className="space-y-4">
        {ActiveContent?.questions?.map((item, index) => (
          <div key={item._id || index} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm space-y-4">
            {/* Main Question */}
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                {user?.user?.name ? user.user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-semibold text-sm uppercase tracking-wide">
                    {user?.user?.name || "User"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {dayjs(item.updatedAt).fromNow()}
                  </span>
                </div>
                <p className="text-gray-700 mt-1 text-sm leading-relaxed">{item.question}</p>
              </div>
            </div>

            {/* Comment Replies (Admin/Instructor) */}
            {item.commentReplies && item.commentReplies.length > 0 && (
              <div className="pl-12 space-y-3 mt-3 pt-3 border-t border-gray-100">
                {item.commentReplies.map((reply, replyIndex) => (
                  <div key={reply._id || replyIndex} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                    <div className="bg-indigo-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shrink-0">
                      A
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 text-gray-900 font-bold text-sm">
                        Admin <Verified size={16} className="text-blue-500" />
                      </div>
                      <p className="text-gray-700 text-sm mt-1">{reply.question}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ask Question Form */}
      <form onSubmit={addQuestionHandler} className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm flex items-start gap-3 mt-6">
        <div className="bg-gray-100 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1">
          <User size={20} />
        </div>
        <div className="flex-1 space-y-2">
          <textarea
            rows={3}
            placeholder="Ask a question about this content..."
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            onChange={(e) => setCurrentQuestion(e.target.value)}
            value={currentQuestion}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition shadow-sm"
            >
              Ask Question
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserQuestion;