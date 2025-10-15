import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 3600; // ISR: revalidate every hour

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  
  const wpUrl = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  
  if (!wpUrl) {
    return NextResponse.json(
      { error: 'WordPress API URL not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${wpUrl}/wp-json/template-structure/v1/navigation/${id}`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch navigation: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch navigation data' },
      { status: 500 }
    );
  }
}
