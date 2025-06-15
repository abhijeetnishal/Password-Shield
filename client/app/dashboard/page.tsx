"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Shield,
  Plus,
  Search,
  Eye,
  EyeOff,
  Copy,
  Edit,
  Trash2,
  Key,
  Globe,
  CreditCard,
  Wifi,
  LogOut,
  Star,
  Lock,
  AlertCircle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PasswordGenerator } from "@/components/password-generator";
import { PasswordStrengthIndicator } from "@/components/password-strength";
import { WebsiteIcon } from "@/components/website-icon";
import { IconManager } from "@/components/icon-manager";
import { useFetch } from "@/hooks/useFetch";
import { useAuthStore } from "@/store/AuthStore";
import { PasswordsService } from "@/services/PasswordService";
import { useProfileStore } from "@/store/ProfileStore";
import { deleteCookie } from "cookies-next";

interface Category {
  value: string;
  label: string;
  icon: any;
}

interface PasswordFormData {
  title: string;
  username: string;
  password: string;
  website: string;
  category: string;
  notes: string;
  favorite: boolean;
}

const categories: Category[] = [
  { value: "social", label: "Social Media", icon: Globe },
  { value: "banking", label: "Banking", icon: CreditCard },
  { value: "work", label: "Work", icon: Shield },
  { value: "personal", label: "Personal", icon: Key },
  { value: "wifi", label: "WiFi", icon: Wifi },
  { value: "other", label: "Other", icon: Lock },
];

interface PasswordEntity {
  _id: string;
  title: string;
  username: string;
  password: string;
  website: string;
  category: string;
  notes: string;
  favorite: boolean;
  updated_at: string;
}

export default function Dashboard() {
  const router = useRouter();

  const [passwords, setPasswords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState<PasswordEntity | null>(
    null
  );
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const profile = useProfileStore((state) => state.profileDetails);
  const token = useAuthStore((state) => state.authToken);

  const [
    { passwordData, isPasswordDataLoading, isPasswordDataError },
    getPasswordsAPI,
  ] = useFetch(null);
  const [
    {
      data: addPasswordData,
      isLoading: isAddPasswordDataLoading,
      isError: isAddPasswordDataError,
    },
    getAddPasswordAPI,
  ] = useFetch(null);
  const [
    {
      data: updatePasswordData,
      isLoading: isUpdatePasswordDataLoading,
      isError: isUpdatePasswordDataError,
    },
    getUpdatePasswordAPI,
  ] = useFetch(null);
  const [
    {
      data: deletePasswordData,
      isLoading: isDeletePasswordDataLoading,
      isError: isDeletePasswordDataError,
    },
    getDeletePasswordAPI,
  ] = useFetch(null);

  useEffect(
    function getPasswords() {
      if (token) {
        getPasswordsAPI(() => () => PasswordsService.getUserPasswords(token));
      }
    },
    [token]
  );

  useEffect(
    function updatePasswords() {
      if (passwordData && passwordData.code) {
        const { code, data, message } = passwordData;

        if (code === 200) {
          setPasswords(data);
        } else {
          setError(message);
        }
      } else if (isPasswordDataError) {
        setError("Something went wrong!");
      }
    },
    [passwordData, isPasswordDataError]
  );

  useEffect(
    function addPassword() {
      if (addPasswordData && addPasswordData.code) {
        const { code, data, message } = addPasswordData;

        if (code === 200) {
        } else {
          setError(message);
        }
      } else if (isAddPasswordDataError) {
        setError("Something went wrong!");
      }
    },
    [addPasswordData, isAddPasswordDataError]
  );

  useEffect(
    function updatePassword() {
      if (updatePasswordData && updatePasswordData.code) {
        const { code, data, message } = updatePasswordData;

        if (code === 200) {
        } else {
          setError(message);
        }
      } else if (isUpdatePasswordDataError) {
        setError("Something went wrong!");
      }
    },
    [updatePasswordData, isUpdatePasswordDataError]
  );

  useEffect(
    function deletePassword() {
      if (deletePasswordData && deletePasswordData.code) {
        const { code, data, message } = deletePasswordData;

        if (code === 200) {
        } else {
          setError(message);
        }
      } else if (isDeletePasswordDataError) {
        setError("Something went wrong!");
      }
    },
    [deletePasswordData, isDeletePasswordDataError]
  );

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess("Copied to clipboard");
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  const toggleFavorite = async (password: PasswordEntity) => {
    // await updatePassword(password._id, {
    //   title: password.title,
    //   username: password.username,
    //   password: password.password,
    //   website: password.website,
    //   category: password.category,
    //   notes: password.notes,
    //   favorite: !password.favorite,
    // });
  };

  const filteredPasswords = passwords.filter((password: PasswordEntity) => {
    const matchesSearch =
      password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.website.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || password.category === selectedCategory;
    const matchesFavorites = !showFavoritesOnly || password.favorite;

    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const handleLogout = () => {
    deleteCookie("token");
    router.replace("/");
  };

  const handleAddNewPassword = () => {};

  const handleDeletePassword = (id: string) => {};

  const handleUpdatePassword = (id: string, data: PasswordFormData) => {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                SecureVault
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {profile?.email}
              </span>

              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Error/Success Messages */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <PasswordForm onSubmit={handleAddNewPassword} />
                  </DialogContent>
                </Dialog>

                <PasswordGenerator />
                <IconManager />
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory("all")}
                >
                  All Passwords ({passwords.length})
                </Button>
                {categories.map((category: Category) => {
                  const count = passwords.filter(
                    (p: PasswordEntity) => p.category === category.value
                  ).length;
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.value}
                      variant={
                        selectedCategory === category.value
                          ? "default"
                          : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.label} ({count})
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Passwords</span>
                  <Badge variant="secondary">{passwords.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Favorites</span>
                  <Badge variant="secondary">
                    {passwords.filter((p: PasswordEntity) => p.favorite).length}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Categories</span>
                  <Badge variant="secondary">
                    {
                      new Set(passwords.map((p: PasswordEntity) => p.category))
                        .size
                    }
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search passwords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* <Button
                    variant="outline"
                    onClick={loadPasswords}
                    disabled={isLoading}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${
                        isLoading ? "animate-spin" : ""
                      }`}
                    />
                    Refresh
                  </Button> */}
                </div>
              </CardContent>
            </Card>

            {/* Password List */}
            <div className="space-y-4">
              {isPasswordDataLoading ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Loading passwords...
                      </h3>
                      <p className="text-gray-600">
                        Please wait while we fetch your secure data
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : passwordData && passwordData.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No passwords found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm ||
                        selectedCategory !== "all" ||
                        showFavoritesOnly
                          ? "Try adjusting your search or filters"
                          : "Get started by adding your first password"}
                      </p>
                      {!searchTerm &&
                        selectedCategory === "all" &&
                        !showFavoritesOnly && (
                          <Button onClick={() => setIsAddDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Password
                          </Button>
                        )}
                    </div>
                  </CardContent>
                </Card>
              ) : passwordData && passwordData.length > 0 ? (
                passwordData.map((password: PasswordEntity) => (
                  <PasswordCard
                    key={password._id}
                    password={password}
                    showPassword={showPasswords[password._id] || false}
                    onToggleVisibility={() =>
                      togglePasswordVisibility(password._id)
                    }
                    onCopy={copyToClipboard}
                    onEdit={() => setEditingPassword(password)}
                    onDelete={() => handleDeletePassword(password._id)}
                    onToggleFavorite={() => toggleFavorite(password)}
                  />
                ))
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {editingPassword && (
        <Dialog
          open={!!editingPassword}
          onOpenChange={() => setEditingPassword(null)}
        >
          <DialogContent className="max-w-md">
            <PasswordForm
              password={editingPassword}
              onSubmit={(data) => {
                if (editingPassword) {
                  handleUpdatePassword(editingPassword._id, data);
                }
              }}
              isEditing
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Password Card Component
function PasswordCard({
  password,
  showPassword,
  onToggleVisibility,
  onCopy,
  onEdit,
  onDelete,
  onToggleFavorite,
}: {
  password: PasswordEntity;
  showPassword: boolean;
  onToggleVisibility: () => void;
  onCopy: (text: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}) {
  const category = categories.find((c) => c.value === password.category);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <WebsiteIcon
              website={password.website}
              title={password.title}
              category={password.category}
              className="h-10 w-10"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{password.title}</h3>
              <p className="text-sm text-gray-600">{password.website}</p>
              <p className="text-sm text-gray-500">{password.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFavorite}
              className={
                password.favorite ? "text-yellow-500" : "text-gray-400"
              }
            >
              <Star
                className={`h-4 w-4 ${password.favorite ? "fill-current" : ""}`}
              />
            </Button>
            <Badge variant="secondary">{category?.label}</Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="flex-1 font-mono text-sm bg-gray-50 p-2 rounded">
              {showPassword ? password.password : "••••••••••••"}
            </div>
            <Button variant="ghost" size="sm" onClick={onToggleVisibility}>
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopy(password.password)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {password.notes && (
            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
              {password.notes}
            </p>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-xs text-gray-500">
              Updated {new Date(password.updated_at).toLocaleDateString()}
            </span>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Password Form Component
function PasswordForm({
  password,
  onSubmit,
  isEditing = false,
}: {
  password?: PasswordEntity;
  onSubmit: (data: PasswordFormData) => void;
  isEditing?: boolean;
}) {
  const [formData, setFormData] = useState({
    title: password?.title || "",
    username: password?.username || "",
    password: password?.password || "",
    website: password?.website || "",
    category: password?.category || "personal",
    notes: password?.notes || "",
    favorite: password?.favorite || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isEditing ? "Edit Password" : "Add New Password"}
        </DialogTitle>
        <DialogDescription>
          {isEditing
            ? "Update your password details"
            : "Add a new password to your vault"}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="e.g., Gmail, Facebook, Bank Account"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, website: e.target.value }))
            }
            placeholder="https://example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username/Email *</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Enter password"
            required
          />
          <PasswordStrengthIndicator password={formData.password} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value: string) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, notes: e.target.value }))
            }
            placeholder="Additional notes (optional)"
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="favorite"
            checked={formData.favorite}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, favorite: e.target.checked }))
            }
            className="rounded"
          />
          <Label htmlFor="favorite">Mark as favorite</Label>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="submit">
            {isEditing ? "Update Password" : "Add Password"}
          </Button>
        </div>
      </form>
    </>
  );
}
