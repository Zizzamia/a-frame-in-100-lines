import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'WBTC',
      action: 'post_redirect',
    },
    {
      label: 'ETH',
      action: 'post_redirect',
    },
  ],
  image: `${NEXT_PUBLIC_URL}/fetch-crypto-prices.png`,
  // input: {
  //   text: 'Tell me a boat story',
  // },
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'crypto price fetcher',
  description: 'get token prices',
  openGraph: {
    title: 'crypto price fetcher',
    description: 'get token prices',
    images: [`${NEXT_PUBLIC_URL}/fetch-crypto-prices.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <p className="text-md mb-2">
        Swap on <a href="https://matcha.xyz">Matcha.xyz 🍵</a>
      </p>
    </>
  );
}
