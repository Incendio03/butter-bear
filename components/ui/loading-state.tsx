import { Spinner } from "./spinner";
import { Card, CardContent } from "@/components/ui/card";

interface LoadingStateProps {
  message?: string;
  subtext?: string;
  fullScreen?: boolean;
}

export function LoadingState({
  message = "Loading",
  subtext = "Please wait...",
  fullScreen = false,
}: LoadingStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Spinner with glow effect */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-xl"></div>
        <Spinner className="size-16 text-primary relative z-10" />
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <p className="text-xl font-semibold text-foreground">{message}</p>
        <p className="text-sm text-muted-foreground">{subtext}</p>
      </div>

      {/* Bouncing dots */}
      <div className="flex gap-1">
        <div
          className="w-2 h-2 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-2 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></div>
        <div
          className="w-2 h-2 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
        <Card className="w-full max-w-md mx-4 shadow-2xl">
          <CardContent className="p-12">{content}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-12 min-h-96 flex items-center justify-center">
        {content}
      </CardContent>
    </Card>
  );
}
