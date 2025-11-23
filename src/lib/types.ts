export interface SellGoldPayload {
    name: string;
    mobileNumber: string;
    gold_weight: string;
    location: string;
}

export interface SellGoldResponse {
    id: number;
    name: string;
    mobileNumber: string;
    gold_weight: string;
    location: string;
}

export interface ReleasePledgeGoldPayload {
    name: string;
    mobileNumber: string;
    gold_weight: string;
    location: string;
    bank: string;
    loanAmount: number;
}

export interface ReleasePledgeGoldResponse {
    id: number;
    name: string;
    mobileNumber: string;
    loanAmount: number;
    gold_weight: string;
    location: string;
}

export interface UpdateGoldPricePayload {
    gold_price: number;
    silver_price: number;
}

export interface PriceDetailsResponse {
    id: number;
    gold_price: number;
    currentDateTime: string;
}

export interface UpdateGoldPriceResponse {
    data: PriceDetailsResponse[];
    message: string;
}

export interface User {
    id: number;
    name: string;
    mobileNumber: string;
    goldWeight: string;
    location: string;
    bank: string;
    loanAmount: number
    createdAt: string;
    type: string;
}

export interface UserMobile {
    id: number;
    mobileNumber: string;
    lastLogin: string;
}