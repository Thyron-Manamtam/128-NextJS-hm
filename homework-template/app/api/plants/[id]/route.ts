import { NextRequest, NextResponse } from "next/server";
import { db } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const plant = await db.findUnique(id);
    
    if (!plant) {
      return NextResponse.json(
        { error: `Plant with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { data: plant, message: 'Plant retrieved successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve plant' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Check if plant exists first
    const existingPlant = await db.findUnique(id);
    if (!existingPlant) {
      return NextResponse.json(
        { error: `Plant with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    // Update the plant with provided fields
    const updatedPlant = await db.update(id, body);
    
    return NextResponse.json(
      { data: updatedPlant, message: 'Plant updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update plant' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    // Check if plant exists first
    const existingPlant = await db.findUnique(id);
    if (!existingPlant) {
      return NextResponse.json(
        { error: `Plant with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    // Delete the plant
    const deleted = await db.delete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: `Failed to delete plant with ID ${id}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Plant deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete plant' },
      { status: 500 }
    );
  }
}
