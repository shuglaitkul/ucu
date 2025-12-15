export const testUser = {
    username: "admin",
    password: "admin2121"
};

export function validateUser(username: string, password: string) {
    return username === testUser.username && password === testUser.password;
}