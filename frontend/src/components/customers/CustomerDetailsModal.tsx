import React from 'react';
import { Customer, Order, useCrm } from '../../context/CrmContext';
import { Modal } from '../common/Modal';
import { DeliveryStatusBadge, SatisfactionBadge, StarRating } from '../common/StatusBadges';
import { Button } from '../common/Button';

interface CustomerDetailsModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({
  customer,
  isOpen,
  onClose,
}) => {
  const { orders, currencySymbol } = useCrm();

  if (!customer) return null;

  const customerOrders = orders.filter(
    (o) => o.customerId === customer.id || o.customerName.toLowerCase() === customer.name.toLowerCase()
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Customer Profile: ${customer.name}`} maxWidth="4xl">
      <div className="space-y-6">
        {/* Customer Information & Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Contact Details */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">Customer Contact</h4>
            <div>
              <span className="text-xs text-slate-500 block">Full Name</span>
              <p className="text-sm font-bold text-white">{customer.name}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Email Address</span>
              <p className="text-xs text-slate-300">{customer.email}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Phone</span>
              <p className="text-xs text-slate-300">{customer.phone || 'N/A'}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Delivery Address</span>
              <p className="text-xs text-slate-300">{customer.address}, {customer.city}</p>
            </div>
          </div>

          {/* Card 2: Order Information */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Order Summary</h4>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400">Total Orders Placed:</span>
              <span className="text-base font-extrabold text-white">{customerOrders.length}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400">Total Amount Spent:</span>
              <span className="text-base font-extrabold text-emerald-400">
                {currencySymbol}{customerOrders.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400">Last Order Date:</span>
              <span className="text-xs font-semibold text-slate-200">{customer.lastOrderDate || 'None'}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-xs text-slate-400">Latest Delivery Status:</span>
              <DeliveryStatusBadge status={customer.latestOrderStatus} />
            </div>
          </div>

          {/* Card 3: Satisfaction & Review */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Customer Satisfaction</h4>
            <div className="flex items-center justify-between">
              <SatisfactionBadge satisfaction={customer.satisfaction} />
              <StarRating rating={customer.rating || 5} />
            </div>
            <div className="pt-2">
              <span className="text-xs text-slate-500 block">Customer Feedback:</span>
              <p className="text-xs text-slate-300 italic mt-1 bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                "{customer.feedback || 'No written review submitted yet.'}"
              </p>
            </div>
          </div>
        </div>

        {/* Order History Table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white">Order History ({customerOrders.length})</h4>
          </div>

          {customerOrders.length === 0 ? (
            <div className="p-6 bg-slate-900 rounded-xl text-center text-xs text-slate-500">
              No orders found for this customer.
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs border-collapse bg-slate-900">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Order Date</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Payment Status</th>
                    <th className="p-3">Delivery Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {customerOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-850 transition">
                      <td className="p-3 font-mono font-bold text-sky-400">{ord.id}</td>
                      <td className="p-3 font-semibold text-slate-200">{ord.product}</td>
                      <td className="p-3 text-slate-300">{ord.quantity}</td>
                      <td className="p-3 text-slate-400">{ord.orderDate}</td>
                      <td className="p-3 font-bold text-white">
                        {currencySymbol}{ord.amount.toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          ord.paymentStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3">
                        <DeliveryStatusBadge status={ord.deliveryStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <Button variant="outline" onClick={onClose}>Close Details</Button>
        </div>
      </div>
    </Modal>
  );
};
