import { Inject } from "@nestjs/common";
import { Near, WalletConnection } from "near-api-js";

export class NearService {
  accountId: string;
  networkId: string;
  walletConnection: WalletConnection;

  constructor(@Inject("NEAR_CONFIG") private readonly near: Near) {
    const accountId = process.env.ACCOUNT_ID || "";
    if (!accountId) throw Error("ACCOUNT_ID environment variable is empty");

    this.accountId = accountId;
    this.networkId = process.env.NETWORK_ID || "testnet";
    this.walletConnection = new WalletConnection(near, accountId);
  }

  getAccount() {
    return this.near.account(this.accountId);
  }
}
