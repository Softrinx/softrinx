import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Here you would typically calculate a quote based on the provided data
    console.log('Quote request:', body);

    // For now, return a dummy quote
    const quote = {
      price: 1000,
      currency: 'USD',
      details: 'This is a preliminary quote. Prices may vary.',
    };

    return NextResponse.json({ quote }, { status: 200 });
  } catch (error) {
    console.error('Error calculating quote:', error);
    return NextResponse.json({ message: 'An error occurred while calculating your quote.' }, { status: 500 });
  }
}
