"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, X, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { PageContainer } from "@/components/layout/PageContainer";
import { toast } from "sonner";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, updateProfile } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "Professional CS2 trader with 3+ years experience. Specialized in rare skins and high-tier items. Always fair prices and fast delivery.",
    location: "New York, USA",
    favoriteGenres: "FPS, Strategy",
    steamProfile: "",
    discordTag: ""
  });

  // Sync formData with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || prev.bio,
        location: user.location || prev.location,
        favoriteGenres: user.favoriteGenres || prev.favoriteGenres,
        steamProfile: user.steamProfile || user.username || "",
        discordTag: user.discordTag || ""
      }));
    }
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = Object.entries(formData).reduce((acc, [key, value]) => {
        const trimmed = value.trim();
        if (trimmed.length > 0) {
          acc[key as keyof typeof formData] = trimmed;
        }
        return acc;
      }, {} as typeof formData);

      if (Object.keys(payload).length === 0) {
        toast.error("Please fill in at least one field");
        setIsSaving(false);
        return;
      }

      await updateProfile(payload as Parameters<typeof updateProfile>[0]);
      toast.success("Profile updated successfully");
      router.push("/profile");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update profile";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-bg-base dark:bg-[#0B0F0F]">
      <PageContainer maxWidth="2xl" className="py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-text-primary dark:text-[#E5E7EB] text-2xl font-bold">Edit Profile</h1>
            <p className="text-text-secondary dark:text-[#A7B0BF]">Update your personal information and preferences</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push("/profile")}
            className="border-stroke-muted dark:border-[#1F2937] text-text-secondary dark:text-[#A7B0BF] hover:bg-bg-subtle dark:hover:bg-[#1a1d1f]"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <Card className="bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937]">
              <CardHeader>
                <CardTitle className="text-text-primary dark:text-[#E5E7EB]">Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"} />
                      <AvatarFallback className="text-2xl bg-[#E11D48] dark:bg-[#F43F5E] text-white">
                        {user?.username?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <button 
                      onClick={handleImageUpload}
                      disabled={isUploading}
                      className="absolute bottom-0 right-0 bg-[#E11D48] dark:bg-[#F43F5E] hover:bg-[#BE123C] dark:hover:bg-[#E11D48] text-white p-2 rounded-full shadow-lg transition-colors disabled:opacity-50"
                    >
                      {isUploading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-stroke-muted dark:border-[#1F2937] text-text-secondary dark:text-[#A7B0BF] hover:bg-bg-subtle dark:hover:bg-[#1a1d1f]"
                    onClick={handleImageUpload}
                    disabled={isUploading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Picture
                  </Button>
                  <p className="text-text-muted dark:text-[#8B93A7] text-sm text-center">
                    Recommended: 400x400px, max 2MB
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="pt-6 border-t border-stroke-muted dark:border-[#1F2937]">
                  <h4 className="text-text-primary dark:text-[#E5E7EB] font-medium mb-4">Profile Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary dark:text-[#A7B0BF]">Total Trades</span>
                      <span className="text-text-primary dark:text-[#E5E7EB] font-medium">1,270</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary dark:text-[#A7B0BF]">Rating</span>
                      <span className="text-[#E11D48] dark:text-[#F43F5E] font-medium">4.9 ⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary dark:text-[#A7B0BF]">Member Since</span>
                      <span className="text-text-primary dark:text-[#E5E7EB] font-medium">Jan 2020</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form Fields */}
          <div className="lg:col-span-2">
            <Card className="bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937]">
              <CardHeader>
                <CardTitle className="text-text-primary dark:text-[#E5E7EB]">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-text-primary dark:text-[#E5E7EB]">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937] focus:border-[#E11D48] dark:focus:border-[#F43F5E]"
                    />
                    <p className="text-text-muted dark:text-[#8B93A7] text-sm">This is your public display name</p>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-text-primary dark:text-[#E5E7EB]">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937] focus:border-[#E11D48] dark:focus:border-[#F43F5E]"
                    />
                    <p className="text-text-muted dark:text-[#8B93A7] text-sm">Used for notifications and security</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-text-primary dark:text-[#E5E7EB]">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="min-h-[100px] bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937] focus:border-[#E11D48] dark:focus:border-[#F43F5E] resize-none"
                    placeholder="Tell others about yourself..."
                  />
                  <p className="text-text-muted dark:text-[#8B93A7] text-sm">Brief description for your profile</p>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-text-primary dark:text-[#E5E7EB]">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937] focus:border-[#E11D48] dark:focus:border-[#F43F5E]"
                    placeholder="City, Country"
                  />
                </div>

                {/* Gaming Info */}
                <div className="pt-6 border-t border-stroke-muted dark:border-[#1F2937]">
                  <h4 className="text-text-primary dark:text-[#E5E7EB] font-medium mb-4">Gaming Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Favorite Genres */}
                    <div className="space-y-2">
                      <Label htmlFor="favoriteGenres" className="text-text-primary dark:text-[#E5E7EB]">Favorite Genres</Label>
                      <Input
                        id="favoriteGenres"
                        value={formData.favoriteGenres}
                        onChange={(e) => handleInputChange('favoriteGenres', e.target.value)}
                        className="bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937] focus:border-[#E11D48] dark:focus:border-[#F43F5E]"
                        placeholder="FPS, RPG, Strategy"
                      />
                      <p className="text-text-muted dark:text-[#8B93A7] text-sm">Separate with commas</p>
                    </div>

                    {/* Steam Profile */}
                    <div className="space-y-2">
                      <Label htmlFor="steamProfile" className="text-text-primary dark:text-[#E5E7EB]">Steam Profile</Label>
                      <Input
                        id="steamProfile"
                        value={formData.steamProfile}
                        onChange={(e) => handleInputChange('steamProfile', e.target.value)}
                        className="bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937] focus:border-[#E11D48] dark:focus:border-[#F43F5E]"
                        placeholder="your_steam_username"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="discordTag" className="text-text-primary dark:text-[#E5E7EB]">Discord Tag</Label>
                      <Input
                        id="discordTag"
                        value={formData.discordTag}
                        onChange={(e) => handleInputChange('discordTag', e.target.value)}
                        className="bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937] focus:border-[#E11D48] dark:focus:border-[#F43F5E]"
                        placeholder="Username#1234"
                      />
                      <p className="text-text-muted dark:text-[#8B93A7] text-sm">For trading communications</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fixed Bottom Toolbar */}
        <div className="fixed bottom-0 left-0 right-0 bg-bg-base/95 dark:bg-[#0B0F0F]/95 backdrop-blur-sm border-t border-stroke-muted dark:border-[#1F2937] p-4 z-50">
          <div className="max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
            <p className="text-text-muted dark:text-[#8B93A7] text-sm">
              Changes will be saved to your profile
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => router.push("/profile")}
                className="border-stroke-muted dark:border-[#1F2937] text-text-secondary dark:text-[#A7B0BF] hover:bg-bg-subtle dark:hover:bg-[#1a1d1f]"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#E11D48] dark:bg-[#F43F5E] hover:bg-[#BE123C] dark:hover:bg-[#E11D48] text-white font-medium disabled:opacity-60"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom padding to account for fixed toolbar */}
        <div className="h-20" />
      </PageContainer>
    </div>
  );
}

