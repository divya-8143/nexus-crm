import React, { useState } from 'react';
import { useCrm, Order, DeliveryStatus, PaymentStatus } from '../../context/CrmContext';
import { DeliveryStatusBadge } from '../../components/common/StatusBadges';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';

export const OrdersPage: React.FC = () => {
  const { orders, customers, addOrder, updateOrderStatus, deleteOrder, currencySymbol } = useCrm();

  const [searchTerm, setSearchTerm] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState<string>('ALL');
  const [paymentFilter, setPaymentFilter] = useState<string>('ALL');

  // New Order Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(5000);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('Paid');
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>('Ordered');

  const handleCreateOrder = () => {
    if (!product.trim()) return;
    const cust = customers.find((c) => c.id === selectedCustomerId) || customers[0];

    addOrder({
      customerId: cust.id,
      customerName: cust.name,
      customerEmail: cust.email,
      product,
      quantity: Number(quantity),
      amount: Number(amount),
      orderDate: new Date().toISOString().split('T')[0],
      paymentStatus,
      deliveryStatus,
    });

    setIsModalOpen(false);
    setProduct('');
  };

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDelivery =
      deliveryFilter === 'ALL' || ord.deliveryStatus === deliveryFilter;

    const matchesPayment =
      paymentFilter === 'ALL' || ord.paymentStatus === paymentFilter;

    return matchesSearch && matchesDelivery && matchesPayment;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Customer Order Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track customer orders, update delivery status, and verify product receipt
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>+ Create New Order</Button>
      </div>

      {/* Summary KPI Badges for Quick Inspection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 block">Total Orders</span>
          <span className="text-xl font-extrabold text-white">{orders.length}</span>
        </div>
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-xs text-emerald-400 block">✔ Delivered</span>
          <span className="text-xl font-extrabold text-emerald-400">
            {orders.filter((o) => o.deliveryStatus === 'Delivered').length}
          </span>
        </div>
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-xs text-sky-400 block">🚚 In Transit</span>
          <span className="text-xl font-extrabold text-sky-400">
            {orders.filter((o) => o.deliveryStatus === 'Shipped' || o.deliveryStatus === 'Out for Delivery').length}
          </span>
        </div>
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-xs text-rose-400 block">⚠ Not Delivered / Cancelled</span>
          <span className="text-xl font-extrabold text-rose-400">
            {orders.filter((o) => o.deliveryStatus === 'Not Delivered' || o.deliveryStatus === 'Cancelled').length}
          </span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Search by Order ID (ORD-XXXX), Customer, or Product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Filter by Delivery Status */}
        <select
          value={deliveryFilter}
          onChange={(e) => setDeliveryFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
        >
          <option value="ALL">All Delivery Statuses</option>
          <option value="Delivered">Delivered</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Shipped">Shipped</option>
          <option value="Processing">Processing</option>
          <option value="Ordered">Ordered</option>
          <option value="Not Delivered">Not Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Filter by Payment */}
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
        >
          <option value="ALL">All Payment Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product Item</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Order Date</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Delivery Status (Click to Update)</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-slate-500">
                  No orders found matching the filter criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-sky-400">{ord.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-white">{ord.customerName}</div>
                    <div className="text-[11px] text-slate-500">{ord.customerEmail}</div>
                  </td>
                  <td className="p-4 font-medium text-slate-200">{ord.product}</td>
                  <td className="p-4 font-mono text-slate-300">{ord.quantity}</td>
                  <td className="p-4 text-slate-400">{ord.orderDate}</td>
                  <td className="p-4 font-bold text-white">
                    {currencySymbol}{ord.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      ord.paymentStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    {/* Admin inline Delivery Status Updater */}
                    <select
                      value={ord.deliveryStatus}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as DeliveryStatus)}
                      className={`bg-slate-900 border rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                        ord.deliveryStatus === 'Delivered'
                          ? 'border-emerald-500/40 text-emerald-400'
                          : ord.deliveryStatus === 'Not Delivered' || ord.deliveryStatus === 'Cancelled'
                          ? 'border-rose-500/40 text-rose-400'
                          : 'border-sky-500/40 text-sky-400'
                      }`}
                    >
                      <option value="Ordered">Ordered</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Not Delivered">Not Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteOrder(ord.id)}
                      className="text-rose-400 hover:text-rose-300 font-semibold px-2 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* New Order Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Customer Order"
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateOrder}>Save Order</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Select Customer
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.email})
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Product Item Ordered"
            placeholder="e.g. Wireless Noise-Cancelling Headphones"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <Input
              label={`Total Amount (${currencySymbol})`}
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Delivery Status
              </label>
              <select
                value={deliveryStatus}
                onChange={(e) => setDeliveryStatus(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Ordered">Ordered</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
