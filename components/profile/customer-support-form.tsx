"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

const SUPPORT_CATEGORIES = [
  { value: "order_issue", label: "Order Issue" },
  { value: "product_quality", label: "Product Quality" },
  { value: "shipping", label: "Shipping & Delivery" },
  { value: "payment", label: "Payment Issue" },
  { value: "refund", label: "Refund Request" },
  { value: "account", label: "Account Problem" },
  { value: "other", label: "Other" },
];

export function CustomerSupportForm() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject || !formData.category || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("You must be logged in");
        return;
      }

      // Insert support ticket into database
      const { error } = await supabase.from("support_tickets").insert({
        user_id: user.id,
        subject: formData.subject,
        category: formData.category,
        message: formData.message,
        status: "open",
      });

      if (error) throw error;

      toast.success("Support ticket created successfully");
      setFormData({
        subject: "",
        category: "",
        message: "",
      });
    } catch (error) {
      console.error("Error creating support ticket:", error);
      toast.error("Failed to create support ticket");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create a Support Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your issue in detail..."
                rows={6}
                required
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Ticket"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-muted-foreground">support@butterbear.com</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Response Time</h3>
            <p className="text-muted-foreground">
              We typically respond within 24-48 hours
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Hours of Operation</h3>
            <p className="text-muted-foreground">
              Monday - Friday: 9:00 AM - 6:00 PM (PST)
            </p>
            <p className="text-muted-foreground">
              Saturday - Sunday: 10:00 AM - 4:00 PM (PST)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
