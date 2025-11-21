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

export function formatDate(date: Date | null): string {
    if (!date) return 'Never';
    return new Date(date).toLocaleString();
}