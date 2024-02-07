import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import App from './App';

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
      label: 'Redirect to cute pictures',
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
  title: 'indexer.xyz',
  description: 'frame lab 1',
  openGraph: {
    title: 'indexer.xyz',
    description: 'frame lab 1',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <App />
    </>
  );
}
