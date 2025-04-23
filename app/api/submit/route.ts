// app/api/submit/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Verify the request content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 415 }
      );
    }

    // 2. Parse the incoming JSON data
    const body = await request.json();
    
    // 3. Validate the required fields (example validation)
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required fields' },
        { status: 400 }
      );
    }

    // 4. Process your data (replace with your actual logic)
    const processedData = {
      ...body,
      receivedAt: new Date().toISOString(),
      status: 'processed'
    };

    // 5. Return a proper JSON response
    return NextResponse.json(
      { 
        success: true,
        data: processedData,
        message: 'Form submitted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    // 6. Handle any unexpected errors
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Something went wrong'
      },
      { status: 500 }
    );
  }
}

export const runtime = 'edge'; // Optional: for Vercel Edge Runtime