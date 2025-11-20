"use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, User } from "lucide-react";
import { useState } from "react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    username: string;
    profile_picture?: string;
  };
}

interface ProductTabsProps {
  productId: string;
  fullDescription?: string;
  reviews: Review[];
}

export function ProductTabs({
  productId,
  fullDescription,
  reviews,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="w-full">
      {/* Temporary Tab Navigation */}
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-6">
        <button
          onClick={() => setActiveTab("description")}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
            activeTab === "description"
              ? "bg-background text-foreground shadow-sm"
              : ""
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
            activeTab === "reviews"
              ? "bg-background text-foreground shadow-sm"
              : ""
          }`}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      {/* Description Tab Content */}
      {activeTab === "description" && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Product Description</h3>
            <div className="prose max-w-none text-muted-foreground">
              {fullDescription || "No detailed description available."}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews Tab Content */}
      {activeTab === "reviews" && (
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
              {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= averageRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {averageRating.toFixed(1)} out of 5
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No reviews yet. Be the first to review this product!
                </p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{review.user.username}</p>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
