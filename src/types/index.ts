export interface GetReferralsData {
  _id: string;
  givenName: string;
  surname: string;
  email: string;
  phone: string;
  homeName: string;
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetReferralsResponse {
  data: GetReferralsData[];
  total: number;
}

export type CreateReferralRequest = Omit<GetReferralsData, "_id" | "createdAt" | "updatedAt" | "__v">;