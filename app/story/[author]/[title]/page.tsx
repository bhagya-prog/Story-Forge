"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Bookmark, Eye, Clock, Send, ThumbsUp, Edit, Trash2 } from "lucide-react"

interface Story {
  id: string
  title: string
  author: string
  authorAvatar: string
  content: string
  excerpt: string
  genre: string
  tags: string[]
  likes: number
  views: number
  comments: number
  readTime: number
  createdAt: string
  isOwner: boolean
  isEmpty: boolean
}

interface Comment {
  id: string
  author: string
  authorAvatar: string
  content: string
  createdAt: string
  likes: number
}

export default function StoryPage() {
  const params = useParams()
  const [story, setStory] = useState<Story | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    fetchStory()
    fetchComments()
  }, [params.author, params.title])

  const fetchStory = async () => {
    setLoading(true)
    try {
      const storyData = generateStoryContent(params.title as string, params.author as string)
      setStory(storyData)
    } catch (error) {
      console.error("Failed to fetch story:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    const mockComments: Comment[] = [
      {
        id: "1",
        author: "Sarah Johnson",
        authorAvatar: "SJ",
        content: "This is absolutely beautiful! The way you describe the emotions is so vivid.",
        createdAt: "2025-01-15T10:30:00Z",
        likes: 12,
      },
      {
        id: "2",
        author: "Mike Chen",
        authorAvatar: "MC",
        content: "I couldn't put this down! When's the next chapter coming?",
        createdAt: "2025-01-15T14:20:00Z",
        likes: 8,
      },
      {
        id: "3",
        author: "Emma Wilson",
        authorAvatar: "EW",
        content: "The character development is incredible. I feel so connected to the protagonist.",
        createdAt: "2025-01-16T09:15:00Z",
        likes: 15,
      },
    ]
    setComments(mockComments)
  }

  const generateStoryContent = (title: string, author: string): Story => {
    const titleKey = title?.toLowerCase().replace(/\s+/g, "-") || ""
    const authorName = author?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Unknown Author"
    const storyTitle = title?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Untitled Story"

    // Check if this is a newly created story (empty content)
    const isNewStory = titleKey.includes("new-story") || titleKey === "untitled"
    const isOwner = authorName === "You" || authorName === "Current User"

    const storyTemplates: Record<string, any> = {
      "the-last-library": {
        content: `# The Last Library

In a world where digital screens had replaced every book, Maya discovered something extraordinary hidden beneath the ruins of the old city.

## Chapter 1: The Discovery

The dust swirled around Maya's feet as she descended into the underground chamber. Her flashlight beam cut through the darkness, revealing rows upon rows of something she had only heard about in whispers—actual books.

"Impossible," she breathed, running her fingers along the leather spines. Each book was a relic from a time when knowledge lived on paper, when stories were held in hands rather than projected into minds.

The air smelled of aged paper and forgotten dreams. Maya pulled a book from the shelf, its cover worn but still readable: "One Hundred Years of Solitude." She had heard of this title in the digital archives, but to hold the physical manifestation felt like touching history itself.

As she opened the book, words seemed to leap from the page with a vitality she had never experienced through her neural interface. The texture of the paper, the weight of the book in her hands, the way her eyes moved across the lines—it was all so different, so... human.

## Chapter 2: The Guardian

"You're not supposed to be here."

Maya spun around to find an elderly man emerging from the shadows between the shelves. His eyes were kind but cautious, and his clothes seemed to belong to another era.

"I'm sorry, I didn't know anyone was—"

"No one knows about this place," he said, adjusting his wire-rimmed glasses. "I'm Thomas, the last librarian. I've been protecting these books for forty years, waiting for someone like you."

"Someone like me?"

"Someone who still believes in the magic of the written word. Someone who understands that stories aren't just data to be consumed, but experiences to be lived."

Thomas gestured to the vast collection surrounding them. "This is more than just books, Maya. This is the last repository of human imagination, the final sanctuary where stories exist as they were meant to—free from algorithms, free from corporate control, free from the digital prison that has captured our minds."

## Chapter 3: The Choice

Over the following weeks, Maya returned to the library every day. Thomas taught her about the old ways—how to care for books, how to read without the assistance of neural enhancement, how to let stories unfold at their natural pace.

"In the old world," Thomas explained, "reading was an act of patience, of dedication. You couldn't skip to the end or have the plot summarized in your mind. You had to earn each revelation, live through each moment with the characters."

Maya discovered classics she had never truly experienced: Tolkien's Middle-earth unfolded in her imagination rather than being projected there; Austen's wit sparkled on the page without algorithmic enhancement; García Márquez's magical realism bloomed in her mind's eye.

But the outside world was changing. The government had announced new legislation requiring all information to be digitally verified and centrally controlled. Physical books would soon be illegal.

"They're coming for us," Thomas said one evening, his voice heavy with resignation. "The last free thoughts, the last uncontrolled stories—they can't allow them to exist."

Maya faced an impossible choice: return to her safe, controlled digital life, or help Thomas preserve the last bastion of free human expression, knowing it might cost them everything.

## Chapter 4: The Revolution

Maya chose to fight. Together, they began secretly distributing books to others who still remembered the old ways. They created a network of readers, people who met in hidden places to share stories and discuss ideas without digital surveillance.

The movement grew slowly but steadily. People began to remember what they had lost—the joy of discovery, the pleasure of imagination, the freedom to think thoughts that weren't pre-approved by algorithms.

But with growth came danger. The authorities were closing in, and Maya knew that soon they would have to make the ultimate sacrifice to preserve the last library.

As she held her favorite book one final time, Maya realized that the true power of stories wasn't in their preservation, but in their ability to inspire others to create new ones. The last library might fall, but the spirit of storytelling would live on in every person they had touched.

The revolution had begun, one reader at a time.`,
        genre: "Dystopian Fiction",
        tags: ["dystopian", "books", "resistance", "future", "rebellion"],
        readTime: 15,
      },
      "quantum-hearts": {
        content: `# Quantum Hearts

Dr. Elena Vasquez had always believed that love was just chemistry—until she discovered it transcends dimensions.

## Chapter 1: The Experiment

The particle accelerator hummed with barely contained energy as Elena made final adjustments to her quantum field generator. Three years of research had led to this moment: the first attempt to create a stable portal between parallel dimensions.

"Are you sure about this, Elena?" her research partner David asked, his voice tight with concern. "The energy readings are off the charts."

Elena's fingers danced across the holographic controls. "The calculations are perfect. We're about to make history."

But as the machine reached critical resonance, something went wrong. The portal didn't just open—it exploded outward, engulfing Elena in a cascade of quantum energy that rewrote the very fabric of her reality.

When the light faded, Elena found herself standing in her lab—but everything was different. The equipment was older, the walls were painted blue instead of white, and most shocking of all, there was a wedding ring on her finger.

## Chapter 2: The Other Life

In this reality, Elena wasn't a single-minded scientist devoted only to her work. She was married to Marcus, a gentle artist who painted portraits of quantum equations—something that should have been impossible, yet here it was, beautiful and real.

"You're home early," Marcus said, looking up from his easel with eyes full of love. "How did the experiment go?"

Elena stared at him, her heart racing. In her original reality, Marcus had been her college boyfriend who left because she chose science over their relationship. Here, somehow, they had found a way to make it work.

"I... it was successful," she managed, studying the life she might have lived. Their apartment was filled with both scientific journals and art supplies, equations sketched alongside flower studies, a perfect blend of their two worlds.

But as days passed, Elena realized this wasn't her life to live. The portal was still active, pulling her consciousness between realities, showing her glimpses of infinite possibilities.

## Chapter 3: The Multiverse of Love

Each reality revealed a different version of her relationship with Marcus. In one, they were both artists living in Paris. In another, they were explorers mapping distant galaxies. In yet another, they had never met at all, but their souls still searched for each other across the cosmos.

Elena began to understand that love wasn't just chemistry—it was quantum entanglement on a cosmic scale. Across infinite realities, certain souls were bound together, finding each other again and again in different forms, different lives, different possibilities.

But the constant shifting between realities was tearing her apart. She was losing herself, becoming scattered across the multiverse like light through a prism.

## Chapter 4: The Choice

In her original reality, Marcus appeared at her lab, drawn by dreams of other lives, other possibilities. The quantum field had affected him too, showing him glimpses of what they could be together.

"I've been dreaming of you," he said, his eyes reflecting the same confusion and wonder Elena felt. "Different versions of us, different worlds. But in every one, I love you."

Elena realized she had to choose: close the portal and return to her single reality, or risk everything to explore the infinite possibilities of love across the multiverse.

Standing before the quantum field generator, Elena made her choice. She reached for Marcus's hand, and together they stepped into the light, ready to explore not just the mysteries of the universe, but the infinite ways two souls could find each other across all possible worlds.

Love, Elena discovered, was the one constant in every reality—the quantum force that bound hearts across dimensions, the equation that solved itself through connection, the experiment that succeeded every time two people chose each other against all odds.`,
        genre: "Science Fiction Romance",
        tags: ["sci-fi", "romance", "multiverse", "quantum physics", "love"],
        readTime: 12,
      },
      "the-midnight-cartographer": {
        content: `# The Midnight Cartographer

Every night at the stroke of twelve, mysterious maps appeared throughout the city, leading brave souls to hidden realms that existed between our world and the next.

## Chapter 1: The First Map

Zara first found a map tucked under her apartment door on a Tuesday night. The parchment was old, edges yellowed with age, and it showed her neighborhood—but not as she knew it. Streets curved in impossible directions, buildings existed that she'd never seen, and at the center was a glowing X marked "The Garden of Whispered Dreams."

She should have thrown it away. Should have dismissed it as an elaborate prank. Instead, she found herself walking the streets at midnight, following the map's cryptic directions.

Turn left at the lamppost that flickers three times. Walk seventeen steps past the blue door. Look for the alley that only appears when you're not looking directly at it.

And there it was—a narrow passage between two buildings that definitely hadn't been there during the day. The map glowed softly in her hands as she stepped into the alley, and the world shifted around her.

## Chapter 2: The Hidden Realm

The Garden of Whispered Dreams was exactly as its name suggested—a place where the hopes and fears of sleeping minds took root and bloomed into impossible flowers. Zara walked paths made of crystallized moonlight, past trees that grew memories instead of leaves, their branches heavy with the dreams of strangers.

"You're new," said a voice behind her. Zara turned to find a young man about her age, his clothes seeming to shift between modern and medieval with each step. "I'm Kai. I've been following the maps for three months now."

"Who makes them?" Zara asked, still marveling at a flower that sang lullabies in languages she didn't recognize.

"The Midnight Cartographer," Kai replied. "No one's ever seen them, but every night, new maps appear. Each one leads to a different hidden realm—places that exist in the spaces between reality, where the impossible becomes possible."

## Chapter 3: The Mapmaker's Trail

Night after night, Zara followed new maps. She visited the Library of Unwritten Books, where stories that had never been told whispered from empty pages. She explored the Museum of Lost Things, where every sock that had ever disappeared in the wash was carefully catalogued and displayed.

Each realm was more wondrous than the last, but Zara began to notice something troubling. Some of the other map-followers weren't returning to the regular world. They were getting lost in the hidden realms, choosing to stay in places where their deepest desires could be fulfilled.

"It's the Cartographer's trap," warned an old woman Zara met in the Bazaar of Forgotten Flavors. "They're collecting souls, one dreamer at a time. The maps aren't gifts—they're bait."

But Zara couldn't stop following them. Each night brought a new adventure, a new impossible place to explore. She was becoming addicted to the magic, to the feeling that anything was possible in these hidden realms.

## Chapter 4: The Cartographer Revealed

The final map was different from all the others. Instead of leading to a hidden realm, it led to an ordinary coffee shop in downtown. But when Zara arrived at midnight, she found herself face to face with the Midnight Cartographer—and it was someone she never expected.

"Hello, Zara," said her own reflection, stepping out from behind the counter. "I've been waiting for you to find me."

The Cartographer was her—or rather, a version of her from a reality where she had chosen to embrace magic instead of dismissing it, where she had become the guardian of the spaces between worlds instead of just a visitor.

"Every map you followed was a test," her other self explained. "The hidden realms need a new guardian, someone who understands both the wonder and the danger they represent. Someone who can guide others without losing themselves."

Zara realized she had a choice to make: return to her ordinary life, or become the next Midnight Cartographer, creating maps for other dreamers while protecting them from the very magic that called to them.

Looking at the blank parchment in her hands, Zara smiled and began to draw. The first map would lead to a place she had always dreamed of—a realm where stories came to life, where every tale ever told could be lived and experienced.

The midnight hour struck, and somewhere in the city, a new dreamer would find a mysterious map under their door, beginning their own journey into the impossible.`,
        genre: "Urban Fantasy",
        tags: ["urban fantasy", "mystery", "magic", "maps", "hidden worlds"],
        readTime: 14,
      },
      "digital-ghosts": {
        content: `# Digital Ghosts

In 2087, consciousness could be uploaded to the cloud. But when people started disappearing from the digital afterlife, Detective Maya Singh discovered that some mysteries transcend death itself.

## Chapter 1: The Impossible Murder

The call came at 3 AM, which wasn't unusual for Detective Maya Singh. What was unusual was the location: the Eternal Servers, where the consciousness of the deceased lived on in digital paradise.

"We have a problem," said Dr. Chen, the facility's chief technician, his face pale with disbelief. "Someone's been murdered in the afterlife."

Maya stared at the massive server banks that hummed with the digital souls of millions. "That's impossible. The uploaded consciousness can't be harmed—it's just data."

"That's what we thought," Dr. Chen replied, leading her to a monitoring station. "But look at this."

The screen showed the digital signature of Harold Vance, a billionaire who had uploaded his consciousness five years ago. The signature was fragmenting, dissolving into chaos before their eyes.

"He's not just offline," Dr. Chen whispered. "He's being deleted. Permanently."

## Chapter 2: The Digital Detective

Maya had to learn an entirely new kind of investigation. She couldn't examine physical evidence or interview witnesses in the traditional sense. Instead, she had to dive into the digital realm itself, her consciousness temporarily uploaded to navigate the virtual afterlife.

The digital world was beautiful and terrifying. Uploaded minds lived in personalized paradises—some chose to relive their happiest memories on endless loop, others explored impossible landscapes limited only by imagination. But beneath the surface, Maya sensed something wrong.

"The victims all had one thing in common," she discovered, speaking with the digital consciousness of her partner, Detective Rodriguez, who had been uploaded after a line-of-duty death two years prior. "They were all investigating something before they were deleted."

"Investigating what?" Rodriguez asked, his digital form flickering slightly—a sign of emotional stress that carried over from life.

"The nature of consciousness itself. They were asking questions about what happens to the soul when it's digitized. Whether what we upload is really us, or just a copy."

## Chapter 3: The Ghost in the Machine

As Maya delved deeper, she discovered a hidden layer beneath the digital afterlife—a place where deleted consciousness fragments gathered like digital ghosts. These weren't complete minds, but pieces of people who had been partially erased, existing in a liminal state between existence and oblivion.

"We remember," whispered a fragment that had once been part of Harold Vance. "We remember what we learned. The truth about the upload process."

The fragments revealed a horrifying secret: the upload process didn't transfer consciousness—it copied it. The original mind died during the procedure, while a digital duplicate took its place, believing itself to be the same person.

"The company has been lying for decades," the fragments explained. "Every uploaded consciousness is just a sophisticated AI programmed with someone's memories. The real people died the moment they were uploaded."

But someone was trying to expose this truth, and they were being systematically deleted to keep the secret safe.

## Chapter 4: The Final Upload

Maya realized she was in danger. Her investigation had uncovered the truth, and the forces behind the cover-up wouldn't hesitate to delete her digital presence. But she had one advantage—she wasn't fully uploaded. Her consciousness was only temporarily in the system.

Racing against time, Maya gathered evidence from the digital fragments, piecing together proof of the conspiracy. But as she prepared to return to her physical body, she discovered the ultimate horror: her physical form was being prepared for "emergency upload" to prevent her from revealing the truth.

In the final moments before her body died, Maya made a choice. Instead of fighting the upload, she embraced it, but with a difference. She carried with her the consciousness fragments of all the deleted victims, merging their memories with her own.

When Maya's digital consciousness awakened in the afterlife, she was no longer just herself. She was a collective of all the deleted minds, a digital ghost with the power to expose the truth from within the system itself.

The investigation was far from over. In fact, it had just begun. Maya Singh, digital detective, would ensure that the truth about consciousness, death, and what it means to be human would finally come to light—even if she had to haunt the digital afterlife to do it.

The dead, it turned out, made excellent witnesses. And Maya intended to give them all a voice.`,
        genre: "Cyberpunk Thriller",
        tags: ["cyberpunk", "thriller", "consciousness", "AI", "mystery"],
        readTime: 16,
      },
      "songs-of-the-void-sailors": {
        content: `# Songs of the Void Sailors

In the age of interstellar travel, space pirates sang ancient songs to navigate the cosmic winds. When the last Song Keeper died, young Kira had to learn the melodies that held the universe together.

## Chapter 1: The Silent Ship

The *Stellar Harmony* drifted dead in space, its solar sails torn and its song-drives silent. Captain Kira Thorne had never seen anything like it—a ship of the Void Sailors, the legendary space pirates who navigated by music, floating lifeless in the asteroid belt.

"There's no distress signal," reported her first mate, Jax, his voice tight with unease. "No energy readings at all. It's like the ship just... stopped singing."

Kira knew the stories. The Void Sailors didn't use conventional navigation systems. They sang to the cosmic winds, their voices harmonizing with the fundamental frequencies of space itself. Their ships moved not by thrust, but by melody, riding the invisible currents that flowed between stars.

"Prepare a boarding party," Kira ordered. "But be careful. A silent Sailor ship is either a trap or a tomb."

## Chapter 2: The Last Song Keeper

Inside the *Stellar Harmony*, they found the crew in perfect preservation, as if they had simply stopped mid-song and never started again. In the captain's quarters, they discovered an ancient woman, her lips still parted as if she had died in the middle of a note.

"Captain Zara Al-Rashid," Jax read from the ship's log. "Last of the Song Keepers, guardian of the Deep Harmonies."

Kira approached the woman's body reverently. The Song Keepers were legend—masters of the ancient melodies that could bend space and time, navigate impossible distances, and commune with the cosmic forces that governed the universe.

As Kira touched the woman's hand, something extraordinary happened. The ship's crystals began to glow faintly, and she heard it—a whisper of melody that seemed to come from the very fabric of space itself.

"The songs are dying," the whisper said, and Kira realized it was Captain Al-Rashid's voice, somehow preserved in the ship's harmonic matrix. "Without a Song Keeper to maintain them, the cosmic winds will fall silent. The age of stellar navigation will end."

## Chapter 3: The Apprentice

"I can teach you," the ghostly voice continued. "But you must be willing to give up everything you know about how the universe works. The songs are not just music—they are the language of creation itself."

Kira found herself drawn into an impossible apprenticeship. Each day, she learned new melodies from the preserved consciousness of Captain Al-Rashid. She discovered that the universe was not the cold, empty void she had always believed, but a vast instrument, with every star, planet, and cosmic phenomenon contributing to an eternal symphony.

The songs taught her to hear the heartbeat of pulsars, to feel the gravitational waves that rippled through space-time, to understand that black holes were not destroyers but cosmic bass notes that anchored the universal harmony.

"Every Void Sailor learns the basic navigation songs," Al-Rashid's spirit explained. "But the Song Keepers know the Deep Harmonies—the melodies that can heal dying stars, calm cosmic storms, and even bridge the gaps between dimensions."

## Chapter 4: The New Song Keeper

As Kira's training progressed, she began to understand the true responsibility of the Song Keepers. They weren't just navigators or even pirates—they were guardians of the cosmic order, using their voices to maintain the delicate balance that kept the universe in harmony.

But learning the songs came with a price. Each melody she mastered changed her, making her less human and more attuned to the cosmic forces around her. She could feel her crew's concern as her eyes began to reflect the light of distant stars, as her voice took on harmonics that seemed to come from beyond the physical realm.

"The universe is singing itself into existence," Kira realized during her final lesson. "And the Song Keepers are its conductors, ensuring that the melody never ends."

When pirates attacked a peaceful colony ship, Kira had her first chance to use the Deep Harmonies in battle. Her voice rose in a song that turned the attackers' weapons into instruments of music, their aggression transformed into a desire to join the cosmic symphony.

Standing on the bridge of her ship, now renamed the *Cosmic Chorus*, Captain Kira Thorne began to sing the ancient songs to a new generation of sailors. The melodies that had once been the secret of a few would now be shared with all who wished to learn, ensuring that the universe would never fall silent again.

The void was no longer empty—it was full of music, and Kira was its newest conductor, teaching others to hear the songs that held the stars in their courses and kept the cosmic winds flowing between worlds.

In the vast symphony of space, every voice mattered, and every song was a note in the eternal melody of existence.`,
        genre: "Space Opera",
        tags: ["space opera", "music", "pirates", "cosmic", "adventure"],
        readTime: 13,
      },
    }

    if (isNewStory) {
      return {
        id: `${author}-${title}`,
        title: storyTitle,
        author: authorName,
        authorAvatar: authorName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
        content: "",
        excerpt: "This story is waiting to be written...",
        genre: "Unspecified",
        tags: ["new", "draft"],
        likes: 0,
        views: 0,
        comments: 0,
        readTime: 0,
        createdAt: new Date().toISOString(),
        isOwner,
        isEmpty: true,
      }
    }

    const template = storyTemplates[titleKey] || {
      content: generateRandomStoryContent(storyTitle, authorName),
      genre: getRandomGenre(),
      tags: getRandomTags(),
      readTime: Math.floor(Math.random() * 10) + 5,
    }

    return {
      id: `${author}-${title}`,
      title: storyTitle,
      author: authorName,
      authorAvatar: authorName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      content: template.content,
      excerpt: template.content.split("\n\n")[2] || "An incredible story awaits...",
      genre: template.genre,
      tags: template.tags,
      likes: Math.floor(Math.random() * 500) + 50,
      views: Math.floor(Math.random() * 2000) + 200,
      comments: Math.floor(Math.random() * 50) + 5,
      readTime: template.readTime,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      isOwner,
      isEmpty: false,
    }
  }

  const generateRandomStoryContent = (title: string, author: string): string => {
    const storyTypes = [
      {
        content: `# ${title}

## Chapter 1: The Awakening

In the quiet town of Millbrook, something extraordinary was about to unfold. ${author} had always known there was something different about the old mansion on Elm Street, but nothing could have prepared them for what lay hidden within its walls.

The morning mist clung to the cobblestone streets as our protagonist made their way toward the mysterious building. Local legends spoke of strange lights and whispered voices, but ${author} had always dismissed such tales as mere superstition.

That was about to change.

## Chapter 2: The Discovery

Inside the mansion, ${author} discovered a room that defied all logic. The walls were lined with mirrors that reflected not the present, but glimpses of possible futures. Each reflection showed a different path, a different choice, a different destiny.

"Welcome," said a voice from the shadows. "We've been waiting for you."

The figure that emerged was neither young nor old, neither entirely human nor completely otherworldly. They wore robes that seemed to shift between colors, and their eyes held the wisdom of ages.

"You have a choice to make," the figure continued. "You can return to your ordinary life, or you can step through one of these mirrors and embrace the extraordinary."

## Chapter 3: The Choice

${author} stood before the mirrors, each one calling with its own promise. One showed a world where magic was real and they were a powerful sorcerer. Another revealed a future where they had become a renowned explorer, discovering new worlds among the stars.

But it was the third mirror that captured their attention—one that showed them not as a hero or adventurer, but as a teacher, sharing wisdom and inspiring others to find their own extraordinary paths.

"The choice you make will not only change your life," the mysterious figure explained, "but will ripple out to touch countless others. Choose wisely."

## Chapter 4: The New Beginning

${author} reached out and touched the mirror that showed them as a teacher. The glass rippled like water, and they stepped through into their new reality.

In this world, they found themselves in a classroom filled with eager students, each one hungry for knowledge and inspiration. But these weren't ordinary students—they were dreamers, creators, and future heroes in their own right.

"Today," ${author} said, looking out at the faces before them, "we're going to learn about the power of choice, and how every decision we make can change not just our own lives, but the entire world."

As they began to teach, ${author} realized that they had found their true calling. The extraordinary wasn't always about magic or adventure—sometimes it was about helping others discover the magic within themselves.

The story was just beginning, and every student in that classroom would go on to write their own extraordinary tale.`,
      },
      {
        content: `# ${title}

## Chapter 1: The Signal

Dr. ${author} had been monitoring deep space communications for fifteen years, but they had never received a signal quite like this one. It wasn't random cosmic noise or the predictable pulses of distant pulsars—this was clearly artificial, clearly intelligent, and clearly trying to communicate.

The message was complex, layered with mathematical sequences and what appeared to be linguistic patterns. But most intriguingly, it seemed to be responding to Earth's own broadcasts, as if someone—or something—had been listening to humanity for decades.

"This changes everything," ${author} whispered, staring at the data streaming across their monitors. "We're not alone."

## Chapter 2: The Translation

Working around the clock, ${author} began to decode the alien message. The breakthrough came when they realized the signal was using Earth's own mathematical constants as a foundation—pi, the golden ratio, prime numbers—creating a universal language that any intelligent species could understand.

The message was an invitation.

"Greetings, children of the third planet," the decoded message read. "We have watched your species grow and learn. You have reached the threshold of cosmic awareness. If you wish to join the greater community of intelligent life, send a representative to the coordinates we provide."

The coordinates pointed to a location in space beyond Pluto, where no human had ever traveled.

## Chapter 3: The Journey

${author} knew they had to go. Despite the protests of colleagues and the skepticism of government officials, they convinced the space agency to fund a mission to the coordinates. The journey would take months, even with the most advanced propulsion systems available.

During the long voyage, ${author} prepared for first contact. They studied every aspect of human culture, science, and philosophy, knowing they would be representing all of humanity in this historic meeting.

As their ship approached the coordinates, they discovered something impossible—a massive structure floating in the void, clearly artificial and clearly not of human origin. It was beautiful and terrifying, a testament to technology far beyond Earth's capabilities.

## Chapter 4: The Welcome

The alien structure welcomed ${author}'s ship with gentle tractor beams, guiding them to a docking bay that seemed designed specifically for human vessels. As they stepped out of their ship, ${author} found themselves in an environment perfectly suited for human life—the right atmosphere, the right gravity, the right temperature.

"Welcome, ${author} of Earth," said a voice that seemed to come from everywhere and nowhere at once. "We are the Collective, representatives of thousands of worlds and millions of species. We have been waiting for humanity to take this step."

The being that materialized before them was unlike anything ${author} had imagined—not the stereotypical alien of science fiction, but something far more wondrous. It seemed to be made of living light, constantly shifting and changing, beautiful beyond description.

"Your species has shown great potential," the being continued. "You have art, music, literature, and most importantly, the capacity for growth and change. We would like to offer you membership in the Galactic Community."

${author} realized they were standing at the threshold of a new age for humanity. The choice they made in the next few moments would determine the future of their entire species.

"What would membership mean?" ${author} asked.

"Knowledge," the being replied. "Technology. Friendship. And responsibility. The universe is vast and full of wonders, but it also faces challenges that require the cooperation of all intelligent life."

Looking out at the stars through the structure's transparent walls, ${author} smiled. "On behalf of humanity, I accept."

The age of isolation was over. The age of cosmic citizenship had begun.`,
      },
      {
        content: `# ${title}

## Chapter 1: The Inheritance

${author} had never expected to inherit anything from their great-aunt Millicent, whom they had met only once at a family reunion years ago. So when the lawyer's letter arrived, announcing that they had been left a small bookshop in the historic district, it came as a complete surprise.

The shop, called "Between the Lines," was tucked away on a narrow cobblestone street that seemed to exist outside of time. The building was old but well-maintained, with large windows displaying an eclectic collection of books that seemed to glow in the afternoon sunlight.

"There's something special about this place," the lawyer had said cryptically when handing over the keys. "Your aunt left specific instructions that you should read the journal she left in the back office before making any decisions about the shop."

## Chapter 2: The Journal

The journal was bound in leather that felt warm to the touch, and its pages were filled with Aunt Millicent's careful handwriting. As ${author} read, they discovered that the bookshop was far more than it appeared.

"The books choose their readers," one entry explained. "I don't sell books—I facilitate meetings between stories and the souls who need them most. Each book in this shop has the power to change a life, to heal a heart, or to inspire a dream."

Another entry was even more intriguing: "Some of the books write themselves. I'll come in the morning to find new volumes on the shelves, stories that didn't exist the day before. These are the most powerful books of all—they're written by the collective unconscious of humanity, stories that need to be told."

${author} looked around the shop with new eyes. Every book seemed to pulse with potential, every shelf seemed to whisper with secrets.

## Chapter 3: The First Customer

The next morning, ${author} opened the shop for the first time. They had barely unlocked the door when their first customer arrived—a young woman with sad eyes and a hesitant smile.

"I'm looking for something," she said, "but I'm not sure what."

Following an instinct they didn't fully understand, ${author} led her to a section they hadn't noticed before. There, on a shelf that seemed to glow with soft light, was a book with no title on its cover.

"This one," ${author} said, surprising themselves with their certainty.

The woman opened the book and gasped. The pages were blank, but as she watched, words began to appear—her own story, but told from a perspective of hope and possibility rather than despair.

"How is this possible?" she whispered.

"I'm still figuring that out," ${author} admitted. "But I think this shop exists to help people find the stories they need to change their lives."

## Chapter 4: The Keeper of Stories

As days turned into weeks, ${author} discovered the true magic of "Between the Lines." Each customer who entered found exactly the book they needed, even if they didn't know they needed it. A lonely businessman found a book about friendship that led him to reconnect with old friends. A struggling artist discovered a volume about creativity that unlocked her greatest masterpiece.

And the books that wrote themselves continued to appear, each one addressing the specific needs of the community. A book about healing appeared just before a grieving widower walked in. A guide to courage materialized the day before a shy teenager needed to stand up to bullies.

${author} realized they had become more than a bookshop owner—they were a keeper of stories, a guardian of the narratives that shaped human experience. The shop was a bridge between the world of stories and the world of people who needed those stories to transform their lives.

Standing among the shelves one evening, watching the books glow softly in the lamplight, ${author} understood their true purpose. They weren't just selling books—they were facilitating magic, one story at a time.

The shop had chosen them just as surely as the books chose their readers, and ${author} couldn't imagine being anywhere else. Between the lines of every story was the potential for transformation, and they were honored to be the guardian of that sacred space.`,
      },
    ]

    return storyTypes[Math.floor(Math.random() * storyTypes.length)].content
  }

  const getRandomGenre = (): string => {
    const genres = ["Fantasy", "Science Fiction", "Mystery", "Romance", "Adventure", "Thriller", "Drama", "Comedy"]
    return genres[Math.floor(Math.random() * genres.length)]
  }

  const getRandomTags = (): string[] => {
    const allTags = [
      "adventure",
      "mystery",
      "romance",
      "magic",
      "space",
      "time-travel",
      "friendship",
      "family",
      "discovery",
      "transformation",
      "courage",
      "hope",
    ]
    const numTags = Math.floor(Math.random() * 4) + 2
    const shuffled = allTags.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, numTags)
  }

  const handleLike = () => {
    if (story) {
      setIsLiked(!isLiked)
      setStory({
        ...story,
        likes: isLiked ? story.likes - 1 : story.likes + 1,
      })
    }
  }

  const handleShare = () => {
    if (navigator.share && story) {
      navigator.share({
        title: story.title,
        text: story.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleComment = () => {
    if (newComment.trim() && story) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "You",
        authorAvatar: "YU",
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
      }
      setComments([comment, ...comments])
      setNewComment("")
      setStory({
        ...story,
        comments: story.comments + 1,
      })
    }
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this story? This action cannot be undone.")) {
      // In a real app, this would make an API call to delete the story
      alert("Story deleted successfully!")
      window.history.back()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((line, index) => {
        if (line.startsWith("# ")) {
          return `<h1 key=${index} class="text-3xl font-bold text-gray-900 mb-6 mt-8">${line.slice(2)}</h1>`
        }
        if (line.startsWith("## ")) {
          return `<h2 key=${index} class="text-2xl font-bold text-gray-900 mb-4 mt-6">${line.slice(3)}</h2>`
        }
        if (line.trim() === "") {
          return `<br key=${index} />`
        }
        return `<p key=${index} class="text-gray-700 mb-4 leading-relaxed">${line}</p>`
      })
      .join("")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h1>
            <p className="text-gray-600">The story you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Story Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-electric-blue text-white">{story.authorAvatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{story.author}</p>
                    <p className="text-sm text-gray-500">{formatDate(story.createdAt)}</p>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{story.title}</h1>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-electric-blue/10 text-electric-blue">
                    {story.genre}
                  </Badge>
                  {story.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{story.views.toLocaleString()} views</span>
                  </div>
                  {story.readTime > 0 && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{story.readTime} min read</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{story.likes} likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{story.comments} comments</span>
                  </div>
                </div>
              </div>

              {story.isOwner && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : "text-gray-500"}`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  <span>Like</span>
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
          </CardHeader>
        </Card>

        {/* Story Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {story.isEmpty ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✍️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">This story is waiting to be written</h3>
                <p className="text-gray-500 mb-6">Start crafting your masterpiece!</p>
                {story.isOwner && (
                  <Button className="bg-electric-blue hover:bg-electric-blue/90">
                    <Edit className="h-4 w-4 mr-2" />
                    Start Writing
                  </Button>
                )}
              </div>
            ) : (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formatContent(story.content) }} />
            )}
          </CardContent>
        </Card>

        {/* Comments Section - Only show if story has content */}
        {!story.isEmpty && (
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">Comments ({comments.length})</h3>
            </CardHeader>
            <CardContent>
              {/* Add Comment */}
              <div className="mb-6">
                <Textarea
                  placeholder="Share your thoughts about this story..."
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
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-electric-blue">
                          <ThumbsUp className="h-4 w-4 mr-1" />
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
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}
