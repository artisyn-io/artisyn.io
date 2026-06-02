import { NextRequest, NextResponse } from 'next/server';

interface ReviewResponse {
  id: string;
  reviewId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
}

const responses: ReviewResponse[] = [];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const { reviewId } = await params;
  const response = responses.find((r) => r.reviewId === reviewId);
  return NextResponse.json({ data: response ?? null });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const { reviewId } = await params;
  const body = await request.json();

  if (!body.body || typeof body.body !== 'string' || body.body.trim().length === 0) {
    return NextResponse.json({ error: 'Response body is required' }, { status: 400 });
  }

  const trimmed = body.body.trim();

  if (trimmed.length > 1000) {
    return NextResponse.json({ error: 'Response must be 1000 characters or fewer' }, { status: 400 });
  }

  if (responses.some((r) => r.reviewId === reviewId)) {
    return NextResponse.json({ error: 'A response already exists for this review' }, { status: 409 });
  }

  const newResponse: ReviewResponse = {
    id: `resp-${Date.now()}`,
    reviewId,
    body: trimmed,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    authorName: 'Curator',
  };

  responses.push(newResponse);
  return NextResponse.json({ data: newResponse }, { status: 201 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const { reviewId } = await params;
  const existing = responses.find((r) => r.reviewId === reviewId);

  if (!existing) {
    return NextResponse.json({ error: 'Response not found' }, { status: 404 });
  }

  const body = await request.json();

  if (!body.body || typeof body.body !== 'string' || body.body.trim().length === 0) {
    return NextResponse.json({ error: 'Response body is required' }, { status: 400 });
  }

  const trimmed = body.body.trim();

  if (trimmed.length > 1000) {
    return NextResponse.json({ error: 'Response must be 1000 characters or fewer' }, { status: 400 });
  }

  existing.body = trimmed;
  existing.updatedAt = new Date().toISOString();

  return NextResponse.json({ data: existing });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const { reviewId } = await params;
  const index = responses.findIndex((r) => r.reviewId === reviewId);

  if (index === -1) {
    return NextResponse.json({ error: 'Response not found' }, { status: 404 });
  }

  responses.splice(index, 1);
  return NextResponse.json({ success: true });
}
