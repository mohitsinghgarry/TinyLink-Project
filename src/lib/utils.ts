export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function isValidCode(code: string): boolean {
    return /^[A-Za-z0-9]{6,8}$/.test(code);
}

export function generateRandomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function truncateUrl(url: string, maxLength: number = 50): string {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
}

export function formatDate(date: Date | string | null): string {
    if (!date) return 'Never';

    const d = new Date(date);

    // Use the user's locale/timezone by default so displayed times reflect their environment.
    return d.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}