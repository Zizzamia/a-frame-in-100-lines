import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const NEXT_PUBLIC_URL = 'https://zizzamia.xyz';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Click Me',
    },
  ],
  image: `https://spotify-gallery-00.vercel.app/park-1.png`,
  post_url: `https://spotify-gallery-00.vercel.app/api/frame`,
});

export const metadata: Metadata = {
  title: 'testing.yup',
  description: 'LFG',
  openGraph: {
    title: 'mane to main',
    description: 'LFG',
    images: [`https://spotify-gallery-00.vercel.app/waves_mid.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>mane to main</h1>
    </>
  );
}
