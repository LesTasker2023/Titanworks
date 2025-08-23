'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import {
  Bell,
  Calendar,
  Clock,
  Download,
  Eye,
  Home,
  Menu,
  MessageCircle,
  MoreHorizontal,
  PlaySquare,
  Search,
  Share2,
  SortDesc,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import { useState } from 'react';

interface Video {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  views: string;
  uploadTime: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  verified: boolean;
  description?: string;
  likes?: string;
  subscribers?: string;
  category?: string;
  tags?: string[];
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  time: string;
  replies?: Comment[];
  verified?: boolean;
}

// Real video data with actual sample videos
const CURRENT_VIDEO: Video = {
  id: 'main',
  title: 'Big Buck Bunny - Open Source 3D Animation',
  channel: 'Blender Foundation',
  channelAvatar:
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=50&h=50&fit=crop&crop=face',
  views: '12.3M',
  uploadTime: '3 years ago',
  duration: '9:56',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  thumbnail:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  verified: true,
  description: `Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit's modest countryside home becomes the nucleus of a mammoth fight.

This is the Peach Open Movie Project, created by the Blender Foundation. It's an open source 3D animated short film that showcases the capabilities of Blender, a free and open source 3D creation suite.

The film was entirely created using open source software - Blender for modeling, rigging, animation, shading, lighting, and rendering; Python for scripting; GIMP for textures and compositing; Inkscape for 2D design work; and various other open source tools.

🎯 Project Goals:
• Showcase Blender's animation capabilities
• Create a fun, family-friendly story  
• Demonstrate open source filmmaking
• Provide learning resources for the community

👥 Credits:
Director: Sacha Goedegebure
Art Director: Andreas Goralczyk
Technical Director: Campbell Barton
Producer: Ton Roosendaal

This video is available under Creative Commons Attribution 3.0 license.`,
  likes: '89.2K',
  subscribers: '1.2M',
  category: 'Animation',
  tags: ['animation', '3D', 'blender', 'open source', 'short film'],
};

const SIDEBAR_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Elephant Dream - First Blender Open Movie',
    channel: 'Blender Foundation',
    channelAvatar:
      'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=50&h=50&fit=crop&crop=face',
    views: '8.9M',
    uploadTime: '17 years ago',
    duration: '10:53',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    verified: true,
    category: 'Animation',
  },
  {
    id: '2',
    title: 'Sintel - Third Blender Open Movie',
    channel: 'Blender Foundation',
    channelAvatar:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=50&h=50&fit=crop&crop=face',
    views: '15.6M',
    uploadTime: '13 years ago',
    duration: '14:48',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnail:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    verified: true,
    category: 'Animation',
  },
  {
    id: '3',
    title: 'Tears of Steel - Live Action + CGI',
    channel: 'Blender Foundation',
    channelAvatar:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=50&h=50&fit=crop&crop=face',
    views: '11.2M',
    uploadTime: '12 years ago',
    duration: '12:14',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
    verified: true,
    category: 'Sci-Fi',
  },
  {
    id: '4',
    title: 'For Bigger Blazes - Fire Effects Demo',
    channel: 'Google Demo',
    channelAvatar:
      'https://images.unsplash.com/photo-1529612700005-e35377bf1415?w=50&h=50&fit=crop&crop=face',
    views: '2.8M',
    uploadTime: '8 years ago',
    duration: '0:15',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    verified: false,
    category: 'Tech Demo',
  },
  {
    id: '5',
    title: 'For Bigger Fun - Adventure Demo',
    channel: 'Google Demo',
    channelAvatar:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=50&h=50&fit=crop&crop=face',
    views: '3.4M',
    uploadTime: '8 years ago',
    duration: '1:00',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
    verified: false,
    category: 'Gaming',
  },
  {
    id: '6',
    title: 'For Bigger Joy - Happiness Demo',
    channel: 'Google Demo',
    channelAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    views: '1.9M',
    uploadTime: '8 years ago',
    duration: '0:30',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
    verified: false,
    category: 'Lifestyle',
  },
];

const COMMENTS: Comment[] = [
  {
    id: '1',
    user: 'AnimationPro2024',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
    content:
      'This is absolutely incredible! The quality of animation achieved with open source tools is mind-blowing. Big Buck Bunny was my introduction to Blender and it inspired me to start my career in 3D animation. The attention to detail in the fur, lighting, and character expressions is phenomenal.',
    likes: 1247,
    time: '2 days ago',
    verified: true,
    replies: [
      {
        id: '1-1',
        user: 'Blender Foundation',
        avatar:
          'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=40&h=40&fit=crop&crop=face',
        content:
          "Thank you so much! We're thrilled that Big Buck Bunny inspired your animation journey. That's exactly what we hoped to achieve with this project. Keep creating amazing work!",
        likes: 89,
        time: '1 day ago',
        verified: true,
      },
      {
        id: '1-2',
        user: 'CreativeStudent',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=40&h=40&fit=crop&crop=face',
        content:
          "Same here! This was my first exposure to professional-quality open source animation. Now I'm studying 3D animation in college.",
        likes: 34,
        time: '1 day ago',
      },
    ],
  },
  {
    id: '2',
    user: 'OpenSourceFan',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    content:
      "The fact that this was made entirely with free and open source software is revolutionary. Blender has come so far since this was released. It's amazing to see what's possible when passionate developers and artists collaborate.",
    likes: 892,
    time: '5 days ago',
    replies: [
      {
        id: '2-1',
        user: 'TechEnthusiast',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        content:
          'Absolutely! Blender is now used by major studios. This project proved that open source can compete with expensive proprietary software.',
        likes: 156,
        time: '4 days ago',
      },
    ],
  },
  {
    id: '3',
    user: 'FilmStudent2023',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    content:
      'Watching this in film school right now. The storytelling is so effective despite being a short film. The way they build sympathy for Buck and then his transformation is masterful. Plus the technical achievement is incredible.',
    likes: 445,
    time: '1 week ago',
  },
  {
    id: '4',
    user: 'ParentReviewer',
    avatar:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face',
    content:
      "My kids absolutely love this! It's so refreshing to find quality animation that's both entertaining and suitable for the whole family. The humor works on multiple levels too.",
    likes: 623,
    time: '1 week ago',
  },
  {
    id: '5',
    user: 'BlenderNewbie',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
    content:
      'Just started learning Blender and this is so inspiring! Can anyone recommend good tutorials for beginners? The level of detail here seems impossible to achieve.',
    likes: 234,
    time: '2 weeks ago',
    replies: [
      {
        id: '5-1',
        user: 'HelpfulMentor',
        avatar:
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
        content:
          'Start with Donut tutorials by Blender Guru, then move to character modeling. This level takes years to master, but everyone starts somewhere!',
        likes: 67,
        time: '1 week ago',
      },
    ],
  },
];

const SIDEBAR_MENU = [
  { icon: Home, label: 'Home', active: true },
  { icon: TrendingUp, label: 'Trending', active: false },
  { icon: Users, label: 'Subscriptions', active: false },
  { icon: Clock, label: 'Watch Later', active: false },
  { icon: PlaySquare, label: 'Your Videos', active: false },
  { icon: ThumbsUp, label: 'Liked Videos', active: false },
];

function VideoInfo({
  video,
  onLike,
  onSubscribe,
  isLiked,
  isSubscribed,
  onTheaterMode,
  openModal,
}: {
  video: Video;
  onLike?: () => void;
  onSubscribe?: () => void;
  isLiked?: boolean;
  isSubscribed?: boolean;
  onTheaterMode?: () => void;
  openModal?: (modalType: string, data?: any) => void;
}) {
  const [localIsLiked, setLocalIsLiked] = useState(isLiked || false);
  const [localIsDisliked, setLocalIsDisliked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [likesCount, setLikesCount] = useState(
    parseInt(video.likes?.replace('K', '000').replace('.', '') || '0')
  );
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleLike = () => {
    if (localIsLiked) {
      setLikesCount(prev => prev - 1);
      setLocalIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setLocalIsLiked(true);
      if (localIsDisliked) setLocalIsDisliked(false);
    }
    onLike?.();
  };

  const formatLikes = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        openModal?.('link-copied');
        setShowShareMenu(false);
      },
    },
    { name: 'Facebook', action: () => openModal?.('share-facebook') },
    { name: 'Twitter', action: () => openModal?.('share-twitter') },
    { name: 'WhatsApp', action: () => openModal?.('share-whatsapp') },
    { name: 'Email', action: () => openModal?.('share-email') },
    { name: 'Embed', action: () => openModal?.('embed-code') },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-content-primary mb-2">{video.title}</h1>

        <div className="flex items-center gap-4 text-sm text-content-secondary mb-4">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {video.views} views
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {video.uploadTime}
          </div>
          {video.category && <Badge variant="secondary">{video.category}</Badge>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              openModal?.(isBookmarked ? 'bookmark-removed' : 'bookmark-added');
            }}
            className={`ml-auto ${isBookmarked ? 'text-primary' : ''}`}
          >
            {isBookmarked ? '🔖' : '🔗'} {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full overflow-hidden">
              <Image
                src={video.channelAvatar}
                alt={`${video.channel} avatar`}
                className="w-full h-full object-cover"
                width={48}
                height={48}
              />
            </div>
            <div>
              <div className="font-semibold text-content-primary flex items-center gap-2">
                {video.channel}
                {video.verified && <UserCheck className="w-4 h-4 text-primary" />}
              </div>
              <div className="text-sm text-content-secondary">{video.subscribers} subscribers</div>
            </div>
          </div>

          <Button
            onClick={() => {
              onSubscribe?.();
            }}
            className={`${isSubscribed ? 'bg-surface-secondary text-content-primary' : ''}`}
            variant={isSubscribed ? 'secondary' : 'default'}
          >
            <Bell className="mr-2 h-4 w-4" />
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center rounded-full bg-surface-secondary">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`rounded-l-full ${localIsLiked ? 'text-primary' : ''}`}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              {formatLikes(likesCount)}
            </Button>
            <div className="w-px h-6 bg-border" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setLocalIsDisliked(!localIsDisliked);
                if (localIsLiked) {
                  setLocalIsLiked(false);
                  setLikesCount(prev => prev - 1);
                }
              }}
              className={`rounded-r-full ${localIsDisliked ? 'text-primary' : ''}`}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <Button variant="secondary" size="sm" onClick={() => setShowShareMenu(!showShareMenu)}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            {showShareMenu && (
              <div className="absolute top-full mt-2 right-0 bg-surface-primary border border-border rounded-lg shadow-lg p-2 min-w-48 z-10">
                {shareOptions.map(option => (
                  <Button
                    key={option.name}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={option.action}
                  >
                    {option.name}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              openModal?.('download-options');
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              openModal?.('more-options');
            }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          {onTheaterMode && (
            <Button variant="ghost" size="sm" onClick={onTheaterMode} title="Theater Mode">
              🎭
            </Button>
          )}
        </div>
      </div>

      {video.description && (
        <Card className="p-4 bg-surface-secondary/30">
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-sm text-content-secondary">
              <span>{video.views} views</span>
              <span>{video.uploadTime}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => openModal?.('video-info')}
              >
                ℹ️ More Info
              </Button>
            </div>

            <div
              className={`text-content-secondary leading-relaxed ${
                !showFullDescription ? 'line-clamp-4' : ''
              }`}
            >
              {video.description.split('\n').map((line, index) => (
                <p
                  key={index}
                  className={
                    line.startsWith('🎯') || line.startsWith('👥') ? 'font-semibold mt-4' : ''
                  }
                >
                  {line}
                </p>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="p-0 h-auto text-primary hover:bg-transparent font-semibold"
            >
              {showFullDescription ? 'Show less' : 'Show more'}
            </Button>

            {video.tags && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                {video.tags.map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs cursor-pointer hover:bg-primary hover:text-white"
                    onClick={() => openModal?.('tag-search', { tag })}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Video Stats */}
            <div className="flex gap-4 pt-2 border-t border-border text-xs text-content-secondary">
              <span>👁️ {video.views} views</span>
              <span>👍 {formatLikes(likesCount)} likes</span>
              <span>💬 {Math.floor(Math.random() * 500) + 100} comments</span>
              <span>📤 {Math.floor(Math.random() * 50) + 10} shares</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function CommentSection({
  comments,
  openModal,
}: {
  comments: Comment[];
  openModal?: (modalType: string, data?: any) => void;
}) {
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState('top');
  const [showReplies, setShowReplies] = useState<Set<string>>(new Set());
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [dislikedComments, setDislikedComments] = useState<Set<string>>(new Set());
  const [commentLikes, setCommentLikes] = useState<{ [key: string]: number }>({});
  const [localComments, setLocalComments] = useState(comments);

  const toggleReplies = (commentId: string) => {
    const newShowReplies = new Set(showReplies);
    if (newShowReplies.has(commentId)) {
      newShowReplies.delete(commentId);
    } else {
      newShowReplies.add(commentId);
    }
    setShowReplies(newShowReplies);
  };

  const handleCommentLike = (commentId: string, currentLikes: number) => {
    const newLikedComments = new Set(likedComments);
    const newDislikedComments = new Set(dislikedComments);
    const newCommentLikes = { ...commentLikes };

    if (likedComments.has(commentId)) {
      newLikedComments.delete(commentId);
      newCommentLikes[commentId] = (newCommentLikes[commentId] || currentLikes) - 1;
    } else {
      newLikedComments.add(commentId);
      newCommentLikes[commentId] = (newCommentLikes[commentId] || currentLikes) + 1;
      newDislikedComments.delete(commentId);
    }

    setLikedComments(newLikedComments);
    setDislikedComments(newDislikedComments);
    setCommentLikes(newCommentLikes);
  };

  const handleCommentDislike = (commentId: string) => {
    const newLikedComments = new Set(likedComments);
    const newDislikedComments = new Set(dislikedComments);
    const newCommentLikes = { ...commentLikes };

    if (dislikedComments.has(commentId)) {
      newDislikedComments.delete(commentId);
    } else {
      newDislikedComments.add(commentId);
      if (likedComments.has(commentId)) {
        newLikedComments.delete(commentId);
        newCommentLikes[commentId] = (newCommentLikes[commentId] || 0) - 1;
      }
    }

    setLikedComments(newLikedComments);
    setDislikedComments(newDislikedComments);
    setCommentLikes(newCommentLikes);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: `new-${Date.now()}`,
        user: 'You',
        avatar: '👤',
        content: newComment,
        likes: 0,
        time: 'Just now',
        verified: false,
      };
      setLocalComments([newCommentObj, ...localComments]);
      setNewComment('');
      openModal?.('comment-added');
    }
  };

  const sortedComments = [...localComments].sort((a, b) => {
    if (sortBy === 'newest') {
      return 0; // Keep original order for demo
    }
    return (commentLikes[b.id] || b.likes) - (commentLikes[a.id] || a.likes);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-content-primary flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          {localComments.length} Comments
        </h3>
        <div className="flex items-center gap-2">
          <SortDesc className="w-4 h-4 text-content-secondary" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-surface-secondary border border-border rounded-lg px-3 py-1 text-sm text-content-primary"
          >
            <option value="top">Top comments</option>
            <option value="newest">Newest first</option>
          </select>
        </div>
      </div>

      {/* Add Comment */}
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">👤</div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 border-b-2 border-border bg-transparent text-content-primary placeholder:text-content-secondary resize-none focus:border-primary focus:outline-none"
            rows={2}
          />
          {newComment && (
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="ghost" size="sm" onClick={() => setNewComment('')}>
                Cancel
              </Button>
              <Button size="sm" disabled={!newComment.trim()} onClick={handleAddComment}>
                Comment
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {sortedComments.map(comment => (
          <div key={comment.id} className="space-y-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-primary rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={comment.avatar}
                  alt={`${comment.user} avatar`}
                  className="w-full h-full object-cover"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-content-primary">{comment.user}</span>
                  {comment.verified && <UserCheck className="w-4 h-4 text-primary" />}
                  <span className="text-sm text-content-secondary">{comment.time}</span>
                </div>
                <p className="text-content-secondary mb-2 leading-relaxed">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-0 h-auto hover:bg-transparent ${likedComments.has(comment.id) ? 'text-primary' : ''}`}
                    onClick={() => handleCommentLike(comment.id, comment.likes)}
                  >
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {commentLikes[comment.id] || comment.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-0 h-auto hover:bg-transparent ${dislikedComments.has(comment.id) ? 'text-primary' : ''}`}
                    onClick={() => handleCommentDislike(comment.id)}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-primary hover:bg-transparent"
                    onClick={() =>
                      openModal?.('reply-comment', { user: comment.user, content: comment.content })
                    }
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-13">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReplies(comment.id)}
                  className="text-primary hover:bg-transparent mb-3"
                >
                  {showReplies.has(comment.id) ? 'Hide' : 'Show'} {comment.replies.length} replies
                </Button>

                {showReplies.has(comment.id) && (
                  <div className="space-y-3">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={reply.avatar}
                            alt={`${reply.user} avatar`}
                            className="w-full h-full object-cover"
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-content-primary">{reply.user}</span>
                            {reply.verified && <UserCheck className="w-3 h-3 text-primary" />}
                            <span className="text-xs text-content-secondary">{reply.time}</span>
                          </div>
                          <p className="text-content-secondary text-sm mb-2 leading-relaxed">
                            {reply.content}
                          </p>
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 h-auto hover:bg-transparent"
                              onClick={() => handleCommentLike(reply.id, reply.likes)}
                            >
                              <ThumbsUp className="mr-1 h-3 w-3" />
                              {commentLikes[reply.id] || reply.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 h-auto hover:bg-transparent"
                              onClick={() => handleCommentDislike(reply.id)}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 h-auto text-primary hover:bg-transparent"
                              onClick={() => openModal?.('reply-comment', { user: reply.user })}
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoSidebar({
  videos,
  currentVideoId,
  onVideoSelect,
  onWatchLater,
  watchLaterVideos,
  openModal,
}: {
  videos: Video[];
  currentVideoId: string;
  onVideoSelect: (video: Video) => void;
  onWatchLater?: (video: Video) => void;
  watchLaterVideos?: Set<string>;
  openModal?: (modalType: string, data?: any) => void;
}) {
  const [autoplay, setAutoplay] = useState(true);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-content-primary">Up next</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-content-secondary">Autoplay</span>
          <button
            onClick={() => {
              setAutoplay(!autoplay);
              openModal?.('autoplay-toggled', { enabled: !autoplay });
            }}
            className={`w-11 h-6 rounded-full transition-colors ${
              autoplay ? 'bg-primary' : 'bg-surface-secondary'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                autoplay ? 'translate-x-5' : 'translate-x-0.5'
              } mt-0.5`}
            />
          </button>
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => openModal?.('filter-videos', { filter: 'All' })}
        >
          All
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openModal?.('filter-videos', { filter: 'Animation' })}
        >
          Animation
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openModal?.('filter-videos', { filter: 'Tech' })}
        >
          Tech
        </Button>
      </div>

      {videos
        .filter(v => v.id !== currentVideoId)
        .map(video => (
          <Card
            key={video.id}
            className="p-3 hover:bg-surface-secondary/30 transition-colors cursor-pointer group relative"
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
            onClick={() => onVideoSelect(video)}
          >
            <div className="flex gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-40 h-24 bg-surface-secondary rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {hoveredVideo === video.id && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        ▶️
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
                {watchLaterVideos?.has(video.id) && (
                  <div className="absolute top-1 left-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded">
                    📋
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-content-primary line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {video.title}
                </h4>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm text-content-secondary">{video.channel}</span>
                  {video.verified && <UserCheck className="w-3 h-3 text-primary" />}
                </div>
                <div className="text-xs text-content-secondary">
                  {video.views} views • {video.uploadTime}
                </div>
                {video.category && (
                  <Badge variant="outline" className="text-xs mt-1">
                    {video.category}
                  </Badge>
                )}
              </div>

              {/* Enhanced More Options */}
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={e => {
                    e.stopPropagation();
                    onWatchLater?.(video);
                  }}
                  title="Add to Watch Later"
                >
                  {watchLaterVideos?.has(video.id) ? '📋' : '⏰'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={e => {
                    e.stopPropagation();
                    openModal?.('video-options', {
                      video,
                      inWatchLater: watchLaterVideos?.has(video.id),
                    });
                  }}
                  title="More Options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Preview on Hover */}
            {hoveredVideo === video.id && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white p-2 rounded-b-lg">
                <div className="text-xs">
                  Click to watch • {video.category} • {video.duration}
                </div>
              </div>
            )}
          </Card>
        ))}

      {/* Suggestions */}
      <div className="pt-4 border-t border-border">
        <h4 className="font-semibold text-content-primary mb-3 flex items-center gap-2">
          🔥 Trending Now
        </h4>
        <div className="space-y-2">
          {['Advanced Blender Tutorial', 'React Development Tips', 'UI Design Masterclass'].map(
            (title, index) => (
              <div
                key={index}
                className="text-sm text-content-secondary hover:text-primary cursor-pointer p-2 hover:bg-surface-secondary rounded"
                onClick={() => openModal?.('trending-video', { title })}
              >
                {index + 1}. {title}
              </div>
            )
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="pt-4 border-t border-border text-xs text-content-secondary">
        <div className="grid grid-cols-2 gap-2">
          <div>📺 {videos.length} videos</div>
          <div>⏱️ 2.5h total</div>
          <div>👁️ 50M+ views</div>
          <div>🎯 5 categories</div>
        </div>
      </div>
    </div>
  );
}

export default function YouTubePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(CURRENT_VIDEO);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [watchLaterCount, setWatchLaterCount] = useState(12);
  const [likedVideosCount, setLikedVideosCount] = useState(247);
  const [activeTab, setActiveTab] = useState('Home');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(75);
  const [watchLaterVideos, setWatchLaterVideos] = useState<Set<string>>(new Set());
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [subscribedChannels, setSubscribedChannels] = useState<Set<string>>(new Set());
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'blender tutorial',
    'open source animation',
    '3d modeling',
  ]);
  const [viewHistory, setViewHistory] = useState<Video[]>([]);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [qualitySettings, setQualitySettings] = useState('1080p');
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Modal state
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  const openModal = (modalType: string, data?: any) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const handleVideoSelect = (video: Video) => {
    // Add to view history
    setViewHistory(prev => {
      const filtered = prev.filter(v => v.id !== video.id);
      return [video, ...filtered].slice(0, 20); // Keep last 20 videos
    });

    setCurrentVideo(video);
    // Simulate view count increase
    video.views = `${(parseFloat(video.views.replace('M', '')) + 0.1).toFixed(1)}M`;

    // Auto-scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Add to search history
      setSearchHistory(prev => {
        const filtered = prev.filter(q => q !== searchQuery);
        return [searchQuery, ...filtered].slice(0, 10);
      });

      // Simulate search results
      const searchResults = SIDEBAR_VIDEOS.filter(
        video =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (searchResults.length > 0) {
        openModal('search-results', { query: searchQuery, results: searchResults });
      } else {
        openModal('search-no-results', { query: searchQuery });
      }
    }
  };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);

    // Simulate different views
    if (tabName === 'Watch Later') {
      const watchLaterList = SIDEBAR_VIDEOS.filter(v => watchLaterVideos.has(v.id));
      openModal('watch-later', { count: watchLaterCount, videos: watchLaterList });
    } else if (tabName === 'Liked Videos') {
      const likedList = SIDEBAR_VIDEOS.filter(v => likedVideos.has(v.id));
      openModal('liked-videos', { count: likedVideosCount, videos: likedList });
    } else if (tabName === 'Trending') {
      openModal('trending-videos');
    } else if (tabName === 'Subscriptions') {
      const subCount = subscribedChannels.size;
      openModal('subscriptions', { count: subCount });
    } else if (tabName === 'Your Videos') {
      openModal('your-channel');
    }
  };

  const toggleWatchLater = (video: Video) => {
    const newWatchLater = new Set(watchLaterVideos);
    if (newWatchLater.has(video.id)) {
      newWatchLater.delete(video.id);
      setWatchLaterCount(prev => prev - 1);
      openModal('watch-later-removed', { video });
    } else {
      newWatchLater.add(video.id);
      setWatchLaterCount(prev => prev + 1);
      openModal('watch-later-added', { video });
    }
    setWatchLaterVideos(newWatchLater);
  };

  const toggleLikeVideo = (video: Video) => {
    const newLikedVideos = new Set(likedVideos);
    if (newLikedVideos.has(video.id)) {
      newLikedVideos.delete(video.id);
      setLikedVideosCount(prev => prev - 1);
    } else {
      newLikedVideos.add(video.id);
      setLikedVideosCount(prev => prev + 1);
    }
    setLikedVideos(newLikedVideos);
  };

  const toggleSubscribe = (channel: string) => {
    const newSubscribed = new Set(subscribedChannels);
    if (newSubscribed.has(channel)) {
      newSubscribed.delete(channel);
      openModal('unsubscribed', { channel });
    } else {
      newSubscribed.add(channel);
      openModal('subscribed', { channel });
    }
    setSubscribedChannels(newSubscribed);
  };

  const openAdvancedSettings = () => {
    openModal('advanced-settings', {
      quality: qualitySettings,
      volume,
      playbackSpeed,
      captions: captionsEnabled,
      theaterMode: isTheaterMode,
      autoplay: autoplayEnabled,
      darkMode,
      viewHistoryCount: viewHistory.length,
      searchHistoryCount: searchHistory.length,
      subscriptionsCount: subscribedChannels.size,
    });
  };

  const clearHistory = () => {
    openModal('confirm-clear-history');
  };

  const exportData = () => {
    const userData = {
      subscriptions: Array.from(subscribedChannels),
      watchLater: Array.from(watchLaterVideos),
      likedVideos: Array.from(likedVideos),
      viewHistory: viewHistory.slice(0, 10),
      searchHistory: searchHistory,
      settings: {
        quality: qualitySettings,
        volume,
        playbackSpeed,
        captions: captionsEnabled,
        autoplay: autoplayEnabled,
        darkMode,
      },
    };

    console.log('User Data Export:', userData);
    openModal('data-exported', { userData });
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'link-copied':
        return {
          title: '🔗 Link Copied',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-content-primary">Video link copied to clipboard!</p>
              <p className="text-sm text-content-secondary mt-2">Share this video with friends</p>
            </div>
          ),
        };

      case 'share-facebook':
        return {
          title: '📘 Share on Facebook',
          content: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentVideo.thumbnail}
                  alt=""
                  className="w-16 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium text-content-primary">{currentVideo.title}</p>
                  <p className="text-sm text-content-secondary">{currentVideo.channel}</p>
                </div>
              </div>
              <textarea
                placeholder="Add a comment..."
                className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                rows={3}
              />
              <Button className="w-full">Share on Facebook</Button>
            </div>
          ),
        };

      case 'share-twitter':
        return {
          title: '🐦 Share on Twitter',
          content: (
            <div className="space-y-4">
              <div className="p-3 border border-border rounded-lg">
                <p className="text-content-primary">
                  Check out this amazing video: {currentVideo.title}
                </p>
                <p className="text-primary mt-2">{window.location.href}</p>
                <p className="text-sm text-content-secondary mt-2">280 characters remaining</p>
              </div>
              <Button className="w-full">Tweet</Button>
            </div>
          ),
        };

      case 'share-whatsapp':
        return {
          title: '💬 Share on WhatsApp',
          content: (
            <div className="space-y-4">
              <p className="text-content-primary">Send this video to your WhatsApp contacts:</p>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium">{currentVideo.title}</p>
                <p className="text-sm text-green-600">{window.location.href}</p>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600">Open WhatsApp</Button>
            </div>
          ),
        };

      case 'share-email':
        return {
          title: '📧 Share via Email',
          content: (
            <div className="space-y-4">
              <input
                placeholder="Recipient email"
                className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
              />
              <input
                placeholder="Subject"
                value={`Check out: ${currentVideo.title}`}
                className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
              />
              <textarea
                placeholder="Message"
                className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                rows={4}
                value={`I thought you'd enjoy this video:\n\n${currentVideo.title}\nby ${currentVideo.channel}\n\n${window.location.href}`}
              />
              <Button className="w-full">Send Email</Button>
            </div>
          ),
        };

      case 'embed-code':
        return {
          title: '🔗 Embed Video',
          content: (
            <div className="space-y-4">
              <p className="text-content-primary">Copy this code to embed the video:</p>
              <div className="p-3 bg-surface-secondary rounded-lg font-mono text-sm">
                {`<iframe width="560" height="315" src="${currentVideo.videoUrl}" frameborder="0" allowfullscreen></iframe>`}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Copy Code
                </Button>
                <Button variant="outline" className="flex-1">
                  Preview
                </Button>
              </div>
            </div>
          ),
        };

      case 'bookmark-added':
        return {
          title: '🔖 Bookmarked',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">📌</div>
              <p className="text-content-primary font-medium">Video saved to bookmarks!</p>
              <p className="text-sm text-content-secondary mt-2">Find it in your saved videos</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => openModal('bookmarks-list')}
              >
                View All Bookmarks
              </Button>
            </div>
          ),
        };

      case 'bookmark-removed':
        return {
          title: '📤 Bookmark Removed',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🗑️</div>
              <p className="text-content-primary">Video removed from bookmarks</p>
              <Button variant="outline" className="mt-4">
                Undo
              </Button>
            </div>
          ),
        };

      case 'download-options':
        return {
          title: '⬇️ Download Video',
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <span className="text-2xl mb-2">🎬</span>
                  <span className="text-sm">MP4 (1080p)</span>
                  <span className="text-xs text-content-secondary">245 MB</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <span className="text-2xl mb-2">📱</span>
                  <span className="text-sm">MP4 (720p)</span>
                  <span className="text-xs text-content-secondary">128 MB</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <span className="text-2xl mb-2">🎵</span>
                  <span className="text-sm">Audio Only</span>
                  <span className="text-xs text-content-secondary">12 MB</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <span className="text-2xl mb-2">📄</span>
                  <span className="text-sm">Subtitles</span>
                  <span className="text-xs text-content-secondary">2 KB</span>
                </Button>
              </div>
              <p className="text-xs text-content-secondary text-center">
                Downloads are for personal use only
              </p>
            </div>
          ),
        };

      case 'more-options':
        return {
          title: '⚙️ More Options',
          content: (
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                🚫 Not Interested
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                📢 Report
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                📋 Add to Playlist
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                🔄 Loop Video
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                ⚡ Playback Speed
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                🎨 Video Effects
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                📊 Stats for Nerds
              </Button>
            </div>
          ),
        };

      case 'comment-added':
        return {
          title: '💬 Comment Posted',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-content-primary">Your comment has been posted!</p>
              <p className="text-sm text-content-secondary mt-2">
                Others can now see and reply to it
              </p>
            </div>
          ),
        };

      case 'reply-comment':
        return {
          title: '↩️ Reply to Comment',
          content: (
            <div className="space-y-4">
              {modalData && (
                <div className="p-3 bg-surface-secondary rounded-lg">
                  <p className="text-sm text-content-secondary">Replying to {modalData.user}:</p>
                  <p className="text-content-primary mt-1">
                    {modalData.content?.substring(0, 100)}...
                  </p>
                </div>
              )}
              <textarea
                placeholder="Write your reply..."
                className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                rows={3}
              />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1">Reply</Button>
              </div>
            </div>
          ),
        };

      case 'autoplay-toggled':
        return {
          title: '🔄 Autoplay Settings',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">{modalData?.enabled ? '▶️' : '⏸️'}</div>
              <p className="text-content-primary">
                Autoplay {modalData?.enabled ? 'enabled' : 'disabled'}
              </p>
              <p className="text-sm text-content-secondary mt-2">
                {modalData?.enabled
                  ? 'Videos will play automatically'
                  : 'Videos will wait for you to click play'}
              </p>
            </div>
          ),
        };

      case 'filter-videos':
        return {
          title: '🔍 Filter Results',
          content: (
            <div className="space-y-4">
              <p className="text-content-primary">
                Showing videos filtered by: <strong>{modalData?.filter}</strong>
              </p>
              <div className="space-y-2">
                {SIDEBAR_VIDEOS.filter(
                  v => modalData?.filter === 'All' || v.category === modalData?.filter
                )
                  .slice(0, 3)
                  .map(video => (
                    <div
                      key={video.id}
                      className="flex items-center gap-3 p-2 hover:bg-surface-secondary rounded"
                    >
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-12 h-8 object-cover rounded"
                        width={48}
                        height={32}
                      />
                      <div>
                        <p className="text-sm font-medium text-content-primary">{video.title}</p>
                        <p className="text-xs text-content-secondary">{video.channel}</p>
                      </div>
                    </div>
                  ))}
              </div>
              <Button variant="outline" className="w-full">
                View All Results
              </Button>
            </div>
          ),
        };

      case 'video-options':
        return {
          title: '📺 Video Options',
          content: (
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                ⏰ {modalData?.inWatchLater ? 'Remove from' : 'Add to'} Watch Later
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                📋 Add to Playlist
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                📤 Share
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                ⬇️ Download
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                🚫 Not Interested
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                📢 Report
              </Button>
            </div>
          ),
        };

      case 'trending-video':
        return {
          title: '🔥 Trending Video',
          content: (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-3">🔥</div>
                <p className="text-content-primary font-medium">{modalData?.title}</p>
                <p className="text-sm text-content-secondary mt-2">This video is trending now!</p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Watch Now</Button>
                <Button variant="outline" className="flex-1">
                  Add to Queue
                </Button>
              </div>
            </div>
          ),
        };

      case 'watch-later-added':
        return {
          title: '⏰ Added to Watch Later',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-content-primary">Video saved for later!</p>
              <p className="text-sm text-content-secondary mt-2">
                Find it in your Watch Later playlist
              </p>
              <Button variant="outline" className="mt-4" onClick={() => openModal('watch-later')}>
                View Playlist
              </Button>
            </div>
          ),
        };

      case 'watch-later-removed':
        return {
          title: '📤 Removed from Watch Later',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🗑️</div>
              <p className="text-content-primary">Video removed from Watch Later</p>
              <Button variant="outline" className="mt-4">
                Undo
              </Button>
            </div>
          ),
        };

      case 'search-results':
        return {
          title: '🔍 Search Results',
          content: (
            <div className="space-y-4">
              <p className="text-content-primary">
                Found {modalData?.results?.length || 0} results for &ldquo;{modalData?.query}&rdquo;
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {modalData?.results?.map((video: Video) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-3 p-2 hover:bg-surface-secondary rounded cursor-pointer"
                    onClick={() => {
                      handleVideoSelect(video);
                      closeModal();
                    }}
                  >
                    <div className="w-16 h-12 bg-surface-secondary rounded overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-primary to-secondary opacity-20"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-content-primary">{video.title}</p>
                      <p className="text-xs text-content-secondary">
                        {video.channel} • {video.views} views
                      </p>
                    </div>
                  </div>
                )) || <p className="text-content-secondary">No results found</p>}
              </div>
            </div>
          ),
        };

      case 'search-no-results':
        return {
          title: '🔍 No Results Found',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-content-primary">
                No videos found for &ldquo;{modalData?.query}&rdquo;
              </p>
              <p className="text-sm text-content-secondary mt-2">
                Try different keywords or browse trending videos
              </p>
              <Button className="mt-4" onClick={() => openModal('trending-videos')}>
                Browse Trending
              </Button>
            </div>
          ),
        };

      case 'watch-later':
        return {
          title: '⏰ Watch Later',
          content: (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-content-primary">
                  {modalData?.count || watchLaterCount} videos saved
                </p>
                <Button variant="outline" size="sm">
                  Clear All
                </Button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {modalData?.videos?.slice(0, 5).map((video: Video) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-3 p-2 hover:bg-surface-secondary rounded"
                  >
                    <div className="w-16 h-12 bg-surface-secondary rounded overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-primary to-secondary opacity-20"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-content-primary">{video.title}</p>
                      <p className="text-xs text-content-secondary">{video.channel}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => toggleWatchLater(video)}>
                      Remove
                    </Button>
                  </div>
                )) || (
                  <p className="text-content-secondary text-center py-4">
                    No videos in Watch Later
                  </p>
                )}
              </div>
            </div>
          ),
        };

      case 'liked-videos':
        return {
          title: '👍 Liked Videos',
          content: (
            <div className="space-y-4">
              <p className="text-content-primary">
                {modalData?.count || likedVideosCount} videos liked
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {modalData?.videos?.slice(0, 5).map((video: Video) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-3 p-2 hover:bg-surface-secondary rounded"
                  >
                    <div className="w-16 h-12 bg-surface-secondary rounded overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-red-400 to-pink-400 opacity-20"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-content-primary">{video.title}</p>
                      <p className="text-xs text-content-secondary">{video.channel}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      ❤️
                    </Button>
                  </div>
                )) || (
                  <p className="text-content-secondary text-center py-4">No liked videos yet</p>
                )}
              </div>
            </div>
          ),
        };

      case 'trending-videos':
        return {
          title: '🔥 Trending Videos',
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {[
                  'AI Revolution 2024',
                  'Climate Change Solutions',
                  'Space Exploration Update',
                  'Quantum Computing Breakthrough',
                ].map((title, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 hover:bg-surface-secondary rounded cursor-pointer"
                  >
                    <span className="text-lg font-bold text-primary">#{index + 1}</span>
                    <div className="w-12 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded"></div>
                    <div>
                      <p className="text-sm font-medium text-content-primary">{title}</p>
                      <p className="text-xs text-content-secondary">
                        {Math.floor(Math.random() * 10) + 1}M views trending
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full">Explore All Trending</Button>
            </div>
          ),
        };

      case 'subscriptions':
        return {
          title: '📺 Subscriptions',
          content: (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-content-primary">
                  {modalData?.count || subscribedChannels.size} subscriptions
                </p>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
              <div className="space-y-3">
                {Array.from(subscribedChannels)
                  .slice(0, 5)
                  .map((channel, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 hover:bg-surface-secondary rounded"
                    >
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        {channel.substring(0, 1)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-content-primary">{channel}</p>
                        <p className="text-xs text-content-secondary">
                          {Math.floor(Math.random() * 100) + 10}K subscribers
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        🔔
                      </Button>
                    </div>
                  ))}
                {subscribedChannels.size === 0 && (
                  <p className="text-content-secondary text-center py-4">No subscriptions yet</p>
                )}
              </div>
            </div>
          ),
        };

      case 'your-channel':
        return {
          title: '🎬 Your Channel',
          content: (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                  👤
                </div>
                <p className="text-content-primary font-medium">Your Channel</p>
                <p className="text-sm text-content-secondary">0 videos • 0 subscribers</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <span className="text-2xl mb-2">📹</span>
                  <span className="text-sm">Upload Video</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <span className="text-2xl mb-2">🎛️</span>
                  <span className="text-sm">Studio</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <span className="text-2xl mb-2">📊</span>
                  <span className="text-sm">Analytics</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <span className="text-2xl mb-2">⚙️</span>
                  <span className="text-sm">Settings</span>
                </Button>
              </div>
            </div>
          ),
        };

      case 'video-info':
        return {
          title: 'ℹ️ Video Information',
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-content-secondary">Duration</p>
                  <p className="text-content-primary font-medium">{currentVideo.duration}</p>
                </div>
                <div>
                  <p className="text-content-secondary">Upload Date</p>
                  <p className="text-content-primary font-medium">{currentVideo.uploadTime}</p>
                </div>
                <div>
                  <p className="text-content-secondary">Views</p>
                  <p className="text-content-primary font-medium">{currentVideo.views}</p>
                </div>
                <div>
                  <p className="text-content-secondary">Category</p>
                  <p className="text-content-primary font-medium">{currentVideo.category}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-content-secondary text-sm mb-2">Video URL:</p>
                <div className="p-2 bg-surface-secondary rounded text-xs font-mono break-all">
                  {currentVideo.videoUrl}
                </div>
              </div>
            </div>
          ),
        };

      case 'tag-search':
        return {
          title: '🏷️ Tag Search',
          content: (
            <div className="space-y-4">
              <p className="text-content-primary">
                Videos tagged with: <strong>#{modalData?.tag}</strong>
              </p>
              <div className="space-y-2">
                {SIDEBAR_VIDEOS.slice(0, 3).map(video => (
                  <div
                    key={video.id}
                    className="flex items-center gap-3 p-2 hover:bg-surface-secondary rounded cursor-pointer"
                    onClick={() => {
                      handleVideoSelect(video);
                      closeModal();
                    }}
                  >
                    <div className="w-12 h-8 bg-surface-secondary rounded"></div>
                    <div>
                      <p className="text-sm font-medium text-content-primary">{video.title}</p>
                      <p className="text-xs text-content-secondary">{video.channel}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full">View All #{modalData?.tag} Videos</Button>
            </div>
          ),
        };

      case 'bookmarks-list':
        return {
          title: '🔖 Bookmarked Videos',
          content: (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-content-primary">5 bookmarked videos</p>
                <Button variant="outline" size="sm">
                  Clear All
                </Button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {SIDEBAR_VIDEOS.slice(0, 3).map(video => (
                  <div
                    key={video.id}
                    className="flex items-center gap-3 p-2 hover:bg-surface-secondary rounded"
                  >
                    <div className="w-16 h-12 bg-surface-secondary rounded overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-content-primary">{video.title}</p>
                      <p className="text-xs text-content-secondary">{video.channel}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      🔖
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ),
        };

      case 'subscribed':
        return {
          title: '🔔 Subscribed',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-content-primary font-medium">
                Subscribed to {modalData?.channel}!
              </p>
              <p className="text-sm text-content-secondary mt-2">
                You&apos;ll get notifications for new videos
              </p>
              <Button variant="outline" className="mt-4">
                Manage Subscriptions
              </Button>
            </div>
          ),
        };

      case 'unsubscribed':
        return {
          title: '🔕 Unsubscribed',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">👋</div>
              <p className="text-content-primary">Unsubscribed from {modalData?.channel}</p>
              <p className="text-sm text-content-secondary mt-2">
                You won&apos;t receive notifications anymore
              </p>
              <Button variant="outline" className="mt-4">
                Undo
              </Button>
            </div>
          ),
        };

      case 'advanced-settings':
        return {
          title: '🎛️ Advanced Settings',
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-content-secondary">Video Quality</label>
                  <p className="text-content-primary font-medium">{modalData?.quality}</p>
                </div>
                <div>
                  <label className="text-sm text-content-secondary">Volume</label>
                  <p className="text-content-primary font-medium">{modalData?.volume}%</p>
                </div>
                <div>
                  <label className="text-sm text-content-secondary">Playback Speed</label>
                  <p className="text-content-primary font-medium">{modalData?.playbackSpeed}x</p>
                </div>
                <div>
                  <label className="text-sm text-content-secondary">Captions</label>
                  <p className="text-content-primary font-medium">
                    {modalData?.captions ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-content-secondary">Theater Mode</label>
                  <p className="text-content-primary font-medium">
                    {modalData?.theaterMode ? 'On' : 'Off'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-content-secondary">Autoplay</label>
                  <p className="text-content-primary font-medium">
                    {modalData?.autoplay ? 'On' : 'Off'}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-content-primary mb-2">💾 Storage</h4>
                <div className="text-sm space-y-1">
                  <p className="text-content-secondary">
                    Watch History:{' '}
                    <span className="text-content-primary">
                      {modalData?.viewHistoryCount} videos
                    </span>
                  </p>
                  <p className="text-content-secondary">
                    Search History:{' '}
                    <span className="text-content-primary">
                      {modalData?.searchHistoryCount} searches
                    </span>
                  </p>
                  <p className="text-content-secondary">
                    Subscriptions:{' '}
                    <span className="text-content-primary">
                      {modalData?.subscriptionsCount} channels
                    </span>
                  </p>
                </div>
              </div>
              <Button className="w-full">Save Settings</Button>
            </div>
          ),
        };

      case 'confirm-clear-history':
        return {
          title: '🗑️ Clear History',
          content: (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-3">⚠️</div>
                <p className="text-content-primary font-medium">
                  Clear all watch and search history?
                </p>
                <p className="text-sm text-content-secondary mt-2">This action cannot be undone</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => {
                    setViewHistory([]);
                    setSearchHistory([]);
                    closeModal();
                    openModal('history-cleared');
                  }}
                >
                  Clear History
                </Button>
              </div>
            </div>
          ),
        };

      case 'history-cleared':
        return {
          title: '✅ History Cleared',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🧹</div>
              <p className="text-content-primary">History cleared successfully!</p>
              <p className="text-sm text-content-secondary mt-2">
                Your watch and search history has been removed
              </p>
            </div>
          ),
        };

      case 'data-exported':
        return {
          title: '📊 Data Exported',
          content: (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-3">📥</div>
                <p className="text-content-primary font-medium">Data exported to console!</p>
                <p className="text-sm text-content-secondary mt-2">
                  In a real app, this would download a JSON file
                </p>
              </div>
              <div className="p-3 bg-surface-secondary rounded-lg text-xs">
                <p className="text-content-secondary mb-2">Exported data includes:</p>
                <ul className="text-content-primary space-y-1">
                  <li>• {modalData?.userData?.subscriptions?.length || 0} subscriptions</li>
                  <li>• {modalData?.userData?.watchLater?.length || 0} watch later videos</li>
                  <li>• {modalData?.userData?.likedVideos?.length || 0} liked videos</li>
                  <li>• {modalData?.userData?.viewHistory?.length || 0} recent videos</li>
                  <li>• {modalData?.userData?.searchHistory?.length || 0} search queries</li>
                  <li>• User preferences & settings</li>
                </ul>
              </div>
              <Button className="w-full">Download JSON File</Button>
            </div>
          ),
        };

      case 'search-history':
        return {
          title: '🔍 Recent Searches',
          content: (
            <div className="space-y-4">
              <p className="text-content-primary">Your recent searches:</p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {modalData?.history?.slice(0, 10).map((search: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-surface-secondary rounded"
                  >
                    <span
                      className="text-content-primary cursor-pointer"
                      onClick={() => {
                        setSearchQuery(search);
                        closeModal();
                        handleSearch();
                      }}
                    >
                      🔍 {search}
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Remove
                    </Button>
                  </div>
                )) || <p className="text-content-secondary text-center py-4">No recent searches</p>}
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchHistory([]);
                  closeModal();
                }}
              >
                Clear Search History
              </Button>
            </div>
          ),
        };

      case 'notifications':
        return {
          title: '🔔 Notifications',
          content: (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-surface-secondary/30 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    🎬
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-content-primary">
                      New video from Blender Foundation
                    </p>
                    <p className="text-xs text-content-secondary">
                      &ldquo;Spring - Open Movie Project&rdquo; • 2 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-surface-secondary/30 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    👍
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-content-primary">
                      Someone liked your comment
                    </p>
                    <p className="text-xs text-content-secondary">
                      On &ldquo;Big Buck Bunny&rdquo; • 4 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-surface-secondary/30 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    📊
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-content-primary">Weekly report</p>
                    <p className="text-xs text-content-secondary">
                      12 new subscribers this week • 1 day ago
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Mark All Read
                </Button>
                <Button variant="outline" className="flex-1">
                  Settings
                </Button>
              </div>
            </div>
          ),
        };

      case 'account-menu':
        return {
          title: '👤 Account Menu',
          content: (
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => openModal('your-channel')}
              >
                📊 Your Channel
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => openModal('advanced-settings')}
              >
                ⚙️ Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  closeModal();
                  exportData();
                }}
              >
                📥 Export Data
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  closeModal();
                  clearHistory();
                }}
              >
                🗑️ Clear History
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setDarkMode(!darkMode);
                  closeModal();
                  openModal('theme-toggled', { darkMode: !darkMode });
                }}
              >
                {darkMode ? '☀️' : '🌙'} Toggle Theme
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                📱 Mobile App
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                💡 Send Feedback
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                ❓ Help & Support
              </Button>
              <div className="border-t border-border pt-2 mt-2">
                <Button variant="ghost" className="w-full justify-start text-red-500">
                  🚪 Sign Out
                </Button>
              </div>
            </div>
          ),
        };

      case 'theme-toggled':
        return {
          title: '🎨 Theme Changed',
          content: (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">{modalData?.darkMode ? '🌙' : '☀️'}</div>
              <p className="text-content-primary">
                Switched to {modalData?.darkMode ? 'Dark' : 'Light'} Mode
              </p>
              <p className="text-sm text-content-secondary mt-2">Your preference has been saved</p>
            </div>
          ),
        };

      default:
        return {
          title: '✨ Action Complete',
          content: (
            <div className="text-center py-4">
              <p className="text-content-primary">Action completed successfully!</p>
            </div>
          ),
        };
    }
  };

  const modalContent = renderModalContent();

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Modal */}
      <Modal isOpen={!!activeModal} onClose={closeModal} title={modalContent.title}>
        {modalContent.content}
      </Modal>

      {/* Header */}
      <header className=" top-0 z-[99999] bg-surface-primary border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">
                ▶
              </div>
              <span className="text-xl font-bold text-content-primary hidden sm:block">
                VideoTube
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSearch()}
                onFocus={() => {
                  if (searchHistory.length > 0) {
                    openModal('search-history', { history: searchHistory });
                  }
                }}
                className="w-full pl-4 pr-12 py-2 border border-border rounded-full bg-surface-primary text-content-primary placeholder:text-content-secondary focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearch}
                className="absolute right-0 top-0 h-full px-4 rounded-r-full"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleTabClick('Your Videos')}
              title="Your Videos"
            >
              <PlaySquare className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => {
                setNotifications(0);
                openModal('notifications');
              }}
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            <div className="relative group">
              <div
                className="w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => {
                  openModal('account-menu');
                }}
              >
                👤
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={openAdvancedSettings}
              title="Advanced Settings"
            >
              ⚙️
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside
          className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-64 border-r border-border p-4 space-y-2`}
        >
          {SIDEBAR_MENU.map(item => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.label;
            return (
              <Button
                key={item.label}
                variant={isActive ? 'secondary' : 'ghost'}
                className="w-full justify-start relative group"
                onClick={() => handleTabClick(item.label)}
              >
                <IconComponent className="mr-3 h-5 w-5" />
                {item.label}
                {item.label === 'Watch Later' && watchLaterCount > 0 && (
                  <span className="ml-auto text-xs bg-primary text-white px-2 py-1 rounded-full">
                    {watchLaterCount}
                  </span>
                )}
                {item.label === 'Liked Videos' && likedVideosCount > 0 && (
                  <span className="ml-auto text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    {likedVideosCount}
                  </span>
                )}
                {item.label === 'Subscriptions' && subscribedChannels.size > 0 && (
                  <span className="ml-auto text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                    {subscribedChannels.size}
                  </span>
                )}
              </Button>
            );
          })}

          {/* Quick Actions */}
          <div className="pt-4 border-t border-border mt-4">
            <h4 className="text-sm font-semibold text-content-secondary mb-2">Quick Actions</h4>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={clearHistory}
            >
              🗑️ Clear History
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={exportData}
            >
              📥 Export Data
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️' : '🌙'} Toggle Theme
            </Button>
          </div>

          {/* Stats */}
          {viewHistory.length > 0 && (
            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-content-secondary mb-2">Recent History</h4>
              {viewHistory.slice(0, 3).map(video => (
                <div
                  key={video.id}
                  className="text-xs text-content-secondary p-2 hover:bg-surface-secondary rounded cursor-pointer"
                  onClick={() => handleVideoSelect(video)}
                >
                  {video.title.substring(0, 30)}...
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Video Player and Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className={`aspect-video ${isTheaterMode ? 'fixed inset-0 z-50 bg-black' : ''}`}>
                <VideoPlayer
                  src={currentVideo.videoUrl}
                  title={currentVideo.title}
                  poster={currentVideo.thumbnail}
                  className="w-full h-full"
                />
                {isTheaterMode && (
                  <Button
                    variant="ghost"
                    className="absolute top-4 right-4 text-white"
                    onClick={() => setIsTheaterMode(false)}
                  >
                    ❌ Exit Theater Mode
                  </Button>
                )}
              </div>

              <VideoInfo
                video={currentVideo}
                onLike={() => toggleLikeVideo(currentVideo)}
                onSubscribe={() => toggleSubscribe(currentVideo.channel)}
                isLiked={likedVideos.has(currentVideo.id)}
                isSubscribed={subscribedChannels.has(currentVideo.channel)}
                onTheaterMode={() => setIsTheaterMode(true)}
                openModal={openModal}
              />
              <CommentSection comments={COMMENTS} openModal={openModal} />
            </div>

            {/* Enhanced Sidebar Videos */}
            <div className="lg:col-span-1">
              <VideoSidebar
                videos={SIDEBAR_VIDEOS}
                currentVideoId={currentVideo.id}
                onVideoSelect={handleVideoSelect}
                onWatchLater={toggleWatchLater}
                watchLaterVideos={watchLaterVideos}
                openModal={openModal}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
