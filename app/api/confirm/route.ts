import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { get } from 'http';
import { BalancerSDK, Network, SwapType } from '@balancer-labs/sdk';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  //QueryBatchSwap to get the expected amount of tokens Out for confirmation
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
      amount: String(100e18),
      userData: '0x',
    },
  ];
  const assets = [tokenIn, tokenOut];

  const queryInfo = await sdk.swaps.queryBatchSwap({
    kind: SwapType.SwapExactIn,
    swaps,
    assets,
  });

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: 'tx',
          label: `Confirm ${queryInfo} Player A Swap`,
          target: `${NEXT_PUBLIC_URL}/api/swap`,
        },
        { action: 'link', label: 'Cancel Transaction', target: `${NEXT_PUBLIC_URL}` },
      ],
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
