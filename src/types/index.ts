export interface Link {
    id: number;
    code: string;
    target_url: string;
    clicks: number;
    created_at: Date;
    last_clicked_at: Date | null;
}

export interface CreateLinkRequest {
    url: string;
    customCode?: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}