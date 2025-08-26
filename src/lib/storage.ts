interface User {
    name: string,
    email: string,
    picture: string
}

export function saveUser(user: User) {
    localStorage.setItem("authUser", JSON.stringify(user));
}

export function getUser(): User | null {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("authUser");
    return data ? JSON.parse(data) : null;
}

export function clearUser() {
    localStorage.removeItem("authUser");
}