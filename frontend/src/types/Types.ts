import { RustResult } from "useink/utils";

export enum NetworkId {
  Shibuya = 0,
  Astar = 1,
}

export interface NetworkInfo {
  name: string;
  endpoint: string;
  contractAddress: string;
  tokenUnit: string;
}

export type SupplyResult = RustResult<{ value: number }, { err: { e: string } }>;