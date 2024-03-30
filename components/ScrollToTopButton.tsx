"use client";

import { useEffect, useState } from "react";

import { Button } from "@components/ui/button";
import { ChevronUpIcon } from "@radix-ui/react-icons";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    show && (
      <Button
        className="fixed bottom-6 right-6 rounded-full sm:right-10"
        variant="outline"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <ChevronUpIcon width={24} height={24} />
      </Button>
    )
  );
}
