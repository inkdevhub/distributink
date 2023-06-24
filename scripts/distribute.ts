import { cryptoWaitReady } from '@polkadot/util-crypto';
import { executeCalls, getApi, getCall, getContract, getSigner } from './common_api';
import { SubmittableExtrinsic } from '@polkadot/api-base/types';
import { ISubmittableResult } from '@polkadot/types/types';
import Keyring from '@polkadot/keyring';
import { contractAddress } from './consts';
import dotenv from 'dotenv';
const fs = require('fs').promises;

const createBatchUsers = (amount: number): string[] => {
  const keyring = new Keyring({ type: 'sr25519' });
  const users = new Array();
  for (let i = 0; i < amount; i++) {
      users.push(keyring.addFromUri(`//user${i}`));
  }
  return users.map(x => x.address);
}

export const readAddresses = async (): Promise<string[]> => {
  const addresses = await fs.readFile('./addresses.csv', 'utf8');
  return addresses.split(',');
};

export const distribute = async(): Promise<void> => {
  dotenv.config();
  await cryptoWaitReady();
  const api = await getApi();
  const contract = await getContract(contractAddress);
  const signer = getSigner(process.env.MNEMONICS || '//Alice');
  const calls: SubmittableExtrinsic<'promise', ISubmittableResult>[] = [];
  const addresses = await readAddresses();
  const MAX_ADDRESSES_PER_CALL = 500;
  const AMOUNT_TO_DISTRIBUTE = BigInt(1000000000000000);

  const batchCount = Math.floor(addresses.length / MAX_ADDRESSES_PER_CALL) + 1; // most likely number of addresses divided by some constant.
  for (let i = 0; i < batchCount; i++) {
    const addressesToSend = addresses.splice(i * MAX_ADDRESSES_PER_CALL, MAX_ADDRESSES_PER_CALL);
    calls.push(
      await getCall(
        contract,
        'distributeEqual',
        signer,
        AMOUNT_TO_DISTRIBUTE * BigInt(addressesToSend.length),
        addressesToSend,
        AMOUNT_TO_DISTRIBUTE
      )
    );
  }

  // Execute add asset entry calls
  console.log(`Executing batch ${calls.length}`);
  await executeCalls(calls, signer);
  console.log('Batch call executed.');

  process.exit(0);
};

distribute();