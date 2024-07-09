import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { BalancerSDK, Network, SwapType } from '@balancer-labs/sdk';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  console.log('body', body);
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYMAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  //Call Swap function to swap DEGEN for Pa/Pb/D tokens
  const providerApiKey = process.env.BASE_PROVIDER_API_KEY;

  const sdk = new BalancerSDK({
    network: Network.BASE,
    rpcUrl: `https://base-mainnet.g.alchemy.com/v2/${providerApiKey}`,
  });

  const tokenIn = '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed';
  const tokenOut = '0xaA4eC2d86E61632E88Db93cf6D2a42E5f458DC99';

  const swaps = [
    {
      poolId: '0xc8503e1a4e439800dea3424cbfc085cbeb6c3bfe000100000000000000000172',
      assetInIndex: 0,
      assetOutIndex: 1,
      amount: String(10e18),
      userData: '0x',
    },
  ];

  const assets = [tokenIn, tokenOut];

  // const funds =[ {
  //     fromInternalBalance: false,
  //     recipient: msg.sender,
  //     sender: address,
  //     toInternalBalance: false,
  //   },
  // ]

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [{ action: 'link', label: 'Cancel Transaction', target: `${NEXT_PUBLIC_URL}` }],
      image: {
        src: `${NEXT_PUBLIC_URL}/park-1.png`,
      },
      postUrl: `${NEXT_PUBLIC_URL}`,
    }),
  );
}
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
