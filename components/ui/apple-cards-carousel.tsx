"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: React.ReactNode[];   // ✅ FIXED TYPE
  initialScroll?: number;
}

export interface CardType {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel: React.FC<CarouselProps> = ({
  items,
  initialScroll = 0,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;

      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] bg-gradient-to-l" />

          <div className="flex flex-row justify-start gap-4 pl-4 mx-auto max-w-7xl">
            {items.map((item, index) => (
              <motion.div
                key={`card-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mr-10 flex justify-end gap-2">
          <button
            disabled={!canScrollLeft}
            onClick={scrollLeft}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>

          <button
            disabled={!canScrollRight}
            onClick={scrollRight}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

interface CardProps {
  card: CardType;
  index: number;
  layout?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, index, layout = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-lg"
            />

            <motion.div
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-[60] mx-auto my-10 max-w-5xl rounded-3xl bg-white p-4 md:p-10 dark:bg-neutral-900"
            >
              <button
                onClick={handleClose}
                className="sticky top-4 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>

              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>

              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-4 text-2xl md:text-5xl font-semibold text-neutral-700 dark:text-white"
              >
                {card.title}
              </motion.p>

              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative h-80 w-56 md:h-[40rem] md:w-96 flex flex-col justify-start items-start rounded-3xl overflow-hidden bg-gray-100 dark:bg-neutral-900"
      >
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-sm md:text-base font-medium text-white"
          >
            {card.category}
          </motion.p>

          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 text-xl md:text-3xl font-semibold text-white max-w-xs"
          >
            {card.title}
          </motion.p>
        </div>

        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 object-cover"
        />
      </motion.button>
    </>
  );
};

export const BlurImage: React.FC<ImageProps> = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <img
      src={src as string}
      width={width}
      height={height}
      onLoad={() => setLoading(false)}
      loading="lazy"
      decoding="async"
      alt={alt ?? "Image"}
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      {...rest}
    />
  );
};
