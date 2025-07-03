"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Share2, Bookmark, Clock, Send, ThumbsUp, X } from "lucide-react"
import type { BlogPost } from "@/app/api/blog/route"

interface BlogPostReaderProps {
  post: BlogPost
  isOpen: boolean
  onClose: () => void
}

interface Comment {
  id: string
  author: string
  authorAvatar: string
  content: string
  createdAt: string
  likes: number
  isLiked: boolean
}

export function BlogPostReader({ post, isOpen, onClose }: BlogPostReaderProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Johnson",
      authorAvatar: "SJ",
      content:
        "This is such an insightful post! I've been struggling with this exact issue and your perspective really helps.",
      createdAt: "2024-01-15T10:30:00Z",
      likes: 12,
      isLiked: false,
    },
    {
      id: "2",
      author: "Mike Chen",
      authorAvatar: "MC",
      content:
        "Great advice! I especially love the practical tips you've shared. Bookmarking this for future reference.",
      createdAt: "2024-01-15T14:20:00Z",
      likes: 8,
      isLiked: false,
    },
    {
      id: "3",
      author: "Emma Wilson",
      authorAvatar: "EW",
      content: "Thank you for sharing your experience. It's refreshing to read such honest and helpful content.",
      createdAt: "2024-01-16T09:15:00Z",
      likes: 15,
      isLiked: false,
    },
  ])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "You",
        authorAvatar: "YU",
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  const handleCommentLike = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment,
      ),
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getFullContent = (post: BlogPost) => {
    // Extended content for each post
    const fullContentMap: Record<string, string> = {
      "1": `
        <h2>The Foundation of Great Writing</h2>
        <p>Writing compelling characters is both an art and a science. It requires understanding human psychology, motivation, and the subtle ways people reveal themselves through action and dialogue.</p>
        
        <h3>Understanding Character Motivation</h3>
        <p>Every character needs a driving force—something that gets them out of bed in the morning and keeps them moving through your story. This motivation should be:</p>
        <ul>
          <li><strong>Specific:</strong> "I want to be happy" is too vague. "I want to reconcile with my estranged daughter before she gets married" is specific.</li>
          <li><strong>Personal:</strong> The motivation should matter deeply to your character, not just advance the plot.</li>
          <li><strong>Challenging:</strong> If it's easy to achieve, there's no story. The best motivations require your character to grow and change.</li>
        </ul>

        <h3>The Power of Contradiction</h3>
        <p>Real people are contradictory, and so should your characters be. The tough detective who cries at movies, the shy librarian who performs stand-up comedy on weekends—these contradictions make characters feel human and unpredictable.</p>

        <h3>Show, Don't Tell</h3>
        <p>Instead of telling us your character is brave, show them standing up to a bully. Instead of saying they're insecure, show them checking their appearance in every reflective surface they pass.</p>

        <h3>Dialogue That Reveals</h3>
        <p>Great dialogue does more than convey information—it reveals character. Consider how different people would say the same thing:</p>
        <ul>
          <li>The professor: "I believe we should reconsider our approach."</li>
          <li>The teenager: "This is totally not working."</li>
          <li>The CEO: "We need a new strategy, and we need it now."</li>
        </ul>

        <h3>Character Arcs and Growth</h3>
        <p>The most satisfying characters are those who change throughout the story. This doesn't mean they become completely different people, but they learn something about themselves or the world that shifts their perspective.</p>

        <p>Remember, readers don't just want to read about characters—they want to care about them, root for them, and sometimes even see themselves reflected in their struggles and triumphs.</p>
      `,
      "2": `
        <h2>The Digital Revolution in Publishing</h2>
        <p>The publishing industry has undergone seismic shifts in the past decade. From the rise of e-books to the explosion of self-publishing platforms, authors today have more opportunities—and more challenges—than ever before.</p>

        <h3>Traditional vs. Self-Publishing</h3>
        <p>The old gatekeepers are still there, but they're no longer the only path to readers. Here's what you need to know:</p>

        <h4>Traditional Publishing Pros:</h4>
        <ul>
          <li>Professional editing and design</li>
          <li>Established distribution networks</li>
          <li>Marketing support (for select titles)</li>
          <li>Credibility and prestige</li>
        </ul>

        <h4>Self-Publishing Pros:</h4>
        <ul>
          <li>Complete creative control</li>
          <li>Higher royalty rates</li>
          <li>Faster time to market</li>
          <li>Direct relationship with readers</li>
        </ul>

        <h3>The Hybrid Approach</h3>
        <p>Many successful authors today use a hybrid approach, combining traditional and self-publishing strategies. They might self-publish shorter works to build an audience while pursuing traditional deals for their major works.</p>

        <h3>Building Your Platform</h3>
        <p>Regardless of your publishing path, building a platform is crucial. This means:</p>
        <ul>
          <li>Developing a social media presence</li>
          <li>Building an email list</li>
          <li>Engaging with readers and other writers</li>
          <li>Creating valuable content beyond your books</li>
        </ul>

        <h3>The Importance of Genre</h3>
        <p>Understanding your genre isn't just about categorization—it's about understanding your readers' expectations and the market dynamics. Some genres are more suited to self-publishing, while others still favor traditional routes.</p>

        <h3>Quality Matters More Than Ever</h3>
        <p>With millions of books published each year, quality is what sets successful books apart. Whether you go traditional or indie, invest in professional editing, cover design, and formatting.</p>

        <p>The future of publishing is bright for authors willing to adapt, learn, and put in the work to connect with readers.</p>
      `,
      "3": `
        <h2>The Science of Reading Habits</h2>
        <p>Reading is more than just a hobby—it's a practice that shapes our minds, expands our empathy, and connects us to the broader human experience. But in our digital age, many people struggle to maintain consistent reading habits.</p>

        <h3>The Neuroscience of Reading</h3>
        <p>When we read, our brains create new neural pathways and strengthen existing ones. Fiction, in particular, activates the same brain regions that would be engaged if we were actually experiencing the events we're reading about.</p>

        <h3>Building a Sustainable Reading Practice</h3>
        <p>The key to reading more isn't finding more time—it's making better use of the time you have:</p>

        <h4>Start Small</h4>
        <p>Commit to just 10 minutes a day. This removes the pressure and makes it easier to build the habit. Once it's established, you can gradually increase the time.</p>

        <h4>Always Have a Book</h4>
        <p>Whether it's a physical book, e-reader, or audiobook app, having reading material readily available means you can turn dead time into reading time.</p>

        <h4>Create Reading Rituals</h4>
        <p>Link reading to existing habits. Read with your morning coffee, during lunch breaks, or before bed. The key is consistency.</p>

        <h3>Choosing What to Read</h3>
        <p>Don't feel obligated to finish every book you start. Life's too short for books that don't engage you. It's okay to have multiple books going at once—a novel for pleasure, a non-fiction book for learning, and maybe a poetry collection for inspiration.</p>

        <h3>The Social Aspect of Reading</h3>
        <p>Reading doesn't have to be solitary. Join book clubs, participate in online reading communities, or simply share your thoughts about books with friends. Discussing what you read deepens your understanding and enjoyment.</p>

        <h3>Reading in the Digital Age</h3>
        <p>E-readers and audiobooks aren't replacing physical books—they're expanding our options. Each format has its advantages:</p>
        <ul>
          <li><strong>Physical books:</strong> Tactile experience, no battery concerns, easier to flip back and reference</li>
          <li><strong>E-readers:</strong> Portable library, adjustable text size, built-in dictionary</li>
          <li><strong>Audiobooks:</strong> Hands-free reading, great for commutes, can increase reading speed</li>
        </ul>

        <p>The goal isn't to read more books—it's to read more meaningfully and to let reading enrich your life in whatever way works best for you.</p>
      `,
      "4": `
        <h2>Mastering the Art of Storytelling</h2>
        <p>Storytelling is humanity's oldest art form, predating written language by thousands of years. Whether you're writing a novel, crafting a screenplay, or simply trying to make your presentations more engaging, understanding the fundamentals of storytelling will serve you well.</p>

        <h3>The Universal Story Structure</h3>
        <p>While there are many ways to structure a story, most successful narratives follow a similar pattern:</p>

        <h4>The Setup</h4>
        <p>Introduce your protagonist in their ordinary world. Show us who they are, what they want, and what's at stake. This is where you establish the rules of your story world and get readers invested in your character.</p>

        <h4>The Inciting Incident</h4>
        <p>Something happens that disrupts the protagonist's ordinary world and sets the story in motion. This should occur relatively early in your narrative—readers need to know what the story is about.</p>

        <h4>Rising Action</h4>
        <p>A series of increasingly challenging obstacles that test your protagonist and force them to grow. Each challenge should be more difficult than the last, building tension toward the climax.</p>

        <h4>The Climax</h4>
        <p>The moment of highest tension where the protagonist faces their greatest challenge. This is where everything you've set up pays off.</p>

        <h4>Resolution</h4>
        <p>Show how the protagonist's world has changed as a result of their journey. This doesn't always mean a happy ending, but it should feel satisfying and complete.</p>

        <h3>The Power of Conflict</h3>
        <p>Conflict is the engine of story. Without it, you have a situation, not a story. Conflict can be:</p>
        <ul>
          <li><strong>External:</strong> Character vs. character, character vs. nature, character vs. society</li>
          <li><strong>Internal:</strong> Character vs. themselves, their fears, their beliefs</li>
        </ul>

        <h3>Creating Emotional Resonance</h3>
        <p>The best stories make us feel something. To create emotional resonance:</p>
        <ul>
          <li>Give your characters relatable motivations</li>
          <li>Put them in situations where they must make difficult choices</li>
          <li>Show the consequences of their actions</li>
          <li>Use specific, concrete details rather than abstract concepts</li>
        </ul>

        <h3>The Importance of Theme</h3>
        <p>Theme is what your story is really about—the deeper meaning beneath the surface events. It's not something you should force, but rather something that emerges naturally from your characters' choices and actions.</p>

        <h3>Show vs. Tell</h3>
        <p>This is perhaps the most important principle in storytelling. Instead of telling readers that a character is angry, show them slamming a door or speaking through gritted teeth. Let readers draw their own conclusions from the evidence you provide.</p>

        <p>Remember, every story is ultimately about change—how characters grow, how situations evolve, how understanding deepens. Master the art of showing that change, and you'll master the art of storytelling.</p>
      `,
      "5": `
        <h2>The Writer's Journey: From Blank Page to Published Work</h2>
        <p>Every writer's journey is unique, but there are common challenges and milestones that most of us encounter along the way. Understanding this journey can help you navigate the inevitable ups and downs of the writing life.</p>

        <h3>The Honeymoon Phase</h3>
        <p>This is where every writing journey begins—with excitement, possibility, and the intoxicating belief that this story will be different, better, easier than anything you've attempted before. Enjoy this phase, but don't let it fool you into thinking the rest will be smooth sailing.</p>

        <h3>The Reality Check</h3>
        <p>Somewhere around page 50 (or chapter 3, or act 2), reality sets in. The story isn't flowing as easily as it did in the beginning. Plot holes appear. Characters refuse to cooperate. This is normal. This is where real writing begins.</p>

        <h3>The Dark Night of the Soul</h3>
        <p>Every writer faces this moment—when you're convinced your story is terrible, you're a fraud, and you should give up. This feeling is so universal that it has a name: imposter syndrome. Push through it. Every published author has felt this way.</p>

        <h3>The Breakthrough</h3>
        <p>Just when you're ready to quit, something clicks. A character comes alive, a plot thread resolves beautifully, or you finally understand what your story is really about. These moments remind you why you started writing in the first place.</p>

        <h3>The Revision Marathon</h3>
        <p>First drafts are for getting the story down. Subsequent drafts are for making it good. Be prepared to revise extensively. Most professional writers go through multiple drafts before their work is ready for publication.</p>

        <h3>The Submission Process</h3>
        <p>Whether you're querying agents or uploading to self-publishing platforms, putting your work out into the world is both terrifying and exhilarating. Rejection is part of the process—even bestselling authors have rejection stories.</p>

        <h3>The Long Game</h3>
        <p>Building a writing career takes time. Focus on improving your craft, building relationships with other writers, and connecting with readers. Success rarely happens overnight, but persistence pays off.</p>

        <h3>Practical Advice for the Journey</h3>
        <ul>
          <li><strong>Write regularly:</strong> Even 15 minutes a day adds up</li>
          <li><strong>Read in your genre:</strong> Understand what readers expect</li>
          <li><strong>Join a writing community:</strong> Other writers understand the struggle</li>
          <li><strong>Celebrate small wins:</strong> Finishing a chapter is an achievement</li>
          <li><strong>Learn the business:</strong> Understanding publishing helps you make better decisions</li>
        </ul>

        <p>Remember, every published author started with a blank page and a dream. Your journey may be challenging, but it's also uniquely yours. Embrace the process, learn from setbacks, and keep writing.</p>
      `,
    }

    return fullContentMap[post.id] || post.content
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        {/* Fixed Header */}
        <DialogHeader className="p-6 pb-4 border-b bg-white sticky top-0 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar>
                  <AvatarFallback className="bg-electric-blue text-white">{post.authorAvatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                </div>
              </div>

              <DialogTitle className="text-2xl font-bold text-gray-900 mb-3">{post.title}</DialogTitle>

              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <Badge
                  className={`${
                    post.category === "learning"
                      ? "bg-blue-100 text-blue-800"
                      : post.category === "reading"
                        ? "bg-green-100 text-green-800"
                        : post.category === "writing-tips"
                          ? "bg-purple-100 text-purple-800"
                          : post.category === "book-review"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-pink-100 text-pink-800"
                  }`}
                >
                  {post.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : "text-gray-500"}`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  <span>{likes}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center space-x-2 text-gray-500"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center space-x-2 ${isBookmarked ? "text-electric-blue" : "text-gray-500"}`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                  <span>Save</span>
                </Button>
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1" style={{ maxHeight: "calc(90vh - 200px)" }}>
          {/* Article Content */}
          <div className="p-6">
            <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: getFullContent(post) }} />

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <Separator className="mb-8" />

            {/* Comments Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Comments ({comments.length})</h3>

              {/* Add Comment */}
              <div className="mb-6">
                <Textarea
                  placeholder="Share your thoughts about this post..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-3"
                  rows={3}
                />
                <Button onClick={handleComment} className="bg-electric-blue hover:bg-electric-blue/90">
                  <Send className="h-4 w-4 mr-2" />
                  Post Comment
                </Button>
              </div>

              <Separator className="mb-6" />

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-gray-200 text-gray-600">{comment.authorAvatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCommentLike(comment.id)}
                          className={`${comment.isLiked ? "text-electric-blue" : "text-gray-500"} hover:text-electric-blue`}
                        >
                          <ThumbsUp className={`h-4 w-4 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-electric-blue">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
