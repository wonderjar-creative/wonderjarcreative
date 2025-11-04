import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const formData = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/gf/v2/forms/${id}/submissions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(
            `${process.env.GRAVITY_FORMS_CONSUMER_KEY}:${process.env.GRAVITY_FORMS_CONSUMER_SECRET}`
          ).toString('base64')}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error submitting Gravity Form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
