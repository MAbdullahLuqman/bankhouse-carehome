export type EnquiryStatus = "new" | "contacted" | "visit-booked" | "closed";

export type AdminEnquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  enquiryType: "visit" | "care" | "fees" | "other";
  message: string;
  visitDate: string | null;
  visitTime: string | null;
  status: EnquiryStatus;
  createdAt: string | null;
};
