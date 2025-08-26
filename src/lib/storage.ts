export interface User {
    name: string,
    email: string,
    picture: string
}

export function saveUser(user: User) {
    document.cookie = "auth=true; path=/; max-age=86400";
    localStorage.setItem("authUser", JSON.stringify(user));
}

export function getUser(): User | null {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("authUser");
    return data ? JSON.parse(data) : null;
}

export function clearUser() {
    document.cookie = "auth=; path=/; max-age=0";
    localStorage.removeItem("authUser");
}