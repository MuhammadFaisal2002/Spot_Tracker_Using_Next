import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
    // 1. Verify content type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      console.error('Invalid content type');
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 415 }
      );
    }

    // 2. Parse the request body
    const body = await request.json();
    console.log('Received request body:', body);

    // 3. Validate required fields
    if (!body.data?.User_name || !body.data?.Email) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'Name and email are required fields' },
        { status: 400 }
      );
    }

    // 4. Prepare Strapi request
    const strapiUrl = `${process.env.STRAPI_URL}/api/spot-trackers`;
    console.log('Preparing request to:', strapiUrl);

    const strapiPayload = {
      data: {
        ...body.data,
        submittedAt: new Date().toISOString()
      }
    };

    // 5. Make request to Strapi
    const strapiResponse = await fetch(strapiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
      body: JSON.stringify(strapiPayload)
    });

    // 6. Handle Strapi response
    const responseTime = Date.now() - startTime;
    
    if (!strapiResponse.ok) {
      const errorText = await strapiResponse.text();
      console.error('Strapi API Error:', {
        status: strapiResponse.status,
        response: errorText,
        duration: responseTime
      });
      return NextResponse.json(
        { 
          error: 'Strapi API error',
          status: strapiResponse.status,
          message: errorText
        },
        { status: strapiResponse.status }
      );
    }

    const data = await strapiResponse.json();
    console.log('Successfully submitted to Strapi:', {
      duration: responseTime,
      response: data
    });

    return NextResponse.json(data);

  } catch (error) {
    console.error('API Processing Error:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}