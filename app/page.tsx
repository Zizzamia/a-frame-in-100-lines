import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Story time!',
    },
    {
      action: 'link',
      label: 'Link to TLDL',
      target: 'https://tldl.media',
    },
    {
      label: 'Redirect to pictures',
      action: 'post_redirect',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/park-3.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Tell me a boat story',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'sters.eth',
  description: 'TLDL',
  metadataBase: new URL(NEXT_PUBLIC_URL),
  openGraph: {
    title: 'sters.eth',
    description: 'LFG',
    images: [
      'https://tldl.media/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthe-daily-gwei.9a503ff5.jpg&w=96&q=75',
    ],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>sters.eth</h1>
    </>
  );
}
