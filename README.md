# A Frame in 100 lines (or less)

Farcaster Frames in less than 100 lines, and ready to be deployed to Vercel.

To test a Frame, use: https://warpcast.com/~/developers/frames.

And let us know what you build by either mentioning @zizzamia on [Warpcast](https://warpcast.com/zizzamia) or [X](https://twitter.com/Zizzamia).

<br />

Have fun! ⛵️

<br />

## App Routing files

- app/
  - [config.ts](https://github.com/Zizzamia/a-frame-in-100-lines?tab=readme-ov-file#appconfigts)
  - [layout.tsx](https://github.com/Zizzamia/a-frame-in-100-lines?tab=readme-ov-file#applayouttsx)
  - [page.tsx](https://github.com/Zizzamia/a-frame-in-100-lines?tab=readme-ov-file#apppagetsx)
- api/
  - frame/
    - [route.ts](https://github.com/Zizzamia/a-frame-in-100-lines?tab=readme-ov-file#appapiframeroutets)

<br />

### `app/page.tsx`

```tsx
import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Tell me the story',
    },
    {
      label: 'Redirect to cute dog pictures',
      action: 'post_redirect',
    },
  ],
  image: `${NEXT_PUBLIC_URL}/park-1.png`,
  input: {
    text: 'Tell me a boat story',
  },
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
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

### `app/config.ts`
```ts
export const NEXT_PUBLIC_URL = 'https://zizzamia.xyz';
```

### `app/api/frame/route.ts`

```ts
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (message?.input) {
    text = message.input;
  }

  if (message?.button === 2) {
    return NextResponse.redirect(
      'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
      { status: 302 },
    );
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `🌲 Text: ${text}`,
        },
      ],
      image: `${NEXT_PUBLIC_URL}/park-2.png`,
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
```

<br />

## Resources

- [Official Farcaster Frames documentation](https://docs.farcaster.xyz/learn/what-is-farcaster/frames)
- [Official Farcaster Frame specification](https://docs.farcaster.xyz/reference/frames/spec)
- [OnchainKit documentation](https://github.com/coinbase/onchainkit)

<br />

## The Team and Our Community ☁️ 🌁 ☁️

A Farcaster Frame in 100 Lines is all about community. If you have any questions, feel free to reach out to the core maintainers on Twitter or through Farcaster.

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <a href="https://twitter.com/Zizzamia">
          <img width="80" height="80" src="https://github.com/zizzamia.png?s=100">
        </a>
        <br />
        <a href="https://twitter.com/Zizzamia">Leonardo Zizzamia</a>
      </td>
      <td align="center" valign="top">
        <a href="https://warpcast.com/cnasc">
          <img width="80" height="80" src="https://github.com/cnasc.png?s=100">
        </a>
        <br />
        <a href="https://warpcast.com/cnasc">Chris Nascone</a>
      </td>
      <td align="center" valign="top">
        <a href="https://twitter.com/0xr0b_eth">
          <img width="80" height="80" src="https://github.com/robpolak.png?s=100">
        </a>
        <br />
        <a href="https://twitter.com/0xr0b_eth">Rob Polak</a>
      </td>
    </tr>
  </tbody>
</table>

<br />

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
