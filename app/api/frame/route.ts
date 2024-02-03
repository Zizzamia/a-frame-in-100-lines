import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_URL = 'https://zizzamia.xyz';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let button_2: bool | undefined = '';
  let button_3: string | undefined = '';
  let button_4: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
    button_2 = message.following;
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `🌲 ${accountAddress} 🌲`,
        },
        {
          label: `${button_2}`,
        }
      ],
      image: `https://spotify-gallery-00.vercel.app/ying_yang_mid.png`,
      post_url: `https://spotify-gallery-00.vercel.app/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
