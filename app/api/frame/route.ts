import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

interface TrackInfo {
  trackName: string;
  artist: string;
  genre: string;
  imageUrl: string;
  playlink: string;
}
var token = "";
async function authenticateSpotify() {
  const url = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Authorization': 'Basic ' + btoa(process.env.client_id + ':' + process.env.client_secret),
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    token = data.access_token;
    console.log(token);
  })
  .catch(error => console.error('Error:', error));
}

// Returns a recommended Spotify song
async function getRecommendedSong(){
  const url = `https://api.spotify.com/v1/recommendations?limit=1`;
  try {
    const spotifyResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(spotifyResponse);
    return spotifyResponse;
  } catch(error) {
    console.error("Spotify Recommendation Error", error);
  }
}

// TOOD
// Authenticate for API token
// Get tracks: house, deep-house, progressive-house, chicago-house

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let button_2: string | undefined = '';
  let button_3: string | undefined = '';
  let button_4: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  // TODO: Use Neynar or Airstack to query and get closely related farcasters
  // Maybe who are your top 5 friends 
  // top channels you interact with
  // Searching farcaster in there would be kinda funny
  // you can now do dynamic searches
  // LLM interactions
  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
    button_2 = message.following as any;
    
  }
  authenticateSpotify();
  // getRecommendedSong();
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `🌲 ${accountAddress} 🌲`,
        },
        {
          label: `${button_2}`,
        }
      ],
      image: `https://spotify-gallery-00.vercel.app/ying_yang_mid.png`,
      post_url: `https://spotify-gallery-00.vercel.app/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
