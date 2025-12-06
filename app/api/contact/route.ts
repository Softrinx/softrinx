import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Here you would typically handle the form data, e.g., send an email, save to a database, etc.
    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json({ message: 'Your message has been sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return NextResponse.json({ message: 'An error occurred while sending your message.' }, { status: 500 });
  }
}
