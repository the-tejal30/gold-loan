import axiosInstance from "@/lib/axiosInstance";
import { CONSTANTS } from "@/integrations/constants";
import { SellGoldResponse, SellGoldPayload, ReleasePledgeGoldPayload, ReleasePledgeGoldResponse, UpdateGoldPricePayload, UpdateGoldPriceResponse, User, UserMobile } from "@/lib/types";

export const sellGoldForm = (data: SellGoldPayload): Promise<SellGoldResponse> => {
	return new Promise((resolve, reject) => {
		axiosInstance
			.post(CONSTANTS.SELL_GOLD_FORM, data)
			.then((response) => {
				sendToGoogleSheets(data, 'sell').catch(err =>
					console.error('Google Sheets backup failed:', err)
				);
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
				sendToGoogleSheets(data, 'sell').catch(err =>
					console.error('Google Sheets backup failed:', err)
				);
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

export const updateGoldPrice = (data: UpdateGoldPricePayload): Promise<UpdateGoldPriceResponse> => {
	return new Promise((resolve, reject) => {
		axiosInstance
			.post(CONSTANTS.UPDATE_GOLD_PRICE, data)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				console.error("Error sending Sell Gold form:", error);
				reject(error);
			});
	});
};

export const getAllUsers = (): Promise<User[]> => {
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(CONSTANTS.ALL_USER_INFO)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				console.error("Error fetching all users:", error);
				reject(error);
			});
	});
};

export const getSavedNumbers = (): Promise<UserMobile[]> => {
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(CONSTANTS.GET_SAVED_NUMBERS)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				console.error("Error fetching saved numbers:", error);
				reject(error);
			});
	});
};

export const getMetalPrices = (isGold: boolean): Promise<any> => {
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(`${CONSTANTS.GET_GOLD_PRICES}?isGold=${isGold}`)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				console.error("Error validating OTP:", error);
				reject(error);
			});
	});
};

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const sendToGoogleSheets = async (data: any, formType: string): Promise<void> => {
	try {
		if (!GOOGLE_SCRIPT_URL) {
			console.warn('Google Script URL not configured');
			return;
		}

		await fetch(GOOGLE_SCRIPT_URL, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				formType,
				...data,
			}),
		});

		console.log(`${formType} form data sent to Google Sheets`);
	} catch (error) {
		console.error(`Error sending ${formType} form to Google Sheets:`, error);
		// Don't throw error - let the main API call succeed even if Google Sheets fails
	}
};