'use client';

import { useState, useMemo } from 'react';
import { Link } from '@/types';
import { truncateUrl, formatDate } from '@/lib/utils';

interface LinksTableProps {
    links: Link[];
    onDelete: (code: string) => void;
}

export default function LinksTable({ links, onDelete }: LinksTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<keyof Link>('created_at');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const filteredAndSortedLinks = useMemo(() => {
        let filtered = links.filter(
            (link) =>
                link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                link.target_url.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];

            if (aVal === null) aVal = '';
            if (bVal === null) bVal = '';

            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return sortDirection === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }

            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [links, searchTerm, sortField, sortDirection]);

    const handleSort = (field: keyof Link) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    if (links.length === 0) {
        return (
            <div className="card text-center py-8">
                <p className="text-gray-500">No links created yet. Create your first link above!</p>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Links</h2>
                <input
                    type="text"
                    placeholder="Search links..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input max-w-xs"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b">
                            <th
                                className="text-left py-2 cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('code')}
                            >
                                Short Code {sortField === 'code' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                className="text-left py-2 cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('target_url')}
                            >
                                Target URL {sortField === 'target_url' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                className="text-left py-2 cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('clicks')}
                            >
                                Clicks {sortField === 'clicks' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                className="text-left py-2 cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('last_clicked_at')}
                            >
                                Last Clicked {sortField === 'last_clicked_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="text-left py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedLinks.map((link) => (
                            <tr key={link.id} className="border-b hover:bg-gray-50">
                                <td className="py-3">
                                    <div className="flex items-center space-x-2">
                                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                            {link.code}
                                        </code>
                                        <button
                                            onClick={() => copyToClipboard(`${window.location.origin}/${link.code}`)}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                            title="Copy short URL"
                                        >
                                            📋
                                        </button>
                                    </div>
                                </td>
                                <td className="py-3">
                                    <a
                                        href={link.target_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                        title={link.target_url}
                                    >
                                        {truncateUrl(link.target_url)}
                                    </a>
                                </td>
                                <td className="py-3">{link.clicks}</td>
                                <td className="py-3 text-sm text-gray-600">
                                    {formatDate(link.last_clicked_at)}
                                </td>
                                <td className="py-3">
                                    <div className="flex space-x-2">
                                        <a
                                            href={`/code/${link.code}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Stats
                                        </a>
                                        <button
                                            onClick={() => onDelete(link.code)}
                                            className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}