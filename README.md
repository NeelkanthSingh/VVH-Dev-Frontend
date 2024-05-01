What to do before pushing to production.

In the production environment, the following steps should be taken before pushing to production:
Create a .env file in the frontend directory with the following variables:
```VITE_GOOGLE_API_TOKEN = 
Create a file called vercel.json in the frontend directory with the following content:
{
    "rewrites": [
        {"source": "/(.*)", "destination": "/"}
    ]
}
This ensures the client-side routing works correctly in production.
```

In the file SignIn.jsx, replace the window.location.href with the production URL, which is "https://api.versionvaulthub.com/auth/google"

In the file axios.js, replace the BASE_URL with the production URL, which is "https://api.versionvaulthub.com/"