import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const NEXT_PUBLIC_URL = 'https://zizzamia.xyz';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Click Me',
    },
  ],
  image: `${NEXT_PUBLIC_URL}/park-1.png`,
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'testing.yup',
  description: 'LFG',
  openGraph: {
    title: 'testing.yup',
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
      <h1>testing.yup</h1>
    </>
  );
}
