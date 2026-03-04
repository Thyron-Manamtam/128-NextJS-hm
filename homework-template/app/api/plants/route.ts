// Build on this, you can add your own as long as it fits the specs

import { NextRequest, NextResponse } from "next/server";
import { db } from '@/lib/db';
import { Plant } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Extract location query parameter if provided
    const location = request.nextUrl.searchParams.get('location');
    
    // Fetch plants with optional location filter
    const plants = await db.findMany(
      location ? { location } : undefined
    );
    
    return NextResponse.json({ data: plants }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch plants' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, species, location } = body;
    
    // Validate required fields
    if (!name || !species || !location) {
      return NextResponse.json(
        { error: 'Missing required fields: name, species, location' },
        { status: 400 }
      );
    }
    
    // Create new plant with default status "Healthy"
    const newPlant = await db.create({
      name,
      species,
      location,
      status: 'Healthy',
      lastWatered: new Date(),
    });
    
    return NextResponse.json(
      { data: newPlant, message: 'Plant created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create plant' },
      { status: 500 }
    );
  }
}