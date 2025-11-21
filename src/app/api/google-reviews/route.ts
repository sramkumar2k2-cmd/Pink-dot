import { NextResponse } from 'next/server';

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  time: number;
  profile_photo_url?: string;
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      {
        reviews: [],
        error:
          'Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID in environment variables.',
      },
      { status: 500 },
    );
  }

  try {
    // Fallback generic place reviews URL; you can override with NEXT_PUBLIC_GOOGLE_REVIEWS_URL on the frontend
    const defaultReviewUrl = `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(
      placeId,
    )}`;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId,
    )}&fields=reviews&key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { reviews: [], error: 'Failed to fetch reviews from Google.' },
        { status: 502 },
      );
    }

    const data = await response.json();
    const rawReviews: GoogleReview[] = data?.result?.reviews ?? [];

    const reviews = rawReviews.map((review, index) => ({
      id: `${review.time ?? index}`,
      name: review.author_name,
      location: review.relative_time_description ?? '',
      rating: review.rating,
      text: review.text,
      date: new Date((review.time ?? Date.now() / 1000) * 1000).toISOString(),
      image: review.profile_photo_url ?? '',
      verified: true,
       // Google API does not provide a direct per-review URL, so we link to the place's reviews page.
      reviewUrl: defaultReviewUrl,
      source: 'google' as const,
    }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { reviews: [], error: 'Unexpected error fetching Google reviews.' },
      { status: 500 },
    );
  }
}


