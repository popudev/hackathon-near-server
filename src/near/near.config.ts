import { KeyPair, keyStores, connect } from "near-api-js";

const factory = async () => {
  const privateKey = process.env.PRIVATE_KEY;
  const accountId = process.env.ACCOUNT_ID;
  const networkId = process.env.NETWORK_ID || "testnet";
  if (!privateKey) throw Error("PRIVATE_KEY environment variable is empty");
  if (!accountId) throw Error("ACCOUNT_ID environment variable is empty");

  const myKeyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(privateKey);
  myKeyStore.setKey(networkId, accountId, keyPair);

  const connectionConfig = {
    networkId: networkId,
    keyStore: myKeyStore,
    nodeUrl: "https://rpc.testnet.near.org",
  };
  // connect to NEAR
  const nearConnection = await connect(connectionConfig);
  return nearConnection;
};

export const NearFactory = {
  provide: "NEAR_CONFIG",
  useFactory: factory,
};
