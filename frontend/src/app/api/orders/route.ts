import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getUserOrders } from '~/server/queries';

export async function GET(request: NextRequest) {
  try {
    // Get the authenticated user
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // Get the userId from query params (this should match the Clerk user ID)
    const searchParams = request.nextUrl.searchParams;
    const requestedUserId = searchParams.get('userId');
    
    // Verify that the requested user ID matches the authenticated user
    if (requestedUserId !== userId) {
      return NextResponse.json(
        { error: 'Forbidden' }, 
        { status: 403 }
      );
    }

    // Fetch orders from database
    const orders = await getUserOrders(userId);
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}