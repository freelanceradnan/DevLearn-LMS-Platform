import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Search, FileText, X } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useGetAdminAllOrderQuery } from '../../../Features/ApiSlice';

dayjs.extend(relativeTime);

const CURRENCY = '$';

const orderLabel = (id) => `#ORD-${id?.slice(-8) ?? '--------'}`;

const initials = (text = '') => (text.trim()[0] || '?').toUpperCase();

const Invoices = ({state}) => {

  const navigate = useNavigate();
  const { data: AllOrders, isLoading, isError } = useGetAdminAllOrderQuery();
  const [query, setQuery] = useState('');

  // filtered by the search box
  const orders = useMemo(() => {
    const list = [...(AllOrders?.data ?? [])].sort(
      (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
    );
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((o) =>
      [orderLabel(o?._id), o?.email, o?.name, o?.courseId]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [AllOrders, query]);

  const totalCount = AllOrders?.data?.length ?? 0;

  const navigateInvoice = (item) => {
    navigate(`/admin/invoice/${item._id}`, {
      state: {
        data: {
          orderId: item._id,
          name: item.name,
          email: item.email,
          courseId: item.courseId,
          price: item.price,
        },
      },
    });
  };

  const DownloadButton = ({ item, className = '' }) => (
    <button
      type="button"
      onClick={() => navigateInvoice(item)}
      aria-label={`Open invoice ${orderLabel(item._id)}`}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 ${className}`}
    >
      <Download size={14} aria-hidden="true" />
      Invoice
    </button>
  );

  const CourseBadge = ({ id }) => (
    <span className="inline-block max-w-full truncate rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
      {id}
    </span>
  );

  const Avatar = ({ item }) => (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600"
    >
      {initials(item.name || item.email)}
    </span>
  );
const displayedOrders = state ? orders.slice(0, 5) : orders;

  return (
    <div className={`flex flex-col gap-4 bg-slate-50 ${state ? "p-3 sm:p-5" : ""}`}>
      {/* Toolbar */}
      {!state &&(
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">Invoices</h1>
          <p className="text-sm text-slate-500">
            {isLoading
              ? 'Loading orders…'
              : `${orders.length} of ${totalCount} ${totalCount === 1 ? 'order' : 'orders'}`}
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order, email or course"
            aria-label="Search invoices"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div> 
      )}

      {/* States */}
      {isLoading && (
        <div className="space-y-2" aria-busy="true">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-white shadow-sm ring-1 ring-slate-100" />
          ))}
        </div>
      )}

      {isError && !isLoading && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          Couldn’t load invoices. Refresh the page to try again.
        </div>
      )}

      {!isLoading && !isError && orders.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-200 bg-white px-4 py-14 text-center">
          <FileText size={28} className="text-slate-300" aria-hidden="true" />
          <p className="text-sm font-medium text-slate-700">
            {query ? 'No invoices match your search' : 'No invoices yet'}
          </p>
          <p className="text-sm text-slate-500">
            {query ? 'Try a different order ID, email or course.' : 'Invoices appear here once a course is purchased.'}
          </p>
        </div>
      )}

      {!isLoading && !isError && orders.length > 0 && (
        <>
          {/* Mobile: card list */}
          <ul className="flex flex-col gap-3 md:hidden">
            {displayedOrders.map((item) => (
              <li
                key={item._id}
                className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <Avatar item={item} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {item.name || item.email}
                    </p>
                    {item.name && (
                      <p className="truncate text-xs text-slate-500">{item.email}</p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-slate-500">
                    {dayjs(item?.createdAt).fromNow()}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <span className="font-mono text-xs text-slate-500">
                      {orderLabel(item._id)}
                    </span>
                    <CourseBadge id={item.courseId} />
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    {item.price != null && (
                      <span className="text-sm font-semibold text-slate-900">
                        {CURRENCY}
                        {item.price}
                      </span>
                    )}
                    <DownloadButton item={item} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Tablet / desktop: table */}
          <div className="hidden overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th scope="col" className="px-5 py-3">Order ID</th>
                    <th scope="col" className="px-5 py-3">User</th>
                    <th scope="col" className="px-5 py-3">Course</th>
                    <th scope="col" className="px-5 py-3 text-right">Price</th>
                    <th scope="col" className="px-5 py-3">Created</th>
                    <th scope="col" className="px-5 py-3 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {displayedOrders.map((item) => (
                    <tr key={item._id} className="transition-colors hover:bg-slate-50/80">
                      <td className="whitespace-nowrap px-5 py-3 font-mono text-xs font-medium text-slate-900">
                        {orderLabel(item._id)}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar item={item} />
                          <div className="min-w-0">
                            {item.name && (
                              <p className="truncate font-medium text-slate-900">{item.name}</p>
                            )}
                            <p className="max-w-[16rem] truncate text-xs text-slate-500">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <CourseBadge id={item.courseId} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-right font-medium text-slate-900">
                        {item.price != null ? `${CURRENCY}${item.price}` : '—'}
                      </td>
                      <td
                        className="whitespace-nowrap px-5 py-3 text-slate-500"
                        title={dayjs(item?.createdAt).format('D MMM YYYY, h:mm A')}
                      >
                        {dayjs(item?.createdAt).fromNow()}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <DownloadButton item={item} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Invoices;