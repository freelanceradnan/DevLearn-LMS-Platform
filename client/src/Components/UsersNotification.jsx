import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BellOff, CheckCheck } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { assets } from "../assets/assets";
import { socket } from "../WebSocket";
import {
  useGetUsersNotificationQuery,
  useUpdateAllNotificationStatusMutation,
  useUpdateNotificationStatusMutation,
} from "../Features/ApiSlice";

dayjs.extend(relativeTime);

const FILTERS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
];

/* ---------- single row ---------- */
const NotificationItem = ({ item, compact, onOpen }) => {
  const isUnread = item?.status === "unread";

  return (
    <Link
      to={item?.data?.redirectUrl || "#"}
      onClick={() => onOpen(item)}
      className={`group relative flex items-start gap-3 px-4 py-3 transition-colors
        focus-visible:outline-none focus-visible:bg-slate-100
        ${isUnread ? "bg-blue-50/60 hover:bg-blue-50" : "hover:bg-slate-50"}`}
    >
      {isUnread && (
        <span className="absolute left-0 top-0 h-full w-[3px] bg-blue-600" />
      )}

      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
        <img src={assets.main_logo} alt="" className="h-4 w-4 object-contain" />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm leading-snug text-slate-900 ${
            isUnread ? "font-semibold" : "font-medium text-slate-700"
          } ${compact ? "line-clamp-2" : ""}`}
        >
          {item.message}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
          <span>{dayjs(item?.createdAt).fromNow()}</span>
          {item?.subject && (
            <>
              <span aria-hidden>·</span>
              <span className="truncate">{item.subject}</span>
            </>
          )}
        </p>
      </div>

      {isUnread && (
        <span
          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600"
          aria-label="Unread"
        />
      )}
    </Link>
  );
};

/* ---------- empty state ---------- */
const EmptyState = ({ filter }) => (
  <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      <BellOff size={22} />
    </div>
    <p className="text-sm font-medium text-slate-800">
      {filter === "unread" ? "You're all caught up" : "No notifications yet"}
    </p>
    <p className="max-w-[240px] text-xs text-slate-500">
      {filter === "unread"
        ? "New updates will show up here as they arrive."
        : "When something happens on your account, you'll see it here."}
    </p>
  </div>
);

/* ---------- main ---------- */
export const UsersNotification = ({ state, headerAction }) => {
  // state === true  -> compact dropdown (navbar)
  // state === false -> full page
  const compact = Boolean(state);

  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);

  const [ChangeStatus] = useUpdateNotificationStatusMutation();
  const [ChangeAllStatus] = useUpdateAllNotificationStatusMutation();
  const { data: AllNotifications } = useGetUsersNotificationQuery();

  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  // 1) sync server data
  useEffect(() => {
    if (AllNotifications?.getMyNotifications) {
      setNotifications(AllNotifications.getMyNotifications);
    }
  }, [AllNotifications]);

  // 2) live socket notifications
  useEffect(() => {
    if (!user?._id) return;

    const handleConnect = () => socket.emit("register_user", user._id);
    const handleNew = (data) =>
      setNotifications((prev) =>
        prev.some((n) => n._id === data._id) ? prev : [data, ...prev]
      );

    if (socket.connected) handleConnect();
    socket.on("connect", handleConnect);
    socket.on("new_notification", handleNew);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("new_notification", handleNew);
    };
  }, [user?._id]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => n?.status === "unread").length,
    [notifications]
  );

  const visible = useMemo(() => {
    const list =
      filter === "unread"
        ? notifications.filter((n) => n?.status === "unread")
        : notifications;
    return compact ? list.slice(0, 10) : list;
  }, [notifications, filter, compact]);

  // optimistic updates
  const handleOpen = async (item) => {
    if (item.status !== "unread") return;
    setNotifications((prev) =>
      prev.map((n) => (n._id === item._id ? { ...n, status: "read" } : n))
    );
    try {
      await ChangeStatus(item._id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAll = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, status: "read" })));
    try {
      await ChangeAllStatus().unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className={
        compact
          ? "w-full bg-white"
          : "mx-auto my-6 w-full max-w-3xl overflow-hidden rounded-xl bg-white ring-1 ring-slate-200"
      }
    >
      {/* header */}
      <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-slate-900">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAll}
              aria-label="Mark all as read"
              title="Mark all as read"
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <CheckCheck size={16} />
              {!compact && "Mark all as read"}
            </button>
          )}
          {headerAction}
        </div>
      </header>

      {/* filter tabs */}
      {notifications.length > 0 && (
        <div className="flex gap-1 border-b border-slate-200 px-3 py-2">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                filter === key
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* list */}
      {visible.length === 0 ? (
        <EmptyState filter={filter} />
      ) : (
        <ul
          data-scroll
          className={`divide-y divide-slate-100 ${
            compact ? "max-h-[420px] overflow-y-auto overscroll-contain" : ""
          }`}
        >
          {visible.map((item, index) => (
            <li key={item._id || index}>
              <NotificationItem
                item={item}
                compact={compact}
                onOpen={handleOpen}
              />
            </li>
          ))}
        </ul>
      )}

      {/* dropdown footer */}
      {compact && notifications.length > 3 && (
        <footer className="border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => navigate("/usersNotification")}
            className="w-full px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
          >
            See all notifications
          </button>
        </footer>
      )}
    </section>
  );
};