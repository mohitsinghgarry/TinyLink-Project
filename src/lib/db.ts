import { sql } from '@vercel/postgres';

export interface Link {
    id: number;
    code: string;
    target_url: string;
    clicks: number;
    created_at: Date;
    last_clicked_at: Date | null;
}

export async function initDatabase() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        code VARCHAR(8) UNIQUE NOT NULL,
        target_url TEXT NOT NULL,
        clicks INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_clicked_at TIMESTAMP
      )
    `;
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

export async function createLink(code: string, targetUrl: string): Promise<Link> {
    const result = await sql`
    INSERT INTO links (code, target_url)
    VALUES (${code}, ${targetUrl})
    RETURNING *
  `;
    return result.rows[0] as Link;
}

export async function getLink(code: string): Promise<Link | null> {
    const result = await sql`
    SELECT * FROM links WHERE code = ${code}
  `;
    return result.rows[0] as Link || null;
}

export async function getAllLinks(): Promise<Link[]> {
    const result = await sql`
    SELECT * FROM links ORDER BY created_at DESC
  `;
    return result.rows as Link[];
}

export async function incrementClicks(code: string): Promise<void> {
    await sql`
    UPDATE links 
    SET clicks = clicks + 1, last_clicked_at = CURRENT_TIMESTAMP
    WHERE code = ${code}
  `;
}

export async function deleteLink(code: string): Promise<boolean> {
    const result = await sql`
    DELETE FROM links WHERE code = ${code}
  `;
    return result.rowCount > 0;
}