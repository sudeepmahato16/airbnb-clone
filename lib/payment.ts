"use server";

import crypto from "crypto";

export async function verifyEsewaData(data: string) {
  const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

  const { signed_field_names, signature } = decoded;
  const fieldNames = signed_field_names.split(",");

  const signedData = fieldNames
    .map((field: string) => `${field}=${decoded[field]}`)
    .join(",");

  const secret = process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY || "your-secret-key";

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(signedData)
    .digest("base64");

  const isValid = expectedSignature === signature;

  return {
    isValid,
    data: decoded,
    expectedSignature,
    receivedSignature: signature,
  };
}

export async function generateEsewaSignature(
  secretKey: string,
  message: string
): Promise<string> {
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(message);
  return hmac.digest("base64");
}
