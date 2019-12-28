export class User {
    aboutYou: string;
    age: number;
    agreetc: boolean;
    dob: string;
    email: string;
    gender: string;
    address: Address;
    language: string;
    mobNumber: string
    name: string;
    password: string;
    // uploadPhoto: Image;
    uploadPhoto: string;
    role: string;
}

export class Address {
    id: number;
    addLine1: string;
    addLine2: string;
    city: string;
    state: string;
    zipCode: number;
}

export class Product {
    _id?: number;
    sellerId: number;
    name: string;
    uploadPhoto: string;
    productDesc: string;
    mrp: number;
    dp: number;
    status: boolean;
    count: Number;
}

export class Order {
    id: number;
    userId: number;
    sellerId: number;
    product: Product;
    deliveryAddress: Address;
    contact: Number;
    date: string;
    time: string
}