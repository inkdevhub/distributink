import { NetworkId, NetworkInfo, } from "../types";

export const networks: Array<NetworkInfo> = [
  {
    name: "Shibuya",
    endpoint: "wss://rpc.shibuya.astar.network",
    contractAddress: "bbEp5ncPJoYaXp34dEFtF9tLSyvCAmc4fNM1MCYpD1uMFq1",
    tokenUnit: "SBY",
  },
  {
    name: "Astar",
    endpoint: "wss://rpc.astar.network",
    contractAddress: '0',
    tokenUnit: "ASTR",
  }
];

export const contractAddress = networks[NetworkId.Shibuya].contractAddress;
export const tokenUnit = networks[NetworkId.Shibuya].tokenUnit;