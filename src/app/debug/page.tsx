'use client';

import { useState } from 'react';

export default function DebugPage() {
    const [testResults, setTestResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testDatabase = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/test-db');
            const data = await response.json();
            setTestResults(data);
        } catch (error) {
            setTestResults({ error: 'Failed to test database' });
        } finally {
            setLoading(false);
        }
    };

    const testClickIncrement = async (code: string) => {
        if (!code) return;

        setLoading(true);
        try {
            const response = await fetch(`/api/debug/${code}`, {
                method: 'POST'
            });
            const data = await response.json();
            setTestResults(data);
        } catch (error) {
            setTestResults({ error: 'Failed to test click increment' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Debug Tools</h1>

            <div className="space-y-6">
                <div className="card">
                    <h2 className="text-lg font-semibold mb-4">Database Connection Test</h2>
                    <button
                        onClick={testDatabase}
                        disabled={loading}
                        className="btn btn-primary"
                    >
                        {loading ? 'Testing...' : 'Test Database'}
                    </button>
                </div>

                <div className="card">
                    <h2 className="text-lg font-semibold mb-4">Click Increment Test</h2>
                    <div className="flex space-x-2 mb-4">
                        <input
                            type="text"
                            placeholder="Enter link code"
                            className="input flex-1"
                            id="codeInput"
                        />
                        <button
                            onClick={() => {
                                const input = document.getElementById('codeInput') as HTMLInputElement;
                                testClickIncrement(input.value);
                            }}
                            disabled={loading}
                            className="btn btn-primary"
                        >
                            {loading ? 'Testing...' : 'Test Click'}
                        </button>
                    </div>
                    <button
                        onClick={async () => {
                            setLoading(true);
                            try {
                                const response = await fetch('/api/reset-db', { method: 'POST' });
                                const data = await response.json();
                                setTestResults(data);
                            } catch (error) {
                                setTestResults({ error: 'Failed to reset database' });
                            } finally {
                                setLoading(false);
                            }
                        }}
                        disabled={loading}
                        className="btn btn-danger text-sm"
                    >
                        Reset Database
                    </button>
                </div>

                {testResults && (
                    <div className="card">
                        <h2 className="text-lg font-semibold mb-4">Test Results</h2>
                        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                            {JSON.stringify(testResults, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}