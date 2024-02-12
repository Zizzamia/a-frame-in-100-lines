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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          color: 'white',
          background: 'black',
          fontSize: '48px',
          boxSizing: 'border-box',
          padding: '100px',
          textAlign: 'center',
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
