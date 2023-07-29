import * as crypto from "crypto-js";
export class SecureCrypt {
  public static encrypt<T>(classInstance: T) {
    if (!process.env.SERECT_KEY) throw new Error("Gắn serect key vô để mã hóa dữ liệu lưu xuống blockchain");
    const encryptedObj = {};
    for (const key in classInstance) {
      const encryptedValue = crypto.AES.encrypt(classInstance[key] + "", process.env.SERECT_KEY).toString();
      encryptedObj[key + ""] = encryptedValue;
    }
    return encryptedObj;
  }

  public static decrypt<T>(string: string) {}
}
