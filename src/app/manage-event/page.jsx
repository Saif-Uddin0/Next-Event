
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Loader from '../../GlobalComponent/Loader';
import Swal from "sweetalert2";
const ProductListTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    console.log(session?.user);

    // Price formatting
    const formatPrice = (price) => {
        if (price == null) return '$0.00'; // price undefined or null hole
        return `$${price.toFixed(2)}`;
    };


    // Date formatting
    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    useEffect(() => {
        if (!session) {
            setLoading(false);
            return;
        }

        fetch('https://nextevent-server.vercel.app/events')
            .then((res) => res.json())
            .then((data) => {
                const userEvents = data.filter((e) => e.organizerEmail === session.user.email);
                setProducts(userEvents);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [session]);

    const onDelete = (id) => {
        console.log('Delete clicked for', id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://nextevent-server.vercel.app/events/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Artwork has been deleted.",
                                icon: "success"
                            });
                            const remainingevents = products.filter(e => e._id !== id);
                            setProducts(remainingevents);
                        }

                    })


            }
        });
    };

    if (status === 'loading' || loading) return <Loader />;

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-10 text-gray-600">
                <p className="text-xl font-semibold mb-2">No products found.</p>
                <p>Start by adding new products to your inventory.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            {/* Table for Larger Screens */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 relative">
                                            <Image className="rounded-md" src={product.imageUrl} alt={product.name} fill sizes="40px" style={{ objectFit: 'cover' }} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500 truncate w-48">{product.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPrice(product.price)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 100
                                                ? 'bg-green-100 text-green-800'
                                                : product.stock > 20
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(product.lastUpdated)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            onClick={() => onDelete(product._id)}
                                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                                            title="Delete Product"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card Layout for Smaller Screens */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                        <div className="flex items-center mb-4">
                            <div className="flex-shrink-0 h-16 w-16 relative">
                                <Image className="rounded-md" src={product.imageUrl} alt={product.name} fill sizes="64px" style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.category}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center text-sm mb-3">
                            <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                            <span
                                className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 100
                                        ? 'bg-green-100 text-green-800'
                                        : product.stock > 20
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                Stock: {product.stock}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-3">
                            <span>Last Updated: {formatDate(product.lastUpdated)}</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onDelete(product._id)}
                                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                                    title="Delete Product"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListTable;
