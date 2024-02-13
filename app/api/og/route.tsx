import { ImageResponse } from 'next/og';
import { EpisodeProps } from '../../../types';

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
              marginTop: '2px',
              lineHeight: '1',
            }}
          >
            {episodeData.episode_data.map((segment, index) => (
              <p style={{ margin: '0px' }} key={index}>
                {index + 1}. {segment.segment_title}.
              </p>
            ))}
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
