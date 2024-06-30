import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, parseUnits, toHex } from 'viem';
import { baseSepolia, sepolia } from 'viem/chains';
import { BAL_VAULT_ADDR } from '../../config';
import abi from '../../_contracts/tokenStable';
import { STABLE_CONTRACT_ADDR } from '../../config';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  // Remember to replace 'NEYNAR_ONCHAIN_KIT' with your own Neynar API key
  let { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
  isValid = true;

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const value = parseUnits('100', 6);
  let hexValue = BigInt(toHex(value, { size: 32 }).slice(2));

  const data = encodeFunctionData({
    abi: abi,
    functionName: 'approve',
    args: [BAL_VAULT_ADDR, hexValue],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${sepolia.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [],
      data,
      to: STABLE_CONTRACT_ADDR,
      value: '0',
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
