import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../utils/api';
import { Package, Mail, Phone, MapPin, Calendar, DollarSign, User } from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                // Try to fetch from API first
                const apiOrders = await ordersAPI.getAll();
                setOrders(apiOrders);
            } catch (error) {
                console.error('Failed to fetch orders from API:', error);
                // Fallback to localStorage
                const savedOrders = localStorage.getItem('home_fashion_orders');
                if (savedOrders) {
                    setOrders(JSON.parse(savedOrders));
                }
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            // Update via API
            await ordersAPI.updateStatus(orderId, newStatus);
            
            // Update local state
            const updatedOrders = orders.map(order =>
                order._id === orderId || order.orderNumber === orderId 
                    ? { ...order, status: newStatus } 
                    : order
            );
            setOrders(updatedOrders);
            
            if (selectedOrder?.orderNumber === orderId || selectedOrder?._id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error) {
            console.error('Failed to update order status:', error);
            // Fallback to localStorage
            const updatedOrders = orders.map(order =>
                order.orderNumber === orderId ? { ...order, status: newStatus } : order
            );
            setOrders(updatedOrders);
            localStorage.setItem('home_fashion_orders', JSON.stringify(updatedOrders));
            if (selectedOrder?.orderNumber === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif text-brand-charcoal mb-2">Admin Dashboard - Orders</h1>
                    <p className="text-stone-500">Manage and track all customer orders</p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                        <h3 className="text-xl font-serif text-brand-charcoal mb-2">No Orders Yet</h3>
                        <p className="text-stone-500">Orders will appear here once customers complete their purchases.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Orders List */}
                        <div className="lg:col-span-1 space-y-4">
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <h2 className="font-serif text-lg mb-4 text-brand-charcoal">
                                    All Orders ({orders.length})
                                </h2>
                                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                    {orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((order) => (
                                        <button
                                            key={order.orderNumber}
                                            onClick={() => setSelectedOrder(order)}
                                            className={`w-full text-left p-4 border rounded-lg transition-all hover:shadow-md ${
                                                selectedOrder?.orderNumber === order.orderNumber
                                                    ? 'border-brand-maroon bg-brand-beige/20'
                                                    : 'border-stone-200 bg-white'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-semibold text-brand-charcoal">#{order.orderNumber}</span>
                                                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-stone-600 mb-1">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                                            <p className="text-xs text-stone-500">{new Date(order.date).toLocaleDateString()}</p>
                                            <p className="text-sm font-semibold text-brand-maroon mt-2">₹{order.total.toLocaleString()}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="lg:col-span-2">
                            {selectedOrder ? (
                                <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                                    {/* Header */}
                                    <div className="border-b border-stone-200 pb-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h2 className="text-2xl font-serif text-brand-charcoal mb-1">
                                                    Order #{selectedOrder.orderNumber}
                                                </h2>
                                                <p className="text-sm text-stone-500 flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {new Date(selectedOrder.date).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-brand-maroon">
                                                    ₹{selectedOrder.total.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Status Update */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-stone-700">Status:</span>
                                            <select
                                                value={selectedOrder.status}
                                                onChange={(e) => updateOrderStatus(selectedOrder.orderNumber, e.target.value)}
                                                className="border border-stone-300 rounded px-3 py-1 text-sm focus:ring-brand-maroon focus:border-brand-maroon"
                                            >
                                                <option value="confirmed">Confirmed</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Customer Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-serif text-lg mb-3 text-brand-charcoal flex items-center">
                                                <User className="w-5 h-5 mr-2 text-brand-maroon" />
                                                Customer Details
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <p className="font-semibold text-stone-900">
                                                    {selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}
                                                </p>
                                                <p className="flex items-center text-stone-600">
                                                    <Mail className="w-4 h-4 mr-2" />
                                                    {selectedOrder.customerInfo.email}
                                                </p>
                                                <p className="flex items-center text-stone-600">
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    {selectedOrder.customerInfo.phone}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-serif text-lg mb-3 text-brand-charcoal flex items-center">
                                                <MapPin className="w-5 h-5 mr-2 text-brand-maroon" />
                                                Shipping Address
                                            </h3>
                                            <address className="text-sm text-stone-600 not-italic leading-relaxed">
                                                {selectedOrder.customerInfo.address}<br />
                                                {selectedOrder.customerInfo.city}, {selectedOrder.customerInfo.state} {selectedOrder.customerInfo.zipCode}
                                            </address>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div>
                                        <h3 className="font-serif text-lg mb-4 text-brand-charcoal flex items-center">
                                            <Package className="w-5 h-5 mr-2 text-brand-maroon" />
                                            Order Items ({selectedOrder.items.length})
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedOrder.items.map((item) => (
                                                <div key={item.id} className="flex gap-4 p-4 bg-stone-50 rounded">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover bg-white"
                                                    />
                                                    <div className="flex-grow">
                                                        <h4 className="font-medium text-brand-charcoal">{item.name}</h4>
                                                        <p className="text-sm text-stone-500">{item.category}</p>
                                                        <p className="text-sm text-stone-600 mt-1">
                                                            Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-brand-maroon">
                                                            ₹{(item.price * item.quantity).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="border-t border-stone-200 pt-4">
                                        <div className="space-y-2 text-sm max-w-xs ml-auto">
                                            <div className="flex justify-between text-stone-600">
                                                <span>Subtotal</span>
                                                <span>₹{selectedOrder.total.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-stone-600">
                                                <span>Shipping</span>
                                                <span className="text-green-600 font-medium">Free</span>
                                            </div>
                                            <div className="flex justify-between text-stone-600">
                                                <span>Tax (GST)</span>
                                                <span>Included</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-lg text-brand-charcoal border-t border-stone-200 pt-2">
                                                <span>Total</span>
                                                <span>₹{selectedOrder.total.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                                    <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-serif text-brand-charcoal mb-2">Select an Order</h3>
                                    <p className="text-stone-500">Click on an order from the list to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
