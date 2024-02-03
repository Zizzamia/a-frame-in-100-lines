import { NextResponse } from 'next/server';

async function getResponse(): Promise<NextResponse> {
  return NextResponse.redirect(
    'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
    { status: 302 },
  );
}

export async function POST(): Promise<Response> {
  return getResponse();
}

export const dynamic = 'force-dynamic';
