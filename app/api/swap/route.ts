import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { BalancerSDK, Network, SwapType, Swaps } from '@balancer-labs/sdk';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  console.log('body', body);
  const address = (body.untrustedData as any).address;
  console.log('address', address);
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYMAR_ONCHAIN_KIT' });
  console.log('message', message);

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

  const value = String(10e18);

  const encodeBatchSwapData = Swaps.encodeBatchSwap({
    kind: SwapType.SwapExactIn,
    swaps: [
      {
        poolId: '0xc8503e1a4e439800dea3424cbfc085cbeb6c3bfe000100000000000000000172',
        assetInIndex: 0,
        assetOutIndex: 1,
        amount: value,
        userData: '0x',
      },
    ],
    assets: [tokenIn, tokenOut],

    funds: {
      fromInternalBalance: false,
      recipient: address,
      sender: address,
      toInternalBalance: false,
    },
    limits: [value, '0'],
    deadline: Math.ceil(Date.now() / 1000) + 60 * 2,
  });

  const txData = {
    chainId: `eip155:${Network.BASE}`,
    method: 'eth_sendTransaction',
    params: {
      to: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      data: encodeBatchSwapData,
      value: '0',
    },
  };
  console.log('txData', txData);

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
