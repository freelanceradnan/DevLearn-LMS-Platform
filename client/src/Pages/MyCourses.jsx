import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BookOpen, GraduationCap, PlayCircle, RefreshCw } from "lucide-react";

import { useGetUsersCoursesQuery } from "../Features/ApiSlice";
import { ClearCart } from "../Features/CartSlice";

/* ---------- loading skeleton ---------- */
const CourseSkeleton = () => (
  <div className="animate-pulse overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
    <div className="aspect-video w-full bg-slate-200" />
    <div className="space-y-3 p-5">
      <div className="h-4 w-3/4 rounded bg-slate-200" />
      <div className="h-3 w-full rounded bg-slate-100" />
      <div className="h-3 w-2/3 rounded bg-slate-100" />
      <div className="mt-4 h-10 w-full rounded-lg bg-slate-200" />
    </div>
  </div>
);

/* ---------- single course card ---------- */
const CourseCard = ({ item }) => {
  const thumbnail = item?.thumbnail?.url;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 transition-shadow hover:shadow-md">
      {/* thumbnail */}
      <Link
        to={`/my-courses/${item._id}`}
        className="relative block aspect-video w-full overflow-hidden bg-slate-100"
        tabIndex={-1}
        aria-hidden
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <BookOpen size={40} />
          </div>
        )}

        {/* play hint on hover */}
        <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition-all group-hover:bg-slate-900/25 group-hover:opacity-100">
          <PlayCircle size={44} className="text-white drop-shadow" />
        </span>
      </Link>

      {/* info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
          {item.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {item.description ||
            "Continue learning and master your skills with this course."}
        </p>

        <Link
          to={`/my-courses/${item._id}`}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          <PlayCircle size={16} />
          Continue learning
        </Link>
      </div>
    </article>
  );
};

/* ---------- empty state ---------- */
const EmptyState = () => (
  <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
      <GraduationCap size={28} />
    </div>
    <h3 className="mt-4 text-lg font-semibold text-slate-900">
      You haven't enrolled in any course yet
    </h3>
    <p className="mt-1 max-w-sm text-sm text-slate-500">
      Browse the catalog and enroll in a course. It will show up here, ready to
      continue.
    </p>
    <Link
      to="/courses"
      className="mt-6 inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
    >
      Explore courses
    </Link>
  </div>
);

/* ---------- main ---------- */
const MyCourses = () => {
  const dispatch = useDispatch();
  const {
    data: allcourses,
    isLoading,
    isFetching,
    refetch,
  } = useGetUsersCoursesQuery();

  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    if (allcourses) {
      setCoursesData(allcourses.data);
    }
  }, [allcourses]);

  // refetch once shortly after mount (e.g. right after payment)
  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 5000);
    return () => clearTimeout(timer);
  }, [refetch]);

  // clear cart automatically after successful payment
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const redirectStatus = queryParams.get("redirect_status");
    const paymentIntent = queryParams.get("payment_intent");

    if (redirectStatus === "succeeded" || paymentIntent) {
      dispatch(ClearCart());
      localStorage.removeItem("cart_items");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* header */}
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My courses</h1>
          {!isLoading && (
            <p className="mt-1 text-sm text-slate-500">
              {coursesData.length === 0
                ? "Nothing enrolled yet"
                : `${coursesData.length} ${
                    coursesData.length === 1 ? "course" : "courses"
                  } enrolled`}
            </p>
          )}
        </div>

        {isFetching && !isLoading && (
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600"
            role="status"
          >
            <RefreshCw size={14} className="animate-spin" />
            Syncing
          </span>
        )}
      </header>

      {/* content */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CourseSkeleton key={i} />
          ))}
        </div>
      ) : coursesData.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coursesData.map((item, index) => (
            <CourseCard key={item._id || index} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default MyCourses;