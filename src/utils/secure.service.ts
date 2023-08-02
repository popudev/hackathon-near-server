import * as crypto from "crypto-js";
export class SecureCrypt {
  public static encrypt(value: string) {
    if (!process.env.SECRET_KEY) throw new Error("Gắn serect key vô để mã hóa dữ liệu lưu xuống blockchain");
    const encryptedValue = crypto.AES.encrypt(value, process.env.SECRET_KEY).toString();
    return encryptedValue;
  }

  public static decrypt(code: string) {
    if (!process.env.SERECT_KEY) throw new Error("Gắn serect key vô để mã hóa dữ liệu lưu xuống blockchain");
    return crypto.AES.decrypt(code, process.env.SERECT_KEY).toString(crypto.enc.Utf8);
  }
}
