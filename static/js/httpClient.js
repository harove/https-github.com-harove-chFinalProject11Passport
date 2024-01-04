// httpClient.js

export const httpClient = (url, method) => fetch(url, {
    method,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Other client-side code...
