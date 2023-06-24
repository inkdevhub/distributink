export enum NetworkId {
  Shibuya = 0,
  Astar = 1,
  Local = 2,
}

export interface NetworkInfo {
  name: string;
  endpoint: string;
  contractAddress: string;
  tokenUnit: string;
}

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
    contractAddress: 'Z5Wsctz3adkDeoJaTejFFrgWPQGbwqMCunwNqRhjv6uJHA8',
    tokenUnit: "ASTR",
  },
  {
    name: "Local",
    endpoint: "ws://localhost:9944",
    contractAddress: '5Co2NCuMQ8jtPpvcgi84XLJug3snF2qrUrEBmxhZ3hyEtfJX',
    tokenUnit: "ASTR",
  }
];

export const contractAddress = networks[NetworkId.Shibuya].contractAddress;
export const tokenUnit = networks[NetworkId.Shibuya].tokenUnit;
export const endpoint = networks[NetworkId.Shibuya].endpoint;