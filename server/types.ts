export interface User {
    id: string;
    username: string;
};

export interface FullUser extends User {
    firstname: string;
    lastname: string;
    email: string;
    birthday: string;
    password: string;
    is_admin: boolean;
    photo_URL: string;
    active: boolean;
    created_at?: string;
}

export type UserDetails = Omit<FullUser, "active" | "id"> & Partial<Pick<FullUser, "is_admin" | "photo_URL">>

export type Product = {
    name: string,
    id?: string,
    photo_URL?: string,
    price?: Float32Array,
    stock_left?: string,
    active?: boolean
}