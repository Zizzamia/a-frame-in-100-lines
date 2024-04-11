import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Captain #1',
    },
    {
      label: 'Captain #2',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/bg.jpg`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Test of frame',
  description: 'FFBet',
  openGraph: {
    title: '0xCptCG',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/bg.jpg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>0xCptCG</h1>
    </>
  );
}
