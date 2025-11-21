import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Fetch the SVG from WordPress
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Next.js Proxy',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const svgContent = await response.text();

    // Return the SVG with proper headers
    return new NextResponse(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error proxying SVG:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SVG' },
      { status: 500 }
    );
  }
}
