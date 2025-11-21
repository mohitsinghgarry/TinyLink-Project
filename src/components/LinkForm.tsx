'use client';

import { useState } from 'react';
import { CreateLinkRequest } from '@/types';

interface LinkFormProps {
    onSuccess: () => void;
}

export default function LinkForm({ onSuccess }: LinkFormProps) {
    const [url, setUrl] = useState('');
    const [customCode, setCustomCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const body: CreateLinkRequest = { url };
            if (customCode.trim()) {
                body.customCode = customCode.trim();
            }

            const response = await fetch('/api/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(`Link created: ${window.location.origin}/${data.data.code}`);
                setUrl('');
                setCustomCode('');
                onSuccess();
            } else {
                setError(data.error || 'Failed to create link');
            }
        } catch (err) {
            setError('Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 className="text-lg font-semibold mb-4">Create Short Link</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                        Target URL *
                    </label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="input"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="customCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Custom Code (optional)
                    </label>
                    <input
                        type="text"
                        id="customCode"
                        value={customCode}
                        onChange={(e) => setCustomCode(e.target.value)}
                        placeholder="docs (6-8 characters)"
                        className="input"
                        pattern="[A-Za-z0-9]{6,8}"
                        title="6-8 alphanumeric characters"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Leave empty for auto-generated code
                    </p>
                </div>

                {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Link'}
                </button>
            </form>
        </div>
    );
}