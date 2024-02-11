import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

// Encode the dynamic text for safe URL inclusion
const dynamicText = encodeURIComponent("Let's get into it");
// Construct the URL for the OG image with the dynamic text
const ogImageUrl = `${NEXT_PUBLIC_URL}/api/og?text=${dynamicText}`;

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Story time!',
    },
    {
      action: 'link',
      label: 'Link to Google',
      target: 'https://www.google.com',
    },
    {
      label: 'Redirect to pictures',
      action: 'post_redirect',
    },
  ],
  image: {
    src: ogImageUrl,
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
    images: [ogImageUrl],
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
