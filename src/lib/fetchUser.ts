export async function fetchRandomUser() {
    const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
    if (!res.ok) throw new Error("Failed to fetch user");
    const data = await res.json();
    return {
        name: `${data.results[0].name.first} ${data.results[0].name.last}`,
        email: data.results[0].email,
        picture: data.results[0].picture.medium,
    };
}