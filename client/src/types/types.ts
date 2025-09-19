export type User = {
    userName: string | null,
    token: string | null,
}

export type LoginForm = {
    username: string,
    password: string,
    role: 'USER'
}

export type RegisterForm = {
    firstName: string | null,
    lastName: string | null,
    email: string,
    password: string,
}