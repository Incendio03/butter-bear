import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, User } from "lucide-react";
import Link from "next/link";

interface SellerInfoProps {
  seller: {
    id: string;
    username: string;
    profile_picture?: string;
    location?: string;
  };
}

export function SellerInfo({ seller }: SellerInfoProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm text-primary-foreground font-semibold mb-3">
          Seller Information
        </h3>
        <Link
          href={`/seller/${seller.id}`}
          className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={seller.profile_picture} alt={seller.username} />
            <AvatarFallback>
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-primary">{seller.username}</p>
            {seller.location && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {seller.location}
              </p>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
