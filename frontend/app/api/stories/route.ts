import { NextResponse } from "next/server"

export interface Story {
  id: string
  title: string
  authors: string[]
  description: string
  tags: string[]
  likes: number
  forks: number
  views: number
  comments: number
  coverImage?: string
  createdAt: string
  updatedAt: string
  isPublic: boolean
  allowCollaboration: boolean
}

// Backend API configuration
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Mock data - in a real app, this would come from a database
const stories: Story[] = [
  {
    id: "1",
    title: "The Last Library",
    authors: ["Sarah Chen", "Marcus Rodriguez"],
    description:
      "In a world where books are forbidden, a secret underground library holds the key to humanity's forgotten past. When young Aria discovers this hidden sanctuary, she must choose between safety and the dangerous truth that could change everything.",
    tags: ["Dystopian", "Adventure", "Young Adult"],
    likes: 1247,
    forks: 89,
    views: 5432,
    comments: 156,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-20",
    isPublic: true,
    allowCollaboration: true,
  },
  {
    id: "2",
    title: "Quantum Hearts",
    authors: ["Dr. Elena Vasquez"],
    description:
      "A brilliant physicist discovers that love transcends dimensions when she accidentally opens a portal to parallel universes. Each reality shows her a different version of her life and the person she's meant to be with.",
    tags: ["Sci-Fi", "Romance", "Multiverse"],
    likes: 892,
    forks: 67,
    views: 3421,
    comments: 98,
    createdAt: "2025-01-10",
    updatedAt: "2025-01-18",
    isPublic: true,
    allowCollaboration: true,
  },
  {
    id: "3",
    title: "The Midnight Cartographer",
    authors: ["James Thornfield", "Luna Blackwood", "River Stone"],
    description:
      "Every night at midnight, mysterious maps appear throughout the city, leading brave souls to hidden realms that exist between our world and the next. But some paths are meant to remain untraveled.",
    tags: ["Fantasy", "Mystery", "Urban Fantasy"],
    likes: 2156,
    forks: 134,
    views: 7890,
    comments: 267,
    createdAt: "2025-01-05",
    updatedAt: "2025-01-22",
    isPublic: true,
    allowCollaboration: true,
  },
  {
    id: "4",
    title: "Digital Ghosts",
    authors: ["Alex Chen"],
    description:
      "In 2087, consciousness can be uploaded to the cloud. But when people start disappearing from the digital afterlife, detective Maya Singh must solve murders that shouldn't be possible.",
    tags: ["Cyberpunk", "Thriller", "Mystery"],
    likes: 1543,
    forks: 78,
    views: 4567,
    comments: 189,
    createdAt: "2025-01-12",
    updatedAt: "2025-01-19",
    isPublic: true,
    allowCollaboration: true,
  },
  {
    id: "5",
    title: "The Empathy Engine",
    authors: ["Dr. Amara Okafor", "Jin Watanabe"],
    description:
      "A revolutionary AI that can feel human emotions becomes the key to solving climate change. But when it starts experiencing pain, its creators must decide: is consciousness worth the cost of salvation?",
    tags: ["Sci-Fi", "Climate Fiction", "AI"],
    likes: 987,
    forks: 45,
    views: 2890,
    comments: 134,
    createdAt: "2025-01-08",
    updatedAt: "2025-01-21",
    isPublic: true,
    allowCollaboration: true,
  },
  {
    id: "6",
    title: "Songs of the Void Sailors",
    authors: ["Captain Zara Al-Rashid"],
    description:
      "In the age of interstellar travel, space pirates sing ancient songs to navigate the cosmic winds. When the last Song Keeper dies, young Kira must learn the melodies that hold the universe together.",
    tags: ["Space Opera", "Adventure", "Music"],
    likes: 1876,
    forks: 92,
    views: 6234,
    comments: 201,
    createdAt: "2025-01-03",
    updatedAt: "2025-01-17",
    isPublic: true,
    allowCollaboration: true,
  },
  {
    id: "7",
    title: "The Memory Thief's Daughter",
    authors: ["Isabella Santos"],
    description:
      "Born with the ability to steal and manipulate memories, Lucia has spent her life hiding her gift. But when her mother's memories start disappearing, she must embrace her power to save the woman who raised her.",
    tags: ["Magical Realism", "Family", "Coming of Age"],
    likes: 1234,
    forks: 56,
    views: 3456,
    comments: 167,
    createdAt: "2025-01-14",
    updatedAt: "2025-01-20",
    isPublic: true,
    allowCollaboration: true,
  },
  {
    id: "8",
    title: "Neon Samurai",
    authors: ["Kenji Nakamura", "Street_Writer_99"],
    description:
      "In Neo-Tokyo 2099, ancient bushido code meets cutting-edge technology. When corporations replace governments, one cyber-samurai stands between order and chaos.",
    tags: ["Cyberpunk", "Action", "Japanese Culture"],
    likes: 2341,
    forks: 123,
    views: 8901,
    comments: 298,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-23",
    isPublic: true,
    allowCollaboration: true,
  },
  {
    id: "9",
    title: "The Greenhouse Conspiracy",
    authors: ["Dr. Maya Patel", "Environmental_Collective"],
    description:
      "When climate scientist Dr. Sarah Kim discovers that the world's largest greenhouse gas producer is secretly funding climate denial, she must choose between her career and exposing the truth.",
    tags: ["Climate Fiction", "Thriller", "Environmental"],
    likes: 756,
    forks: 34,
    views: 2134,
    comments: 89,
    createdAt: "2025-01-11",
    updatedAt: "2025-01-18",
    isPublic: true,
    allowCollaboration: true,
  },
  {
    id: "10",
    title: "Love in the Time of Algorithms",
    authors: ["Emma Rodriguez", "TechRomance_Writer"],
    description:
      "Dating app developer Zoe creates the perfect algorithm for love, but when she falls for someone the app says is completely wrong for her, she questions everything she believes about compatibility.",
    tags: ["Romance", "Contemporary", "Technology"],
    likes: 1456,
    forks: 67,
    views: 4321,
    comments: 178,
    createdAt: "2025-01-09",
    updatedAt: "2025-01-16",
    isPublic: true,
    allowCollaboration: true,
  },
  {
    id: "11",
    title: "The Bone Witch's Apprentice",
    authors: ["Morgana Blackthorne"],
    description:
      "In a world where necromancy is forbidden, young Elara discovers she can speak to the dead. When a plague of restless spirits threatens her village, she must seek out the legendary Bone Witch to learn control.",
    tags: ["Dark Fantasy", "Magic", "Coming of Age"],
    likes: 1789,
    forks: 98,
    views: 5678,
    comments: 234,
    createdAt: "2025-01-06",
    updatedAt: "2025-01-15",
    isPublic: true,
    allowCollaboration: true,
  },
  {
    id: "12",
    title: "The Happiness Factory",
    authors: ["Social_Commentary_Guild"],
    description:
      "In a society where emotions are manufactured and distributed like commodities, factory worker Jin discovers that his daily dose of happiness is hiding a terrible truth about the world outside.",
    tags: ["Dystopian", "Social Commentary", "Psychological"],
    likes: 1123,
    forks: 76,
    views: 3789,
    comments: 145,
    createdAt: "2025-01-13",
    updatedAt: "2025-01-21",
    isPublic: true,
    allowCollaboration: true,
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "all"
    const search = searchParams.get("search") || ""

    // Make request to backend
    const queryParams = new URLSearchParams()
    if (category && category !== "all") queryParams.append("category", category)
    if (search) queryParams.append("search", search)

    const backendUrl = `${BACKEND_API_URL}/stories${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.status}`)
    }

    const data = await response.json()
    
    // Transform backend data to frontend format if needed
    const transformedStories = data.stories?.map((story: any) => ({
      id: story._id || story.id,
      title: story.title,
      authors: Array.isArray(story.author) 
        ? story.author.filter((author: any) => typeof author === 'string' && author.trim()) 
        : (typeof story.author === 'string' && story.author.trim() ? [story.author] : ['Unknown Author']),
      description: story.content?.substring(0, 200) + "..." || story.description,
      tags: story.tags || [],
      likes: story.likes || 0,
      forks: story.forks || 0,
      views: story.views || 0,
      comments: story.comments || 0,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
      isPublic: story.isPublic ?? true,
      allowCollaboration: story.allowCollaboration ?? true,
    })) || []

    return NextResponse.json({ 
      stories: transformedStories, 
      total: transformedStories.length 
    })
  } catch (error) {
    console.error('Error fetching stories from backend:', error)
    
    // Fallback to empty response or mock data
    return NextResponse.json({ 
      stories: [], 
      total: 0,
      error: 'Failed to fetch stories from backend'
    })
  }
}

export async function POST(request: Request) {
  try {
    const storyData = await request.json()

    // Get auth token from request headers
    const authHeader = request.headers.get('authorization') || 
                      request.headers.get('Authorization')
    
    // Also try to get token from cookies or other sources
    let token = null;
    if (authHeader) {
      token = authHeader.startsWith('Bearer ') ? authHeader : `Bearer ${authHeader}`;
    }

    console.log('Received story creation request');
    console.log('Story data:', storyData);
    console.log('Auth header:', authHeader ? `${authHeader.substring(0, 20)}...` : 'None');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add auth header if available
    if (token) {
      headers['Authorization'] = token;
      console.log('Adding auth header to backend request');
    } else {
      console.warn('No authorization token found in request headers');
      
      // Try to get token from localStorage via client-side (this won't work server-side)
      // We need to ensure the frontend sends the token
      return NextResponse.json({ 
        error: "Authentication required", 
        details: "No authorization token provided" 
      }, { status: 401 });
    }

    console.log('Sending request to backend with headers:', headers);

    // Make request to backend
    const backendResponse = await fetch(`${BACKEND_API_URL}/stories`, {
      method: 'POST',
      headers,
      body: JSON.stringify(storyData)
    })

    console.log('Backend response status:', backendResponse.status);

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text()
      console.error('Backend error response:', errorText);
      
      // Return more specific error information
      return NextResponse.json({ 
        error: "Backend request failed", 
        details: `Status: ${backendResponse.status} - ${errorText}`,
        backendStatus: backendResponse.status
      }, { status: backendResponse.status });
    }

    const newStory = await backendResponse.json()
    console.log('Story created successfully:', newStory);

    return NextResponse.json({ success: true, story: newStory })
  } catch (error) {
    console.error('Error creating story:', error)
    return NextResponse.json({ 
      error: "Failed to create story", 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
