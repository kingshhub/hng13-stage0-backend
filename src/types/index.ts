export interface User {
    email: string;
    name: string;
    stack: string;
}

export interface ApiResponse {
    status: 'success';
    user: User;
    timestamp: string;
    fact: string;
}

export interface CatFactResponse {
    fact: string;
    length: number;
}