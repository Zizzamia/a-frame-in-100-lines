// import { ImageResponse } from '@vercel/og';
import { ImageResponse } from 'next/og';

// export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import getEpisodeData from '../../utils/dbUtils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const episodeNumberStr = searchParams.get('episode_number');

  if (episodeNumberStr) {
    const episodeNumberInt = parseInt(episodeNumberStr, 10);
    const episodeData = await getEpisodeData(episodeNumberInt);

    if (!episodeData) {
      return NextResponse.json({ status: 404, message: 'Data not found' });
    }

    const segmentTitles = episodeData.segment_titles
      .map((title: string, index: number) => `${index + 1}. ${title}`)
      .join('\n');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            backgroundColor: 'black',
            backgroundImage:
              'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          <h1
            style={{
              display: 'flex',
              fontSize: 40,
              fontStyle: 'normal',
              color: 'white',
              marginTop: 30,
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}
          >
            {episodeData.episode_number}: {episodeData.episode_title}
          </h1>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } else {
    return NextResponse.json({ status: 400, message: 'Bad Request' });
  }
}
export const dynamic = 'force-dynamic';
