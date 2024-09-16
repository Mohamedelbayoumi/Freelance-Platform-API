export interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    country: string,
    role: "freelancer" | "client"
}