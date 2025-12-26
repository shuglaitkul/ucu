export const testUser = {
    username: "admin",
    password: "admin2121",
    // checker, planner, crane
    role: "crane"
};

export function validateUser(username: string, password: string) {
    const ok = username === testUser.username && password === testUser.password;
    try {
        if (typeof window !== 'undefined') {
            window.console.log(`[auth] validateUser: username=${username} result=${ok}`);
        } else {
            console.log(`[auth] validateUser: username=${username} result=${ok}`);
        }
    } catch {
    }
    return ok;
}

export function getUser(username: string) {
    try {
        if (typeof window !== 'undefined') {
            window.console.log(`[auth] getUser: username=${username}`);
        } else {
            console.log(`[auth] getUser: username=${username}`);
        }
    } catch {}
    if (username === testUser.username) {
        const u = { username: testUser.username, role: testUser.role };
        try {
            if (typeof window !== 'undefined') window.console.log(`[auth] getUser ->`, u);
            else console.log(`[auth] getUser ->`, u);
        } catch {}
        return u;
    }
    try {
        if (typeof window !== 'undefined') window.console.log(`[auth] getUser -> null`);
        else console.log(`[auth] getUser -> null`);
    } catch {}
    return null;
}