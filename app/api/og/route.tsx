// import { ImageResponse } from '@vercel/og';
import { ImageResponse } from 'next/og';
import { EpisodeProps } from '../../../types';
// export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import getEpisodeData from '../../utils/dbUtils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const episodeNumberStr = searchParams.get('episode_number');

  if (episodeNumberStr) {
    const episodeNumberInt = parseInt(episodeNumberStr, 10);
    const episodeDataResult = await getEpisodeData(episodeNumberInt);

    if (!episodeDataResult) {
      return NextResponse.json({ status: 404, message: 'Data not found' });
    }

    const episodeData: EpisodeProps = episodeDataResult as unknown as EpisodeProps;

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
          <div
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
            <b>{episodeData.episode_title}</b>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              color: 'white',
              fontSize: '30px',
              marginTop: '10px',
            }}
          >
            <p>1. {episodeData.episode_data[1].segment_title}. </p>
            <p>2. {episodeData.episode_data[2].segment_title}</p>
            <p>3. {episodeData.episode_data[3].segment_title}</p>
            <p>4. {episodeData.episode_data[4].segment_title}</p>
          </div>
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

{
  /* <div
style={{
  textAlign: 'left',
  fontSize: '24px',
  maxWidth: '1100px',
}}
>
{segmentTitles.split('\n').map((title: any, index: any) => (
  <div key={index} style={{ marginBottom: '10px' }}>
    {title}
  </div>
))}
</div> */
}
