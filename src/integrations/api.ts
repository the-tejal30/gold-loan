import axiosInstance from "@/lib/axiosInstance";
import { CONSTANTS } from "@/integrations/constants";
import { SellGoldResponse, SellGoldPayload, ReleasePledgeGoldPayload, ReleasePledgeGoldResponse } from "@/lib/types";

export const sellGoldForm = (data: SellGoldPayload): Promise<SellGoldResponse> => {
	return new Promise((resolve, reject) => {
		axiosInstance
			.post(CONSTANTS.SELL_GOLD_FORM, data)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				console.error("Error sending Sell Gold form:", error);
				reject(error);
			});
	});
};

export const releasePledgeGoldForm = (data: ReleasePledgeGoldPayload): Promise<ReleasePledgeGoldResponse> => {
	return new Promise((resolve, reject) => {
		axiosInstance
			.post(CONSTANTS.RELEASE_PLEDGE_GOLD, data)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				console.error("Error sending Release Pledge Gold form:", error);
				reject(error);
			});
	});
};

export const sendOtp = (mobileNumber: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(`${CONSTANTS.SEND_OTP}?mobileNumber=${mobileNumber}`)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				console.error("Error sending OTP:", error);
				reject(error);
			});
	});
};

export const validateOtp = (mobileNumber: string, otp: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(`${CONSTANTS.VALIDATE_OTP}${mobileNumber}/${otp}`)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				console.error("Error validating OTP:", error);
				reject(error);
			});
	});
};