import React, { useState } from 'react';
import { useCrm, Customer, SatisfactionLevel, DeliveryStatus } from '../../context/CrmContext';
import { DeliveryStatusBadge, SatisfactionBadge } from '../../components/common/StatusBadges';
import { CustomerDetailsModal } from '../../components/customers/CustomerDetailsModal';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';

export const CustomerListPage: React.FC = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer, currencySymbol } = useCrm();

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [satisfactionFilter, setSatisfactionFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modals
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const openAddModal = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCity('');
    setEditingCustomer(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (cust: Customer, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCustomer(cust);
    setName(cust.name);
    setEmail(cust.email);
    setPhone(cust.phone);
    setAddress(cust.address);
    setCity(cust.city);
    setIsAddModalOpen(true);
  };

  const handleSaveCustomer = () => {
    if (!name.trim() || !email.trim()) return;

    if (editingCustomer) {
      updateCustomer(editingCustomer.id, {
        name,
        email,
        phone,
        address,
        city,
      });
    } else {
      addCustomer({
        name,
        email,
        phone,
        address,
        city,
        satisfaction: 'Satisfied',
        rating: 5,
        feedback: 'New registered customer.',
      });
    }

    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(id);
    }
  };

  const handleRowClick = (cust: Customer) => {
    setSelectedCustomer(cust);
    setIsDetailsOpen(true);
  };

  // Filter logic
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);

    const matchesSatisfaction =
      satisfactionFilter === 'ALL' || c.satisfaction === satisfactionFilter;

    const matchesStatus =
      statusFilter === 'ALL' || c.latestOrderStatus === statusFilter;

    return matchesSearch && matchesSatisfaction && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Customer Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, search, and manage customer records and satisfaction details
          </p>
        </div>
        <Button variant="primary" onClick={openAddModal}>+ Add New Customer</Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Search by customer name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Filter by Satisfaction */}
        <select
          value={satisfactionFilter}
          onChange={(e) => setSatisfactionFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
        >
          <option value="ALL">All Satisfaction</option>
          <option value="Satisfied">Satisfied</option>
          <option value="Neutral">Neutral</option>
          <option value="Unsatisfied">Unsatisfied</option>
        </select>

        {/* Filter by Latest Order Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
        >
          <option value="ALL">All Order Statuses</option>
          <option value="Delivered">Delivered</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Shipped">Shipped</option>
          <option value="Processing">Processing</option>
          <option value="Not Delivered">Not Delivered</option>
        </select>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider">
              <th className="p-4">Customer Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Total Orders</th>
              <th className="p-4">Last Order</th>
              <th className="p-4">Satisfaction</th>
              <th className="p-4">Latest Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">
                  No customers found matching the search/filter criteria.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  onClick={() => handleRowClick(cust)}
                  className="hover:bg-slate-900/60 cursor-pointer transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold flex items-center justify-center border border-sky-500/30">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white">{cust.name}</div>
                        <div className="text-[11px] text-slate-400">{cust.city}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{cust.email}</td>
                  <td className="p-4 font-mono text-slate-300">{cust.phone}</td>
                  <td className="p-4 font-bold text-white">{cust.totalOrders} orders</td>
                  <td className="p-4 text-slate-400">{cust.lastOrderDate || '—'}</td>
                  <td className="p-4">
                    <SatisfactionBadge satisfaction={cust.satisfaction} rating={cust.rating} />
                  </td>
                  <td className="p-4">
                    <DeliveryStatusBadge status={cust.latestOrderStatus} />
                  </td>
                  <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(cust);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-900 text-sky-400 hover:bg-slate-800 text-xs font-semibold border border-slate-800"
                      >
                        View
                      </button>
                      <button
                        onClick={(e) => openEditModal(cust, e)}
                        className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold border border-slate-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(cust.id, e)}
                        className="px-2.5 py-1 rounded bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 text-xs font-semibold border border-rose-500/30"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      {/* Add / Edit Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingCustomer ? 'Edit Customer' : 'Add New Customer'}
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSaveCustomer}>
              {editingCustomer ? 'Update Customer' : 'Save Customer'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Customer Full Name"
            placeholder="e.g. Ravi Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. ravi@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Phone Number"
            placeholder="e.g. +91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="Street Address"
            placeholder="e.g. 42 MG Road, Indiranagar"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            label="City & State"
            placeholder="e.g. Bengaluru, Karnataka"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};
