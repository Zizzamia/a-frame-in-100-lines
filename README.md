# A Frame in 100 lines (or less)

Farcaster Frames in less than 100 lines, and ready to be deployed to Vercel.

Have fun! ⛵️

## Files

### `app/page.tsx`

```tsx
import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: ['Next image'],
  image: 'https://zizzamia.xyz/park-1.png',
  post_url: 'https://zizzamia.xyz/api/frame',
});

export const metadata: Metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: ['https://zizzamia.xyz/park-1.png'],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>zizzamia.xyz</h1>
    </>
  );
}
```

### `app/layout.tsx`

```tsx
export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### `app/api/frame/route.ts`

```ts
import { FrameRequest, getFrameAccountAddress } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  try {
    const body: FrameRequest = await req.json();
    accountAddress = await getFrameAccountAddress(body, { NEYNAR_API_KEY: 'NEYNAR_API_DOCS' });
  } catch (err) {
    console.error(err);
  }

  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://zizzamia.xyz/park-2.png" />
    <meta property="fc:frame:button:1" content="${accountAddress}" />
    <meta property="fc:frame:post_url" content="https://zizzamia.xyz/api/frame" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
```

## Resources

- [Official Farcaster Frames docs](https://warpcast.notion.site/Farcaster-Frames-4bd47fe97dc74a42a48d3a234636d8c5)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
