export interface UserLogin {
    username: string;
    password: string;
}

export interface User {
    id: number;
    username: string;
    role: string;
    jwt: string;
}
