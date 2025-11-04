import { NextRequest, NextResponse } from 'next/server';

// Disable SSL verification for local development with self-signed certificates
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const formId = params.id;

  const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const CONSUMER_KEY = process.env.GRAVITY_FORMS_CONSUMER_KEY;
  const CONSUMER_SECRET = process.env.GRAVITY_FORMS_CONSUMER_SECRET;

  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    console.error('Missing Gravity Forms API credentials');
    return NextResponse.json(
      { error: 'Gravity Forms API credentials not configured' },
      { status: 500 }
    );
  }

  try {
    // Force HTTPS for Gravity Forms API (it requires HTTPS for authentication)
    const url = `${WORDPRESS_API_URL}/wp-json/gf/v2/forms/${formId}`.replace('http://', 'https://');
    console.log('Fetching Gravity Form from:', url);
    
    // Create Basic Auth header
    const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Failed to fetch form. Status: ${response.status}, Response:`, JSON.stringify(data));
      
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { 
            error: 'Authentication failed. Please check your Gravity Forms REST API credentials, permissions, and user role.',
            details: data
          },
          { status: response.status }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch form from WordPress', details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Gravity Form:', error);
    return NextResponse.json(
      { error: 'Failed to fetch form from WordPress' },
      { status: 500 }
    );
  }
}