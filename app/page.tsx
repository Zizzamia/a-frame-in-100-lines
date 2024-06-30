import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'tx',
      label: 'Approve & Buy Position in A',
      target: `${NEXT_PUBLIC_URL}/api/tx`,
      postUrl: `${NEXT_PUBLIC_URL}/api/confirm`,
    },
    {
      action: 'tx',
      label: 'Approve & Buy Position in B',
      target: `${NEXT_PUBLIC_URL}/api/tx`,
    },
    {
      action: 'tx',
      label: 'Approve & Buy Position for Draw ',
      target: `${NEXT_PUBLIC_URL}/api/tx`,
      postUrl: `${NEXT_PUBLIC_URL}/api/tx-success`,
    },
  ],
  image: {
    src: `https://raw.githubusercontent.com/Aheesh/buidl-portfolio/main/public/IRLChess-Sepolia.webp`,
    aspectRatio: '1:1',
  },
  input: {
    text: '100 $DEGEN',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/confirm`,
});

export const metadata: Metadata = {
  title: 'Baller Chess',
  description: 'Game 1',
  openGraph: {
    title: 'Baller Chess',
    description: 'Toy Game 1',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Default Page for Baller Chess</h1>
    </>
  );
}
