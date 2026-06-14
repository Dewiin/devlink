const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function api(
    path: string,
    options: RequestInit = {},
    accessToken: string = "",
) { 
    let response = await fetch(`${VITE_API_URL}${path}`, {
        ...options,
        headers: {"Authorization": `Bearer ${accessToken}`},
        credentials: "include"
    });

    if(response.status === 401) {
        const refreshResponse = await fetch('/api/auth/refresh', {
            method: "GET",
            credentials: "include"
        });

        const data = await refreshResponse.json();
        localStorage.setItem("accessToken", data.accessToken);
        
        response = await fetch(`${VITE_API_URL}${path}`, {
            ...options,
            headers: {"Authorization": `Bearer ${data.accessToken}`},
            credentials: "include"
        });
    }

    let result = await response.json();
    if(!response.ok) {
        // toast
        result = null;
    } else {
        // toast
    }

    return result;
}