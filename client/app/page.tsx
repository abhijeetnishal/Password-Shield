"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Lock,
  Key,
  Search,
  Zap,
  Users,
  Palette,
  Globe,
  CheckCircle,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { WebsiteIcon } from "@/components/website-icon";
import { useFetch } from "@/hooks/useFetch";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";
import { AuthService } from "@/services/AuthService";

export default function HomePage() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const setAuthToken = useAuthStore((state) => state.setAuthToken);

  const [
    {
      data: signupData,
      isLoading: isSignupDataLoading,
      isError: isSignupDataError,
      error: errorSignupData,
    },
    getSignupApi,
  ] = useFetch(null);
  const [
    {
      data: loginData,
      isLoading: isLoginDataLoading,
      isError: isLoginDataError,
    },
    getLoginApi,
  ] = useFetch(null);

  useEffect(
    function getSignupDetails() {
      if (signupData && signupData.code) {
        const { code, data, message } = signupData;

        if (code === 201) {
          const { token } = data;

          setCookie("token", token);
          setAuthToken(token);

          router.push("/dashboard");
        } else {
          setError(message);
        }
      } else if (isSignupDataError) {
        setError("Something went wrong!");
      }
    },
    [signupData, isSignupDataError]
  );

  useEffect(
    function getLoginDetails() {
      if (loginData && loginData.code) {
        const { code, data, message } = loginData;

        if (code === 200) {
          const { token } = data;

          setCookie("token", token);
          setAuthToken(token);

          router.push("/dashboard");
        } else {
          setError(message);
        }
      }
    },
    [loginData, isLoginDataError]
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getLoginApi(() => () => AuthService.login(loginForm));
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getSignupApi(() => () => AuthService.signup(loginForm));
  };

  // Featured websites for demonstration
  const featuredWebsites = [
    { website: "gmail.com", title: "Gmail", category: "personal" },
    { website: "netflix.com", title: "Netflix", category: "entertainment" },
    { website: "github.com", title: "GitHub", category: "work" },
    { website: "instagram.com", title: "Instagram", category: "social" },
    { website: "spotify.com", title: "Spotify", category: "entertainment" },
    { website: "figma.com", title: "Figma", category: "work" },
    { website: "paypal.com", title: "PayPal", category: "banking" },
    { website: "discord.com", title: "Discord", category: "social" },
  ];

  const securityFeatures = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description:
        "Your passwords are encrypted on the server with industry-standard AES encryption",
    },
    {
      icon: Key,
      title: "Smart Password Generator",
      description:
        "Create unique, strong passwords with customizable complexity settings",
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description:
        "Find any password instantly with smart search and filtering",
    },
    {
      icon: Palette,
      title: "Modern Visual Design",
      description:
        "Beautiful, brand-accurate icons for 200+ popular websites and services",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SecureVault
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  Secure Cloud Password Management
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Secure Password Management
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Made Beautiful
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Protect your digital life with enterprise-grade encryption,
                intuitive design, and stunning visual recognition for all your
                favorite websites and applications.
              </p>
            </div>

            {/* Visual Features Preview */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-gray-900">
                  Instantly Recognize Your Accounts
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                {featuredWebsites.map((site, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2"
                  >
                    <WebsiteIcon
                      website={site.website}
                      title={site.title}
                      category={site.category}
                      className="h-12 w-12"
                    />
                    <span className="text-xs font-medium text-gray-600 text-center">
                      {site.title}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 text-center">
                200+ popular websites with brand-accurate icons and modern
                design
              </p>
            </div>

            {/* Security Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  Enterprise Security
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  Cloud Synchronized
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Auth Forms */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-2 text-center pb-6">
                <div className="mx-auto p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl w-fit">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">
                  Welcome to SecureVault
                </CardTitle>
                <CardDescription>
                  Secure your digital life with enterprise-grade password
                  management
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="login" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                    <TabsTrigger
                      value="login"
                      className="data-[state=active]:bg-white"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="data-[state=active]:bg-white"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  {/* Error/Success Messages */}
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                          className="h-11"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          required
                          className="h-11"
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={isLoginDataLoading}
                      >
                        {isLoginDataLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Sign In</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          required
                          className="h-11"
                          value={signupForm.name}
                          onChange={(e) =>
                            setSignupForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          required
                          className="h-11"
                          value={signupForm.email}
                          onChange={(e) =>
                            setSignupForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a strong password (min 8 characters)"
                          required
                          className="h-11"
                          value={signupForm.password}
                          onChange={(e) =>
                            setSignupForm((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          required
                          className="h-11"
                          value={signupForm.confirmPassword}
                          onChange={(e) =>
                            setSignupForm((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={isSignupDataLoading}
                      >
                        {isSignupDataLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Create Account</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      Enterprise Security
                    </span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Your passwords are encrypted with AES-256 encryption and
                    stored securely in the cloud.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="mt-24 space-y-16">
          {/* Modern Icon System Showcase */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
              >
                <Palette className="h-3 w-3 mr-1" />
                Visual Recognition System
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Instantly Recognize Your Accounts
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our modern icon system displays brand-accurate icons for 200+
                popular websites, making it easier than ever to find and manage
                your passwords.
              </p>
            </div>

            {/* Icon Categories Showcase */}
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="space-y-4">
                  <div className="p-3 bg-blue-600 rounded-xl w-fit mx-auto">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Social & Communication
                  </h3>
                  <div className="flex justify-center space-x-2">
                    {[
                      {
                        website: "instagram.com",
                        title: "Instagram",
                        category: "social",
                      },
                      {
                        website: "discord.com",
                        title: "Discord",
                        category: "social",
                      },
                      { website: "x.com", title: "X", category: "social" },
                    ].map((site, index) => (
                      <WebsiteIcon
                        key={index}
                        website={site.website}
                        title={site.title}
                        category={site.category}
                        className="h-10 w-10"
                      />
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="space-y-4">
                  <div className="p-3 bg-purple-600 rounded-xl w-fit mx-auto">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Entertainment & Media
                  </h3>
                  <div className="flex justify-center space-x-2">
                    {[
                      {
                        website: "netflix.com",
                        title: "Netflix",
                        category: "entertainment",
                      },
                      {
                        website: "spotify.com",
                        title: "Spotify",
                        category: "entertainment",
                      },
                      {
                        website: "youtube.com",
                        title: "YouTube",
                        category: "entertainment",
                      },
                    ].map((site, index) => (
                      <WebsiteIcon
                        key={index}
                        website={site.website}
                        title={site.title}
                        category={site.category}
                        className="h-10 w-10"
                      />
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 bg-gradient-to-br from-green-50 to-green-100">
                <div className="space-y-4">
                  <div className="p-3 bg-green-600 rounded-xl w-fit mx-auto">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Work & Productivity
                  </h3>
                  <div className="flex justify-center space-x-2">
                    {[
                      {
                        website: "github.com",
                        title: "GitHub",
                        category: "work",
                      },
                      {
                        website: "figma.com",
                        title: "Figma",
                        category: "work",
                      },
                      {
                        website: "notion.so",
                        title: "Notion",
                        category: "work",
                      },
                    ].map((site, index) => (
                      <WebsiteIcon
                        key={index}
                        website={site.website}
                        title={site.title}
                        category={site.category}
                        className="h-10 w-10"
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Security & Features */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Enterprise Security
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Enterprise-Grade Security Meets Beautiful Design
                </h2>
                <p className="text-xl text-gray-600">
                  Your passwords are protected with the same encryption
                  standards used by banks and governments, synchronized securely
                  across all your devices.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "AES-256 Encryption",
                    description:
                      "Your passwords are encrypted with military-grade AES-256 encryption on our secure servers.",
                  },
                  {
                    icon: Key,
                    title: "Advanced Password Generation",
                    description:
                      "Create unbreakable passwords with customizable length, complexity, and character sets.",
                  },
                  {
                    icon: Zap,
                    title: "Cloud Synchronization",
                    description:
                      "Access your passwords anywhere with secure cloud sync across all your devices.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                      <feature.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl transform rotate-3"></div>
              <Card className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      Your Secure Vault
                    </h3>
                    <Badge variant="secondary">Encrypted & Synced</Badge>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        website: "gmail.com",
                        title: "Gmail",
                        category: "personal",
                        username: "john@example.com",
                      },
                      {
                        website: "github.com",
                        title: "GitHub",
                        category: "work",
                        username: "john_dev",
                      },
                      {
                        website: "netflix.com",
                        title: "Netflix",
                        category: "entertainment",
                        username: "john.doe@email.com",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <WebsiteIcon
                          website={item.website}
                          title={item.title}
                          category={item.category}
                          className="h-10 w-10"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.username}
                          </p>
                        </div>
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
