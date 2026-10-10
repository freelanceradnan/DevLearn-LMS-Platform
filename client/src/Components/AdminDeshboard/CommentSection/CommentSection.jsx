import React, { useState } from "react";
import {
  useAddReplyReviewsMutation,
  useAllCoursesQuery,
  useGetAllCommentsQuery,
  useGetAllReviewsQuery,
  useGetAllUsersQuery,
  useReplyCommentMutation,
} from "../../../Features/ApiSlice";
import {
  Star,
  MessageSquare,
  Send,
  X,
  ShieldCheck,
  User,
  CheckCircle2,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";

const CommentSection = () => {
  const { data: AllComment } = useGetAllCommentsQuery();
  const [CommentsData, setCommentsData] = useState([]);
  const [replyComment]=useReplyCommentMutation()
  const { data: AllUsers } = useGetAllUsersQuery();
  const { data: AllCourses } = useAllCoursesQuery();
  const [addReview] = useAddReplyReviewsMutation();
 
  useEffect(() => {
    const singleArray = AllComment?.flat();
    setCommentsData(singleArray);
  }, [AllComment]);

  const [filtered, setFiltered] = useState("allreviews");
  const [inputId, setInputId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [FilteredComment, setFilteredComment] = useState([]);

  useEffect(() => {
    if (!AllComment) return;

    if (filtered === "replied") {
      const result = CommentsData?.filter((c) => c?.commentReplies?.length > 0);
      setFilteredComment(result);
    } else if (filtered === "noreplied") {
      const result = CommentsData?.filter(
        (c) => !c?.commentReplies || c?.commentReplies?.length === 0,
      );
      setFilteredComment(result);
    } else {
      setFilteredComment(CommentsData);
    }
  }, [AllComment, filtered,CommentsData]);
const handleSendReply=async({contentId, courseId, questionId})=>{
try {
    const res=await replyComment({contentId, reply:replyText, courseId, questionId})
    if(res.data.success===true){
        toast.success("Successfully added reply")
        setInputId(null)
    }
} catch (error) {
    toast.error("Failed added reply")
}
}
  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-slate-50/50 min-h-screen">
      {/* Header  */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Course Comments
              </h2>
              {/* <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-0.5 text-xs font-semibold text-indigo-700">
                Admin Panel
              </span> */}
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Manage and respond to user comments (
              {FilteredComment?.length || 0} Comments available)
            </p>
          </div>
        </div>

        {/*Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setFiltered("allreviews")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              filtered === "allreviews"
                ? "bg-indigo-600 text-white shadow-xs shadow-indigo-200"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Comments
          </button>
          <button
            onClick={() => setFiltered("noreplied")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              filtered === "noreplied"
                ? "bg-indigo-600 text-white shadow-xs shadow-indigo-200"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Pending Reply
          </button>
          <button
            onClick={() => setFiltered("replied")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              filtered === "replied"
                ? "bg-indigo-600 text-white shadow-xs shadow-indigo-200"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Replied
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {FilteredComment?.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 shadow-xs">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-800 font-semibold text-base">
              No Comments found
            </p>
            <p className="text-sm text-slate-400 mt-0.5">
              Comments matching this filter will appear here.
            </p>
          </div>
        ) : (
          FilteredComment?.map((item) => {
            const isActiveInput = item?._id === inputId;
            const hasReplies = item?.commentReplies?.length > 0;

            return (
              <div
                key={item?._id}
                className="p-6 bg-white hover:border-slate-300 border border-slate-200/90 rounded-2xl transition-all shadow-xs space-y-4"
              >
                {/* Review Header */}
                <div className="md:flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="h-11 w-11 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                       {AllUsers?.find((c) => String(c?._id) === String(item?.user))?.email || `User ID: ${item?.user}`}
                      </h3>
                      <p className="text-xs font-medium text-indigo-600">
                        Course:{" "}
                        {AllCourses?.find((c) => c._id === item?.courseId)
                          ?.name || "Previous Course"}
                      </p>

                      {/* <div className="flex items-center gap-1 text-amber-400 pt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < (item.rating || 5) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} 
                          />
                        ))}
                      </div> */}
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2 items-center py-2 md:py-0">
                    <span className="text-xs text-slate-400">
                      {item?.createdAt
                        ? new Date(item?.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                    {hasReplies ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Replied
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" /> Needs Reply
                      </span>
                    )}
                  </div>
                </div>

                {/* Comment Content */}
                <div className="pl-0 sm:pl-14">
                  <p className="text-slate-700 text-sm leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                    "{item?.question}"
                  </p>
                </div>

                {/* Admin Replies Section */}
                <div className="pl-0 sm:pl-14 pt-1 space-y-3">
                  {hasReplies ? (
                    item?.commentReplies?.map((reply, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-indigo-50/40 border border-indigo-100/80 p-4 rounded-xl"
                      >
                        <div className="h-7 w-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                          A
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-indigo-950">
                            Admin Response{" "}
                            <ShieldCheck className="w-4 h-4 text-indigo-600" />
                          </div>
                          <p className="text-slate-700 leading-relaxed">
                            {reply.question}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      {!isActiveInput && (
                        <button
                          onClick={() => setInputId(item._id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Reply to Review
                        </button>
                      )}
                    </div>
                  )}

                  {/* Reply Input Box */}
                  {isActiveInput && (
                    <div className="space-y-3 mt-3 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm animate-in fade-in duration-200">
                      <textarea
                        rows="3"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your official response as an admin..."
                        className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 resize-none text-slate-800 placeholder:text-slate-400"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setInputId(null);
                            setReplyText("");
                          }}
                          className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                        <button
                          onClick={() =>
                            handleSendReply({contentId:item.contentId
, courseId:item.courseId, questionId:item._id})
                          }
                          disabled={!replyText.trim()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-xs shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Send Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CommentSection;
