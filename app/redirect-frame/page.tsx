import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Redirect to cute dog pictures',
      action: 'post_redirect',
    },
  ],
  image: `${NEXT_PUBLIC_URL}/park-1.png`,
  post_url: `${NEXT_PUBLIC_URL}/api/frame-redirect`,
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
