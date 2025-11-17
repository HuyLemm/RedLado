"use client";

import { useState } from "react";
import { Bold, Italic, List, Image as ImageIcon, BarChart3, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [selectedGame, setSelectedGame] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const games = ['CS2', 'Valorant', 'Dota 2', 'TF2', 'Rust'];

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim()) && tags.length < 5) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handlePost = () => {
    if (content.length < 10) {
      toast.error('Post must be at least 10 characters long');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success('Post published successfully!');
      router.push('/community');
    }, 1500);
  };

  const handlePreview = () => {
    toast.info('Preview feature coming soon');
  };

  return (
    <div className="min-h-screen bg-bg-base dark:bg-[#0B0F0F] py-8">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-text-primary dark:text-[#E5E7EB] mb-2">Create Post</h1>
              <p className="text-text-secondary dark:text-[#A7B0BF]">Share your trade tips or market insights with the community</p>
            </div>

            <Card className="border-stroke-muted dark:border-[#1F2937] rounded-2xl mb-6 bg-bg-elev-1 dark:bg-[#111316]">
              <CardContent className="p-6 space-y-6">
                {/* Title Input (Optional) */}
                <div>
                  <Label htmlFor="title" className="text-text-primary dark:text-[#E5E7EB] font-semibold mb-2 block">
                    Title <span className="text-text-muted dark:text-[#8B93A7] font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your post a catchy title..."
                    className="border-stroke-muted dark:border-[#1F2937] rounded-xl h-12 bg-bg-elev-2 dark:bg-[#1a1d1f]"
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <Label htmlFor="content" className="text-text-primary dark:text-[#E5E7EB] font-semibold mb-2 block">
                    Content
                  </Label>
                  
                  {/* Simple Toolbar */}
                  <div className="flex items-center gap-2 mb-2 p-2 bg-bg-subtle dark:bg-[#1a1d1f] border border-stroke-muted dark:border-[#1F2937] rounded-xl">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-lg hover:bg-bg-elev-1 dark:hover:bg-[#111316]"
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-lg hover:bg-bg-elev-1 dark:hover:bg-[#111316]"
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-lg hover:bg-bg-elev-1 dark:hover:bg-[#111316]"
                      title="List"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <div className="h-6 w-px bg-stroke-muted dark:bg-[#1F2937] mx-1" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-lg hover:bg-bg-elev-1 dark:hover:bg-[#111316] text-sm"
                      title="Add Image"
                    >
                      <ImageIcon className="w-4 h-4 mr-1" />
                      Image
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-lg hover:bg-bg-elev-1 dark:hover:bg-[#111316] text-sm"
                      title="Add Poll"
                    >
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Poll
                    </Button>
                  </div>

                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your trade tips or market insights..."
                    className="border-stroke-muted dark:border-[#1F2937] rounded-xl min-h-[240px] resize-y bg-bg-elev-2 dark:bg-[#1a1d1f]"
                  />
                  <div className="text-sm text-text-muted dark:text-[#8B93A7] mt-2">
                    {content.length}/1000 characters {content.length < 10 && '• Minimum 10 characters'}
                  </div>
                </div>

                {/* Tags Input */}
                <div>
                  <Label htmlFor="tags" className="text-text-primary dark:text-[#E5E7EB] font-semibold mb-2 block">
                    Tags <span className="text-text-muted dark:text-[#8B93A7] font-normal">(Press Enter to add)</span>
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-[#E2233B]/10 dark:bg-[#F43F5E]/10 text-[#E2233B] dark:text-[#F43F5E] hover:bg-[#E2233B]/20 dark:hover:bg-[#F43F5E]/20 pl-3 pr-1 py-1 rounded-lg"
                      >
                        #{tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="w-5 h-5 ml-1 hover:bg-[#E2233B]/30 dark:hover:bg-[#F43F5E]/30 rounded"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tags (max 5)..."
                    className="border-stroke-muted dark:border-[#1F2937] rounded-xl h-12 bg-bg-elev-2 dark:bg-[#1a1d1f]"
                    disabled={tags.length >= 5}
                  />
                </div>

                {/* Game Selection */}
                <div>
                  <Label htmlFor="game" className="text-text-primary dark:text-[#E5E7EB] font-semibold mb-2 block">
                    Select Game
                  </Label>
                  <Select value={selectedGame} onValueChange={setSelectedGame}>
                    <SelectTrigger className="border-stroke-muted dark:border-[#1F2937] rounded-xl h-12 bg-bg-elev-2 dark:bg-[#1a1d1f]">
                      <SelectValue placeholder="Choose a game..." />
                    </SelectTrigger>
                    <SelectContent>
                      {games.map((game) => (
                        <SelectItem key={game} value={game.toLowerCase()}>
                          {game}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Visibility */}
                <div>
                  <Label className="text-text-primary dark:text-[#E5E7EB] font-semibold mb-2 block">Visibility</Label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: 'public', label: 'Public', desc: 'Anyone can see' },
                      { value: 'followers', label: 'Followers', desc: 'Only followers' },
                      { value: 'private', label: 'Private', desc: 'Only you' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setVisibility(option.value)}
                        className={`
                          flex-1 min-w-[140px] p-4 rounded-xl border-2 transition-all text-left
                          ${visibility === option.value
                            ? 'border-[#E2233B] dark:border-[#F43F5E] bg-[#E2233B]/5 dark:bg-[#F43F5E]/5'
                            : 'border-stroke-muted dark:border-[#1F2937] hover:border-stroke-strong dark:hover:border-[#2A3038] bg-bg-subtle dark:bg-[#1a1d1f]'
                          }
                        `}
                      >
                        <div className="font-semibold text-text-primary dark:text-[#E5E7EB] mb-1">{option.label}</div>
                        <div className="text-sm text-text-muted dark:text-[#8B93A7]">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handlePost}
                disabled={isUploading || content.length < 10}
                className="bg-[#E2233B] hover:bg-[#BE1E31] dark:bg-[#F43F5E] dark:hover:bg-[#E2233B] text-white rounded-xl h-12 px-8"
              >
                {isUploading ? 'Publishing...' : 'Post'}
              </Button>
              <Button
                onClick={handlePreview}
                variant="outline"
                className="border-stroke-muted dark:border-[#1F2937] hover:bg-bg-elev-1 dark:hover:bg-[#111316] rounded-xl h-12 px-8"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                onClick={() => router.push('/community')}
                variant="ghost"
                className="rounded-xl h-12 px-8"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Sidebar - Guidelines */}
          <div className="lg:col-span-1">
            <Card className="border-stroke-muted dark:border-[#1F2937] rounded-2xl sticky top-8 bg-bg-elev-1 dark:bg-[#111316]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-primary dark:text-[#E5E7EB] mb-4">Posting Guidelines</h3>
                <ul className="space-y-3 text-sm text-text-secondary dark:text-[#A7B0BF]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E2233B] dark:text-[#F43F5E] mt-1">•</span>
                    <span>Be respectful and constructive in your posts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E2233B] dark:text-[#F43F5E] mt-1">•</span>
                    <span>Include relevant tags to help others find your content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E2233B] dark:text-[#F43F5E] mt-1">•</span>
                    <span>Add images or videos to make your post more engaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E2233B] dark:text-[#F43F5E] mt-1">•</span>
                    <span>Check for spelling and grammar before posting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E2233B] dark:text-[#F43F5E] mt-1">•</span>
                    <span>Avoid spam, scams, or misleading information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E2233B] dark:text-[#F43F5E] mt-1">•</span>
                    <span>Give credit when sharing others' content</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-bg-subtle dark:bg-[#1a1d1f] rounded-xl border border-stroke-muted dark:border-[#1F2937]">
                  <h4 className="font-semibold text-text-primary dark:text-[#E5E7EB] mb-2">Pro Tip</h4>
                  <p className="text-sm text-text-secondary dark:text-[#A7B0BF]">
                    Posts with images get 3x more engagement. Add a screenshot or media to boost visibility!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

