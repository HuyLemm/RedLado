"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, TrendingUp, Users, Hash, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export default function CommunityPage() {
  const router = useRouter();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);

  const posts = [
    {
      id: 1,
      author: {
        name: "ProTrader_CS",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        time: "2 hours ago"
      },
      content: "Just completed my biggest trade yet! Managed to snag a Factory New Karambit Fade for an absolute steal. The key is patience and knowing market trends. Anyone else had success with high-tier knives recently?",
      image: "https://images.unsplash.com/photo-1758598497271-691207e1586d?w=800",
      likes: 342,
      comments: 89,
      shares: 12
    },
    {
      id: 2,
      author: {
        name: "SkinCollector",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
        time: "5 hours ago"
      },
      content: "New to trading? Here are my top 5 tips for beginners:\n\n1. Always check market trends before buying\n2. Use price tracking tools\n3. Don't rush into trades\n4. Verify seller reputation\n5. Start small and learn\n\nWhat would you add to this list? Drop your tips below!",
      likes: 521,
      comments: 156,
      shares: 43
    },
    {
      id: 3,
      author: {
        name: "ESportsGuru",
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100",
        time: "1 day ago"
      },
      content: "The CS2 Major is coming up! Time to stock up on team stickers and capsules. Historical data shows prices spike 2-3 weeks after the event. Who else is investing?",
      image: "https://images.unsplash.com/photo-1759701547467-a54a5e86a4f0?w=800",
      likes: 891,
      comments: 203,
      shares: 67
    },
  ];

  const trendingTopics = [
    { tag: "CS2Major", posts: "12.5K" },
    { tag: "KarambitFade", posts: "8.3K" },
    { tag: "TradingTips", posts: "15.7K" },
    { tag: "AWPDragonLore", posts: "6.2K" },
    { tag: "SkinInvesting", posts: "9.1K" }
  ];

  const quickActions = [
    { label: "Create Post", icon: MessageCircle, route: "/create-post" },
    { label: "Find Traders", icon: Users, route: "/find-trader" },
    { label: "Trade Events", icon: Calendar, route: "/trade-events" },
  ];

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleSave = (postId: number) => {
    setSavedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleFollow = (handle: string) => {
    setFollowedUsers(prev =>
      prev.includes(handle)
        ? prev.filter(h => h !== handle)
        : [...prev, handle]
    );
  };

  return (
    <div className="w-full min-h-screen bg-bg-base dark:bg-[#0B0F0F]">
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            { label: "Community" }
          ]} 
        />

        <PageHeader 
          title="Community Feed"
          description="Connect with traders, share tips, and stay updated on the latest trends"
        />

        {/* Two Column Layout - Center aligned */}
        <div className="flex gap-8 justify-center">
          {/* 
            MAIN FEED - Content width max 760px 
          */}
          <div className="max-w-[760px] flex-shrink-0">
            <StaggerContainer className="space-y-6">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <motion.article
                    className="bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-2xl overflow-hidden hover:border-[#E11D48] dark:hover:border-[#F43F5E] transition-all duration-200"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                  {/* Header: avatar 32, name, time, menu */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 rounded-full overflow-hidden bg-bg-elev-2 dark:bg-[#1a1d1f]">
                          <ImageWithFallback
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-full h-full object-cover"
                          />
                        </Avatar>
                        <div>
                          <h4 className="text-text-primary dark:text-[#E5E7EB] font-semibold text-sm">
                            {post.author.name}
                          </h4>
                          <p className="text-text-muted dark:text-[#8B93A7] text-xs">
                            {post.author.time}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-text-muted dark:text-[#8B93A7] hover:text-text-primary dark:hover:text-[#E5E7EB] hover:bg-bg-elev-2 dark:hover:bg-[#1a1d1f]"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Body text - clamp 5 lines + "Read more" */}
                    <p className="text-text-secondary dark:text-[#A7B0BF] whitespace-pre-line line-clamp-5 mb-4">
                      {post.content}
                    </p>
                    {post.content.length > 200 && (
                      <button className="text-[#E11D48] dark:text-[#F43F5E] text-sm font-medium hover:underline">
                        Read more
                      </button>
                    )}
                  </div>

                  {/* Image - 16:9 aspect ratio */}
                  {post.image && (
                    <div className="relative w-full aspect-video bg-bg-elev-2 dark:bg-[#1a1d1f]">
                      <ImageWithFallback
                        src={post.image}
                        alt="Post content"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Footer actions - Like/Comment/Share/Save */}
                  <div className="p-6 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        {/* Like */}
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-2 group"
                        >
                          <Heart
                            className={`w-5 h-5 transition-all ${
                              likedPosts.includes(post.id)
                                ? 'fill-[#E11D48] text-[#E11D48] dark:fill-[#F43F5E] dark:text-[#F43F5E]'
                                : 'text-text-muted dark:text-[#8B93A7] group-hover:text-[#E11D48] dark:group-hover:text-[#F43F5E]'
                            }`}
                          />
                          <span className="text-sm text-text-secondary dark:text-[#A7B0BF]">
                            {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                          </span>
                        </button>

                        {/* Comment */}
                        <button className="flex items-center gap-2 group">
                          <MessageCircle className="w-5 h-5 text-text-muted dark:text-[#8B93A7] group-hover:text-[#E11D48] dark:group-hover:text-[#F43F5E] transition-colors" />
                          <span className="text-sm text-text-secondary dark:text-[#A7B0BF]">
                            {post.comments}
                          </span>
                        </button>

                        {/* Share */}
                        <button className="flex items-center gap-2 group">
                          <Share2 className="w-5 h-5 text-text-muted dark:text-[#8B93A7] group-hover:text-[#E11D48] dark:group-hover:text-[#F43F5E] transition-colors" />
                          <span className="text-sm text-text-secondary dark:text-[#A7B0BF]">
                            {post.shares}
                          </span>
                        </button>
                      </div>

                      {/* Save */}
                      <button
                        onClick={() => toggleSave(post.id)}
                        className="group"
                      >
                        <Bookmark
                          className={`w-5 h-5 transition-all ${
                            savedPosts.includes(post.id)
                              ? 'fill-[#E11D48] text-[#E11D48] dark:fill-[#F43F5E] dark:text-[#F43F5E]'
                              : 'text-text-muted dark:text-[#8B93A7] group-hover:text-[#E11D48] dark:group-hover:text-[#F43F5E]'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* 
            RIGHT SIDEBAR - Sticky (Trending Topics, Quick Actions) 
          */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Quick Actions - full-width 48px buttons */}
              <div className="bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-2xl p-6">
                <h3 className="text-text-primary dark:text-[#E5E7EB] mb-4 text-base font-semibold">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      onClick={() => router.push(action.route)}
                      className="w-full h-12 justify-start gap-3 border-stroke-muted dark:border-[#1F2937] hover:border-[#E11D48] dark:hover:border-[#F43F5E] hover:bg-[#FFF1F2] dark:hover:bg-[#1F1315] text-text-primary dark:text-[#E5E7EB]"
                    >
                      <action.icon className="w-5 h-5" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="dark:bg-[#1F2937]" />

              {/* Trending Topics - hashtags open filtered feed */}
              <div className="bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#E11D48] dark:text-[#F43F5E]" />
                  <h3 className="text-text-primary dark:text-[#E5E7EB] text-base font-semibold">
                    Trending Topics
                  </h3>
                </div>
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <button
                      key={topic.tag}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-bg-elev-2 dark:hover:bg-[#1a1d1f] transition-colors text-left group"
                    >
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-text-muted dark:text-[#8B93A7] group-hover:text-[#E11D48] dark:group-hover:text-[#F43F5E]" />
                        <span className="text-text-primary dark:text-[#E5E7EB] group-hover:text-[#E11D48] dark:group-hover:text-[#F43F5E] font-medium">
                          {topic.tag}
                        </span>
                      </div>
                      {/* Badge with red theme */}
                      <Badge
                        variant="secondary"
                        className="bg-[#FFF1F2] dark:bg-[#1F1315] text-[#E11D48] dark:text-[#F43F5E] border-0 text-xs"
                      >
                        {topic.posts}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggested Users */}
              <div className="bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-2xl p-6">
                <h3 className="text-text-primary dark:text-[#E5E7EB] mb-4 text-base font-semibold">
                  Who to Follow
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "TradeExpert", handle: "@tradeexpert" },
                    { name: "SkinGuru", handle: "@skinguru" },
                    { name: "CS2Master", handle: "@cs2master" }
                  ].map((user) => {
                    const isFollowed = followedUsers.includes(user.handle);
                    return (
                      <div key={user.handle} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E11D48] to-[#BE123C] dark:from-[#F43F5E] dark:to-[#E11D48]" />
                          <div>
                            <p className="text-sm text-text-primary dark:text-[#E5E7EB] font-medium">{user.name}</p>
                            <p className="text-xs text-text-muted dark:text-[#8B93A7]">{user.handle}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={isFollowed ? "default" : "outline"}
                          onClick={() => toggleFollow(user.handle)}
                          className={`h-8 ${
                            isFollowed
                              ? "bg-[#E11D48] dark:bg-[#F43F5E] text-white hover:bg-[#BE123C] dark:hover:bg-[#E11D48] border-0"
                              : "border-[#E11D48] dark:border-[#F43F5E] text-[#E11D48] dark:text-[#F43F5E] hover:bg-[#FFF1F2] dark:hover:bg-[#1F1315]"
                          }`}
                        >
                          {isFollowed ? "Followed" : "Follow"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
