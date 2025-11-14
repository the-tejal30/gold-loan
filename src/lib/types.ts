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
}

export interface ReleasePledgeGoldResponse {
    id: number;
    name: string;
    mobileNumber: string;
    gold_weight: string;
    location: string;
}