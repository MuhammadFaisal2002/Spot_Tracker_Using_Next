import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Verify content type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 415 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.data?.User_name || !body.data?.Email) {
      return NextResponse.json(
        { error: 'Name and email are required fields' },
        { status: 400 }
      );
    }

    // Log the request for debugging
    console.log('Forwarding to Strapi:', {
      url: `${process.env.STRAPI_URL}/api/spot-trackers`,
      data: body
    });

    // Forward to Strapi
    const strapiResponse = await fetch(
      `${process.env.STRAPI_URL}/api/spot-trackers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
        },
        body: JSON.stringify(body)
      }
    );

    // Handle Strapi response
    if (!strapiResponse.ok) {
      const errorText = await strapiResponse.text();
      console.error('Strapi error:', {
        status: strapiResponse.status,
        error: errorText
      });
      return NextResponse.json(
        { error: 'Strapi API error', details: errorText },
        { status: strapiResponse.status }
      );
    }

    const data = await strapiResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}