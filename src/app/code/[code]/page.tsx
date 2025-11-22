'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Link } from '@/types';
import { formatDate } from '@/lib/utils';

export default function StatsPage() {
    const params = useParams();
    const code = params.code as string;
    const [link, setLink] = useState<Link | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const response = await fetch(`/api/links/${code}?t=${Date.now()}`, {
                    cache: 'no-store'
                });
                const data = await response.json();

                if (data.success) {
                    setLink(data.data);
                } else {
                    setError(data.error || 'Link not found');
                }
            } catch (err) {
                setError('Network error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (code) {
            fetchLink();
        }
    }, [code]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (error || !link) {
        return (
            <div className="card text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Link Not Found</h1>
                <p className="text-gray-600 mb-4">{error || 'The requested link does not exist.'}</p>
                <a href="/" className="btn btn-primary">
                    Back to Dashboard
                </a>
            </div>
        );
    }

    const shortUrl = `${window.location.origin}/${link.code}`;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Link Statistics</h1>
                <p className="text-gray-600">Detailed stats for your short link</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                    <h2 className="text-lg font-semibold mb-4">Link Details</h2>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Short Code</label>
                            <div className="flex items-center space-x-2 mt-1">
                                <code className="bg-gray-100 px-3 py-2 rounded text-sm flex-1">
                                    {link.code}
                                </code>
                                <button
                                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                                    className="btn btn-secondary text-sm"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Short URL</label>
                            <div className="flex items-center space-x-2 mt-1">
                                <input
                                    type="text"
                                    value={shortUrl}
                                    readOnly
                                    className="input text-sm flex-1"
                                />
                                <button
                                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                                    className="btn btn-secondary text-sm"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Target URL</label>
                            <a
                                href={link.target_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline mt-1 block break-all"
                            >
                                {link.target_url}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h2 className="text-lg font-semibold mb-4">Statistics</h2>
                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{link.clicks}</div>
                            <div className="text-sm text-gray-600">Total Clicks</div>
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Created:</span>
                                <span className="text-sm">{formatDate(link.created_at)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Last Clicked:</span>
                                <span className="text-sm">{formatDate(link.last_clicked_at)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <a href="/" className="btn btn-secondary">
                    Back to Dashboard
                </a>
            </div>
        </div>
    );
}