"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WebsiteIcon } from "./website-icon"
import { Sparkles, Zap, Star } from "lucide-react"

interface IconPreviewProps {
  website: string
  title: string
  category: string
}

function IconPreview({ website, title, category }: IconPreviewProps) {
  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-white">
      <WebsiteIcon website={website} title={title} category={category} className="h-14 w-14" />
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{website}</p>
        <Badge variant="secondary" className="text-xs mt-1">
          {category}
        </Badge>
      </div>
    </div>
  )
}

export function IconManager() {
  const [testWebsite, setTestWebsite] = useState("netflix.com")
  const [testTitle, setTestTitle] = useState("Netflix")
  const [testCategory, setTestCategory] = useState("entertainment")

  const featuredSites = [
    { website: "gmail.com", title: "Gmail", category: "personal" },
    { website: "netflix.com", title: "Netflix", category: "entertainment" },
    { website: "instagram.com", title: "Instagram", category: "social" },
    { website: "github.com", title: "GitHub", category: "work" },
    { website: "spotify.com", title: "Spotify", category: "entertainment" },
    { website: "figma.com", title: "Figma", category: "work" },
    { website: "notion.so", title: "Notion", category: "work" },
    { website: "discord.com", title: "Discord", category: "social" },
  ]

  const popularByCategory = {
    social: [
      { website: "facebook.com", title: "Facebook", category: "social" },
      { website: "instagram.com", title: "Instagram", category: "social" },
      { website: "twitter.com", title: "Twitter", category: "social" },
      { website: "x.com", title: "X", category: "social" },
      { website: "linkedin.com", title: "LinkedIn", category: "social" },
      { website: "tiktok.com", title: "TikTok", category: "social" },
      { website: "snapchat.com", title: "Snapchat", category: "social" },
      { website: "discord.com", title: "Discord", category: "social" },
    ],
    entertainment: [
      { website: "netflix.com", title: "Netflix", category: "entertainment" },
      { website: "youtube.com", title: "YouTube", category: "entertainment" },
      { website: "spotify.com", title: "Spotify", category: "entertainment" },
      { website: "twitch.tv", title: "Twitch", category: "entertainment" },
      { website: "hulu.com", title: "Hulu", category: "entertainment" },
      { website: "disneyplus.com", title: "Disney+", category: "entertainment" },
      { website: "primevideo.com", title: "Prime Video", category: "entertainment" },
      { website: "hbomax.com", title: "HBO Max", category: "entertainment" },
    ],
    work: [
      { website: "github.com", title: "GitHub", category: "work" },
      { website: "figma.com", title: "Figma", category: "work" },
      { website: "notion.so", title: "Notion", category: "work" },
      { website: "slack.com", title: "Slack", category: "work" },
      { website: "trello.com", title: "Trello", category: "work" },
      { website: "asana.com", title: "Asana", category: "work" },
      { website: "zoom.us", title: "Zoom", category: "work" },
      { website: "teams.microsoft.com", title: "Microsoft Teams", category: "work" },
    ],
    shopping: [
      { website: "amazon.com", title: "Amazon", category: "shopping" },
      { website: "ebay.com", title: "eBay", category: "shopping" },
      { website: "etsy.com", title: "Etsy", category: "shopping" },
      { website: "walmart.com", title: "Walmart", category: "shopping" },
      { website: "target.com", title: "Target", category: "shopping" },
      { website: "bestbuy.com", title: "Best Buy", category: "shopping" },
      { website: "shopify.com", title: "Shopify", category: "shopping" },
      { website: "aliexpress.com", title: "AliExpress", category: "shopping" },
    ],
    banking: [
      { website: "paypal.com", title: "PayPal", category: "banking" },
      { website: "stripe.com", title: "Stripe", category: "banking" },
      { website: "venmo.com", title: "Venmo", category: "banking" },
      { website: "cashapp.com", title: "Cash App", category: "banking" },
      { website: "robinhood.com", title: "Robinhood", category: "banking" },
      { website: "coinbase.com", title: "Coinbase", category: "banking" },
      { website: "chase.com", title: "Chase", category: "banking" },
      { website: "bankofamerica.com", title: "Bank of America", category: "banking" },
    ],
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100"
        >
          <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
          Modern Icons
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Modern Website Icon System
          </DialogTitle>
          <DialogDescription>
            Experience the latest icon designs with brand-accurate colors and modern styling
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="featured" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Featured
            </TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="test">Test Custom</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Featured Modern Icons
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Showcase of the most popular websites with updated modern icons and authentic brand colors
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredSites.map((site, index) => (
                    <IconPreview key={index} website={site.website} title={site.title} category={site.category} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            {Object.entries(popularByCategory).map(([categoryName, sites]) => (
              <Card key={categoryName}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize">{categoryName} Platforms</CardTitle>
                  <p className="text-sm text-gray-600">Popular {categoryName} websites with modern icon designs</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sites.map((site, index) => (
                      <IconPreview key={index} website={site.website} title={site.title} category={site.category} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="test" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Test Custom Website Icons</CardTitle>
                <p className="text-sm text-gray-600">Preview how any website will appear with our modern icon system</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="test-website">Website URL</Label>
                    <Input
                      id="test-website"
                      value={testWebsite}
                      onChange={(e) => setTestWebsite(e.target.value)}
                      placeholder="example.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="test-title">Title</Label>
                    <Input
                      id="test-title"
                      value={testTitle}
                      onChange={(e) => setTestTitle(e.target.value)}
                      placeholder="Website Name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="test-category">Category</Label>
                    <select
                      id="test-category"
                      value={testCategory}
                      onChange={(e) => setTestCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    >
                      <option value="personal">Personal</option>
                      <option value="work">Work</option>
                      <option value="social">Social</option>
                      <option value="banking">Banking</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="shopping">Shopping</option>
                      <option value="education">Education</option>
                      <option value="health">Health</option>
                      <option value="travel">Travel</option>
                      <option value="food">Food</option>
                      <option value="gaming">Gaming</option>
                      <option value="wifi">WiFi</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Label className="text-base font-semibold">Live Preview:</Label>
                  <div className="mt-3">
                    <IconPreview website={testWebsite} title={testTitle} category={testCategory} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Modern Design System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Brand-Accurate Colors</p>
                      <p className="text-sm text-gray-600">
                        Updated with current brand guidelines and authentic color schemes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Modern Icon Library</p>
                      <p className="text-sm text-gray-600">200+ popular websites with contemporary icon designs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Enhanced Visual Hierarchy</p>
                      <p className="text-sm text-gray-600">Rounded corners, shadows, and gradients for modern appeal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    Smart Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Intelligent Matching</p>
                      <p className="text-sm text-gray-600">
                        Matches websites by domain, subdomain, and title recognition
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      5
                    </div>
                    <div>
                      <p className="font-medium">High-Quality Favicons</p>
                      <p className="text-sm text-gray-600">
                        128px resolution favicons for crisp display on all devices
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      6
                    </div>
                    <div>
                      <p className="font-medium">Gradient Fallbacks</p>
                      <p className="text-sm text-gray-600">
                        Beautiful gradient category icons when specific icons aren't available
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recently Added Platforms</CardTitle>
                <p className="text-sm text-gray-600">Latest additions to our modern icon library</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { website: "threads.net", title: "Threads", category: "social" },
                    { website: "obsidian.md", title: "Obsidian", category: "work" },
                    { website: "vercel.com", title: "Vercel", category: "work" },
                    { website: "tidal.com", title: "Tidal", category: "entertainment" },
                    { website: "binance.com", title: "Binance", category: "banking" },
                    { website: "peloton.com", title: "Peloton", category: "health" },
                    { website: "doordash.com", title: "DoorDash", category: "food" },
                    { website: "duolingo.com", title: "Duolingo", category: "education" },
                  ].map((site, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-2 p-3 border border-gray-200 rounded-lg"
                    >
                      <WebsiteIcon
                        website={site.website}
                        title={site.title}
                        category={site.category}
                        className="h-12 w-12"
                      />
                      <div className="text-center">
                        <p className="text-sm font-medium">{site.title}</p>
                        <Badge variant="secondary" className="text-xs">
                          {site.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
