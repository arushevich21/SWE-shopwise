const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
const PEXELS_API_URL = 'https://api.pexels.com/v1';

export async function searchPexelsImage(query: string) {
  try {
    console.log('Searching Pexels for:', query);
    const response = await fetch(`${PEXELS_API_URL}/search?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        'Authorization': PEXELS_API_KEY || '',
      },
    });

    if (!response.ok) {
      console.error('Pexels API error:', response.status, response.statusText);
      throw new Error('Failed to fetch image from Pexels');
    }

    const data = await response.json();
    console.log('Pexels API response:', data);
    
    if (data.photos && data.photos.length > 0) {
      const imageUrl = data.photos[0].src.original;
      console.log('Selected image URL:', imageUrl);
      return imageUrl;
    }
    console.log('No images found for query:', query);
    return null;
  } catch (error) {
    console.error('Error fetching Pexels image:', error);
    return null;
  }
} 