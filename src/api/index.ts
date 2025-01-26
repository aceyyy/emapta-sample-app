import axios from "axios";
import { CreateReferralRequest, GetReferralsData, GetReferralsResponse } from "../types";

const endpointURL = "http://localhost:3000/api/";
const axiosInstance = axios.create({ baseURL: endpointURL });

export const fetchReferrals = async (): Promise<GetReferralsResponse> => {
  try {
    const response = await axiosInstance.get("referrals");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReferral = async (body: CreateReferralRequest): Promise<GetReferralsData> => {
  try {
    const response = await axiosInstance.post("referrals", body, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};