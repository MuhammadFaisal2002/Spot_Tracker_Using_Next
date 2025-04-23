import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return new Response('Invalid content type', { status: 415 });
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.data?.User_name || !body.data?.Email) {
      return NextResponse.json(
        { error: 'Name and email are required fields' },
        { status: 400 }
      );
    }

    // Forward to Strapi
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/spot-trackers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        },
        body: JSON.stringify(body)
      }
    );

    if (!strapiResponse.ok) {
      const errorText = await strapiResponse.text();
      console.error('Strapi error response:', errorText);
      return new Response(errorText, { 
        status: strapiResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await strapiResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}