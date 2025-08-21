/**
 * get vercel base url
 */
export function getBaseUrl() {
    if (process.env.VERCEL_ENV === "production") {
        // For production, use the production URL or a custom domain
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    } else if (process.env.VERCEL_URL) {
        // For preview deployments, use the dynamic Vercel URL
        return `https://${process.env.VERCEL_URL}`;
    } else {
        // For local development
        return `http://localhost:3000`;
    }
}
