import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Process the Appwrite webhook event
    console.log('Appwrite webhook received:', body);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error handling Appwrite webhook:', error);
    return NextResponse.json({ success: false, message: 'An error occurred.' }, { status: 500 });
  }
}

export async function GET() {
    return NextResponse.json({ message: 'This endpoint is for Appwrite webhooks. Please use POST.' });
}
