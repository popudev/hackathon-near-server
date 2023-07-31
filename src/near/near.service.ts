import { Inject } from "@nestjs/common";
import { Contract, Near, WalletConnection } from "near-api-js";
import { NearContract } from "./near.types";

type ContractOptions = {
  viewMethods: string[];
  changeMethods: string[];
};

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

  async getContract(options: ContractOptions) {
    if (!process.env.CONTRACT_ID) throw Error("CONTRACT_ID environment variable is empty");

    console.log(this.walletConnection);
    const account = await this.near.account(this.accountId);

    const contract: any = new Contract(account, process.env.CONTRACT_ID, options);

    return contract as NearContract;
  }
}
