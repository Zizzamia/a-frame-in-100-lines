import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const text = url.searchParams.get('text') || 'Hello, World!';

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'black',
          backgroundSize: '150px 150px',
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
        }}
      >
        {text}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
