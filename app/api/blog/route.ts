import { NextResponse } from "next/server"

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  authorAvatar: string
  category: "learning" | "reading" | "writing-tips" | "community" | "book-review" | "inspiration"
  tags: string[]
  likes: number
  comments: number
  readTime: number
  createdAt: string
  updatedAt: string
  coverImage?: string
}

// Mock blog posts data
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "My Journey Learning Creative Writing: From Beginner to Storyteller",
    content: `When I first started writing, I thought creativity was something you either had or didn't have. I was wrong. Over the past year, I've discovered that storytelling is a skill that can be learned, practiced, and mastered.

## The Beginning

My journey started with a simple goal: write one story. Just one. I had no idea that this single story would lead me down a rabbit hole of character development, plot structures, and the beautiful complexity of human emotions translated into words.

## What I've Learned

**1. Character Development is Everything**
Your plot can be simple, but if your characters are compelling, readers will follow them anywhere. I spent weeks just writing character backstories that never made it into my actual stories, but they informed every decision my characters made.

**2. Show, Don't Tell**
This is probably the most repeated advice in writing, and for good reason. Instead of saying "Sarah was angry," I learned to write "Sarah's knuckles whitened around her coffee cup." The difference is night and day.

**3. First Drafts Are Supposed to Be Terrible**
This was liberating. Once I accepted that my first draft was just getting the story out of my head and onto paper, I stopped being paralyzed by perfectionism.

## Resources That Helped Me

- **"Bird by Bird" by Anne Lamott** - This book changed my perspective on writing
- **Brandon Sanderson's Writing Lectures** - Available free on YouTube
- **Writing Communities** - StoryForge has been incredible for getting feedback

## What's Next

I'm currently working on a fantasy novella about a librarian who discovers that books can come to life. It's ambitious, but I've learned that the only way to grow as a writer is to challenge yourself.

To anyone just starting their writing journey: be patient with yourself. Every published author was once where you are now. The only difference is they kept writing.`,
    excerpt:
      "Reflecting on my first year of creative writing and the lessons that transformed me from a complete beginner to someone who actually finishes stories.",
    author: "Emma Rodriguez",
    authorAvatar: "ER",
    category: "learning",
    tags: ["Creative Writing", "Beginner Tips", "Personal Journey", "Character Development"],
    likes: 234,
    comments: 45,
    readTime: 5,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    title: "Book Review: 'The Seven Husbands of Evelyn Hugo' - A Masterclass in Character Voice",
    content: `Taylor Jenkins Reid has crafted something truly special with "The Seven Husbands of Evelyn Hugo." As a writer, I found myself constantly pausing to admire the technical brilliance behind what seems like effortless storytelling.

## What Makes This Book Special

**The Dual Timeline Structure**
Reid masterfully weaves between past and present, using each timeline to inform and enhance the other. As writers, we can learn so much from how she reveals information at exactly the right moments.

**Character Voice**
Evelyn Hugo's voice is so distinct and powerful that you can hear her speaking every word. This is what we should all strive for in our character development.

## Writing Lessons I Took Away

1. **Secrets Drive Story** - Every chapter reveals something new about Evelyn, keeping us hooked
2. **Emotional Truth Over Plot Convenience** - Every twist feels earned and authentic
3. **The Power of Specificity** - Reid doesn't just say Evelyn was glamorous; she shows us exactly how

## For Fellow Writers

If you're working on character-driven fiction, this book is required reading. Pay attention to how Reid makes you care about a character who could easily be unlikable in less skilled hands.

**Rating: 5/5 stars**

What books have taught you the most about writing? I'd love to hear your recommendations!`,
    excerpt:
      "A deep dive into Taylor Jenkins Reid's masterpiece and the writing techniques that make it so compelling for both readers and writers.",
    author: "Marcus Chen",
    authorAvatar: "MC",
    category: "book-review",
    tags: ["Book Review", "Character Development", "Writing Craft", "Contemporary Fiction"],
    likes: 189,
    comments: 32,
    readTime: 4,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
  },
  {
    id: "3",
    title: "5 Writing Exercises That Actually Improved My Storytelling",
    content: `After trying dozens of writing exercises from various books and websites, I've found five that genuinely made me a better storyteller. These aren't just busy work—they're targeted practice that will improve specific aspects of your writing.

## 1. The Emotion Exercise

Write a scene where your character experiences a strong emotion (anger, joy, fear) without ever naming the emotion. This forces you to show rather than tell and helps you understand how emotions manifest physically and behaviorally.

**Example:** Instead of "John was nervous," write about his sweaty palms, the way he kept checking his phone, how he couldn't sit still.

## 2. The Dialogue-Only Scene

Write an entire scene using only dialogue—no action lines, no internal thoughts, no description. This exercise teaches you how much story you can tell through what characters say and don't say.

## 3. The Constraint Challenge

Write a story with artificial constraints: no words longer than 5 letters, no dialogue, only questions, etc. Constraints force creativity and help you find new ways to express ideas.

## 4. The Perspective Flip

Take a scene from your current project and rewrite it from a different character's perspective. This helps you understand how point of view shapes story and ensures all your characters have distinct voices.

## 5. The Sensory Scene

Write a scene focusing on one sense at a time—first only what the character sees, then only what they hear, smell, feel, or taste. This builds your descriptive skills and helps you create immersive environments.

## Why These Work

Each exercise targets a specific skill: showing emotion, writing dialogue, creative problem-solving, character voice, and sensory description. They're not just random prompts—they're deliberate practice.

Try one this week and let me know how it goes!`,
    excerpt:
      "Five targeted writing exercises that will actually improve your storytelling skills, with practical examples and explanations of why they work.",
    author: "Sarah Kim",
    authorAvatar: "SK",
    category: "writing-tips",
    tags: ["Writing Exercises", "Craft", "Skill Building", "Practice"],
    likes: 456,
    comments: 78,
    readTime: 6,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "4",
    title: "Currently Reading: Building My 2024 Reading List for Writers",
    content: `As writers, our reading choices shape our craft. Here's what's on my reading list for 2024, organized by what I hope to learn from each book.

## For Plot Structure
- **"Save the Cat! Writes a Novel" by Jessica Brody** - Currently reading this and loving the practical approach to story structure
- **"The Anatomy of Story" by John Truby** - On deck for February

## For Character Development  
- **"The Emotional Craft of Fiction" by Donald Maass** - Just finished this one and it's incredible
- **"Creating Character Arcs" by K.M. Weiland** - Planning to read this alongside my current WIP

## For Prose Style
- **"Several Short Sentences About Writing" by Verlyn Klinkenborg** - This book changed how I think about sentences
- **"The Sense of Style" by Steven Pinker** - For the technical side of beautiful writing

## For Inspiration
- **"Big Magic" by Elizabeth Gilbert** - When I need motivation
- **"The Writing Life" by Annie Dillard** - For those existential writing moments

## What I'm Reading Right Now

Currently halfway through "Klara and the Sun" by Kazuo Ishiguro. The way he writes from an AI's perspective is masterful—every sentence feels carefully chosen to reflect Klara's unique way of processing the world.

## My Reading Goals for 2024

1. Read 52 books (1 per week)
2. Include at least 20 craft books
3. Read more diversely—authors from different backgrounds and countries
4. Take notes on technique, not just story

What's on your reading list? Any craft books you'd recommend?`,
    excerpt:
      "Sharing my 2024 reading list focused on improving my writing craft, with recommendations for plot, character, style, and inspiration.",
    author: "Alex Thompson",
    authorAvatar: "AT",
    category: "reading",
    tags: ["Reading List", "Writing Craft", "Book Recommendations", "2024 Goals"],
    likes: 167,
    comments: 29,
    readTime: 3,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: "5",
    title: "The StoryForge Community: How Collaborative Writing Changed My Process",
    content: `Six months ago, I was a solo writer. I wrote alone, edited alone, and shared my work with no one until it was "perfect" (spoiler: it never was). Then I discovered StoryForge, and everything changed.

## My First Collaboration

My first collaborative story was terrifying. I had to share an unfinished, imperfect draft with a stranger. But @Luna_Writes took my sci-fi concept and added layers I never would have thought of. She brought expertise in quantum physics that made my handwavy science actually work.

## What I've Learned About Collaboration

**1. Two Heads Really Are Better Than One**
When I got stuck on a plot hole, my collaborator saw solutions I was blind to. Fresh eyes catch what familiar ones miss.

**2. Different Strengths Complement Each Other**
I'm good at dialogue and character voice. My frequent collaborator @TechWriter_Sam excels at world-building and pacing. Together, we create stories neither of us could write alone.

**3. Real-Time Feedback Accelerates Growth**
Instead of writing in isolation for months, I get feedback as I write. This has improved my first drafts dramatically.

## The Fork Feature is Genius

When someone forks your story, it's not criticism—it's the highest compliment. It means they loved your world enough to want to explore it further. I've learned so much from seeing how other writers interpret my characters and settings.

## Tips for New Collaborators

1. **Communicate Your Vision Clearly** - Share your goals for the story upfront
2. **Be Open to Change** - The best collaborations evolve beyond what either writer originally planned
3. **Establish Roles** - Who handles what aspects of the story?
4. **Use the Comment Feature** - Don't just edit; explain your thinking

## My Collaboration Stats

- 8 collaborative stories completed
- 23 story forks created
- 156 comments received
- Countless lessons learned

The StoryForge community has made me not just a better writer, but a better collaborator and creative partner. If you haven't tried collaborative writing yet, I highly recommend it.

Who wants to collaborate on a fantasy heist story? 😉`,
    excerpt:
      "How joining the StoryForge community and embracing collaborative writing transformed my creative process and improved my skills.",
    author: "Jordan Martinez",
    authorAvatar: "JM",
    category: "community",
    tags: ["Collaboration", "Community", "StoryForge", "Writing Process"],
    likes: 298,
    comments: 67,
    readTime: 4,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search") || ""

  let filteredPosts = blogPosts

  if (category && category !== "all") {
    filteredPosts = blogPosts.filter((post) => post.category === category)
  }

  if (search) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
    )
  }

  return NextResponse.json({ posts: filteredPosts, total: filteredPosts.length })
}

export async function POST(request: Request) {
  try {
    const postData = await request.json()

    const newPost: BlogPost = {
      id: Date.now().toString(),
      ...postData,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    blogPosts.unshift(newPost)

    return NextResponse.json({ success: true, post: newPost })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
