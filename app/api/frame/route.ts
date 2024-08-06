import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { getXmtpFrameMessage } from '@coinbase/onchainkit/xmtp';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  let message = undefined;
  let state = {
    page: 0,
  };
  let buttonIndex;

  if (body.clientProtocol?.startsWith('xmtp@')) {
    const { isValid, message: frameMessage } = await getXmtpFrameMessage(body);

    if (!isValid) {
      return new NextResponse('Message not valid', { status: 500 });
    }
    message = frameMessage;
    buttonIndex = message?.buttonIndex;
    try {
      state = JSON.parse(decodeURIComponent(message?.state || ''));
    } catch (e) {
      console.error(e);
    }
  } else {
    const { isValid, message: frameMessage } = await getFrameMessage(body, {
      neynarApiKey: 'NEYNAR_ONCHAIN_KIT',
    });

    if (!isValid) {
      return new NextResponse('Message not valid', { status: 500 });
    }
    message = frameMessage;
    buttonIndex = message.button;
    try {
      state = JSON.parse(decodeURIComponent(message.state.serialized));
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Use this code to redirect to a different page
   */
  if (buttonIndex === 3) {
    return NextResponse.redirect(
      'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
      { status: 302 },
    );
  }

  return new NextResponse(
    getFrameHtmlResponse({
      accepts: { xmtp: '2021-02-01' },
      isOpenFrame: true,
      buttons: [
        {
          label: `State: ${state?.page || 0}`,
        },
        {
          action: 'link',
          label: 'OnchainKit',
          target: 'https://onchainkit.xyz',
        },
        {
          action: 'post_redirect',
          label: 'Dog pictures',
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/park-1.png`,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      state: {
        page: state?.page + 1,
        time: new Date().toISOString(),
      },
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
