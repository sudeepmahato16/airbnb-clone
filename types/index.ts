import { IconType } from "react-icons";

export interface Category {
  label: string;
  icon: IconType;
  description?: string;
}

export type PaymentMethod = "esewa" | "khalti";

export interface PaymentRequestData {
  amount: string;
  productName: string;
  transactionId: string;
  method: PaymentMethod;
  startDate: Date;
  listingId: string;
  endDate: Date
}

export interface EsewaConfigData {
  amount: string;
  tax_amount: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  product_service_charge: string;
  product_delivery_charge: string;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}

export interface EsewaResponse {
  esewaConfig: EsewaConfigData;
}

export interface KhaltiConfigData {
  return_url: string;
  website_url: string;
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface KhaltiResponse {
  khaltiPaymentUrl: string;
}

export interface DummyDataResponse {
  amount: string;
  productName: string;
  transactionId: string;
}