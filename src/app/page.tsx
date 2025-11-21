'use client';

import { useState, useEffect } from 'react';
import LinkForm from '@/components/LinkForm';
import LinksTable from '@/components/LinksTable';
import { Link } from '@/types';

export default function Dashboard() {
    const [links, setLinks] = useState<Link[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchLinks = async () => {
        try {
            const response = await fetch('/api/links');
            const data = await response.json();

            if (data.success) {
                setLinks(data.data);
            } else {
                setError(data.error || 'Failed to fetch links');
            }
        } catch (err) {
            setError('Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (code: string) => {
        if (!confirm('Are you sure you want to delete this link?')) return;

        try {
            const response = await fetch(`/api/links/${code}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setLinks(links.filter(link => link.code !== code));
            } else {
                alert('Failed to delete link');
            }
        } catch (err) {
            alert('Network error occurred');
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Create and manage your short links</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <LinkForm onSuccess={fetchLinks} />
            <LinksTable links={links} onDelete={handleDelete} />
        </div>
    );
}