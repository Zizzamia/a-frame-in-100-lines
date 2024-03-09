import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, parseEther } from 'viem';
import { base } from 'viem/chains';
import BuyMeACoffeeABI from '../../_contracts/BuyMeACoffeeABI';
import { BUY_MY_COFFEE_CONTRACT_ADDR } from '../../config';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const data = encodeFunctionData({
    abi: BuyMeACoffeeABI,
    functionName: 'buyCoffee',
    args: [parseEther('1'), 'Coffee all day!'],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${base.id}`, // Remember Base Sepolia might not work on Warpcast yet
    method: 'eth_sendTransaction',
    params: {
      abi: [],
      data,
      to: BUY_MY_COFFEE_CONTRACT_ADDR,
      value: parseEther('0.00004').toString(), // 0.00004 ETH
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
