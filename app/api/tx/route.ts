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

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  //const value = parseUnits('100', 6);
  const value = BigInt('0x0000000000000000000000000000000000000000000000000000000005F5E100');
  //let hexValue = BigInt('0x' + toHex(value, { size: 32 }).slice(2));

  const data = encodeFunctionData({
    abi: abi,
    functionName: 'approve',
    args: [BAL_VAULT_ADDR, value],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${sepolia.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [],
      data: data,
      to: '0x1c7d4b196cb0c7b01d743fbc6116a902379c7238',
      value: '0',
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
