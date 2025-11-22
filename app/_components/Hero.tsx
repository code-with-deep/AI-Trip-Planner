"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { useRouter } from "next/navigation";

const suggestions = [
  { title: "Plan your trip", icon: "✈️" },
  { title: "Book flights", icon: "🛩️" },
  { title: "Reserve hotels", icon: "🏨" },
  { title: "Find top destinations", icon: "🌍" },
  { title: "Create a custom itinerary", icon: "🗺️" },
  { title: "Estimate travel budget", icon: "💸" },
  { title: "Discover nearby attractions", icon: "📍" },
  { title: "Get visa & travel requirements", icon: "🛂" },
  { title: "Track your bookings", icon: "📦" },
  { title: "Plan group trips", icon: "👨‍👩‍👧‍👦" },
  { title: "Get weather updates", icon: "⛅" },
  { title: "Find restaurants & cafes", icon: "🍽️" },
];

function Hero() {
  const { user } = useUser();
  const router = useRouter();

  const onSend = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    // API logic here 
  };

  return (
    <div className="mt-24 flex justify-center">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h2 className="text-xl md:text-4xl font-bold">
          Hey, I'm Your Personal{" "}
          <span className="text-primary">Travel Agent</span>
        </h2>

        <p className="text-lg">
          "Just tell me where you want to go — I’ll plan your flights, stays,
          and your way back home effortlessly."
        </p>

        {/* Input Box */}
        <div>
          <div className="border rounded-2xl p-4">
            <Textarea
              placeholder="Create a trip from India to Paris"
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            />
            <Button
              size="icon"
              className="h-8 w-20 mt-2"
              onClick={onSend}
            >
              Send
            </Button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="
                flex items-center gap-2 p-4 rounded-xl border 
                transition-all duration-300 cursor-pointer
                hover:scale-105 hover:border-primary 
                hover:text-primary hover:font-semibold
              "
            >
              <span className="text-2xl">{suggestion.icon}</span>
              <h2 className="text-sm md:text-base">{suggestion.title}</h2>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="flex items-center justify-center flex-col">
          <h2 className="my-7 mt-14 flex gap-2 text-center">
            Not sure where to start?{" "}
            <span className="font-bold text-primary">See how it works</span>
          </h2>

          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://youtu.be/winzzRq7Yg4"
            thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
