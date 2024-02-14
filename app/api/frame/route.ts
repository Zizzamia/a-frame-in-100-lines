// app/api/frame/route.ts

import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  // Get URL
  if (!process.env.NEXT_PUBLIC_URL) {
    throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_URL"');
  }  
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

  let accountAddress: string | undefined = '';
  const episodeNumber: string = '725';
  let segmentNumber: string = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }
  
  // Check episodeNumber
  const episodeNumberInt = parseInt(episodeNumber, 10); 
  if (isNaN(episodeNumberInt)) {
    throw new Error('Invalid Episode number provided');
  }

  // Check segmentNumber blank
  if (!message?.input) {
    throw new Error('No input text provided');
  }

  // Validate the segment number T
  const segmentNumberInt = parseInt(message.input, 10); 
  if (isNaN(segmentNumberInt)) {
    throw new Error('Invalid Segment number provided');
  }
  segmentNumber = message.input

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Segment: ${segmentNumber} 🌲`,
        },
      ],
      image: {
        src: `${PUBLIC_URL}/api/og?episode_number=${episodeNumber}`,
      },
      postUrl: `${PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';


// src: `${PUBLIC_URL}/api/segment?episode_number=${episodeNumber}?segment_number=${segmentNumber}`,
// 