export const testUser = {
    username: "admin",
    password: "123456"
};

export function validateUser(username: string, password: string) {
    return username === testUser.username && password === testUser.password;
}