import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { formatEther } from 'viem';
import { baseSepolia } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';
import type { Address } from 'viem';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const ethAddresses = message.interactor.verified_addresses.eth_addresses;
  const accountAddress = ethAddresses ? ethAddresses[0] as Address : '';

  if (!accountAddress) {
    return new NextResponse("Missing accountAddress", { status: 500 });
  }
  
  const txData: FrameTransactionResponse = {
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: [],
      to: accountAddress,
      value: formatEther(1000000000000000000n),
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
