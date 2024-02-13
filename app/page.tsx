import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

// Encode the dynamic text for safe URL inclusion
const dynamicText = encodeURIComponent('724');
// Construct the URL for the OG image with the dynamic text
if (!process.env.NEXT_PUBLIC_URL) {
  throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_URL"');
}
const PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

const ogImageUrl = `${PUBLIC_URL}/api/og?episode_number=${dynamicText}`;

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
    aspectRatio: '1.91:1',
  },
  input: {
    text: 'Enter Segment Number',
  },
  postUrl: `${PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'tldl.eth',
  description: 'TLDL',
  metadataBase: new URL(PUBLIC_URL),
  openGraph: {
    title: 'tldl.eth',
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
      <h1>tldl.eth</h1>
    </>
  );
}
