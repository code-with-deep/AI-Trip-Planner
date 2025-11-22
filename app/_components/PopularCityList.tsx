"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card
      key={card.src}
      card={{
        category: card.category,
        title: card.title,
        content: card.content,
        src: card.src, 
      }}
      index={index}
    />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know your iSad.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => (
        <div
          key={"dummy-content" + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              The first rule of Apple club is that you boast about Apple club.
            </span>{" "}
            Keep a journal, quickly jot down a grocery list, and take amazing class notes...
          </p>
        </div>
      ))}
    </>
  );
};

const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights – Eiffel Tower, Louvre & more",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2200&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "New York, USA",
    title: "Experience NYC – Times Square, Central Park, Broadway",
    src: "https://www.aexplorers.com/wp-content/uploads/elementor/thumbs/places-to-visit-in-ny-qiu39o3no9jbh8x1t1txd5368m22e6ahh7ts1ccg14.jpg",
    content: <DummyContent />,
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo – Shibuya, Cherry Blossoms, Temples",
    src: "https://lp-cms-production.imgix.net/2024-02/shutterstockRF1075025648.jpg?fit=crop&ar=1%3A1&w=1200&auto=format&q=75",
    content: <DummyContent />,
  },
  {
    category: "Rome, Italy",
    title: "Walk through History – Colosseum, Vatican, Roman Forum",
    src: "https://d1bv4heaa2n05k.cloudfront.net/user-images/1534843540357/shutterstock-98484677_destinationMain_1534843549140.jpeg",
    content: <DummyContent />,
  },
  {
    category: "Dubai, UAE",
    title: "Luxury & Innovation – Burj Khalifa, Desert Safari",
    src: "https://nemodivingcenter.com/wp-content/uploads/2024/08/pexels-pixabay-162031-683x1024.jpg",
    content: <DummyContent />,
  },
  {
    category: "India",
    title: "Harbour Views – Opera House, Bondi Beach & Wildlife",
    src: "https://www.oyorooms.com/blog/wp-content/uploads/2017/10/6-min-2-1.jpg",
    content: <DummyContent />,
  },
];
