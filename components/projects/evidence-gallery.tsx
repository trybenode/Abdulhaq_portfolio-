"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
export default function EvidenceGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const previous = () =>
    setIndex((i) => (i + images.length - 1) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);
  useEffect(() => {
    if (!open) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((i) => (i + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((i) => (i + images.length - 1) % images.length);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, images.length]);
  return (
    <div className="case-gallery">
      <div className="case-gallery-image">
        <Image
          src={images[index]}
          alt={`${title} — supplied screenshot ${index + 1}`}
          fill
          sizes="(max-width:767px) 90vw, 1100px"
        />
      </div>
      <div className="gallery-controls">
        <span aria-live="polite">
          EVIDENCE / {String(index + 1).padStart(2, "0")} OF{" "}
          {String(images.length).padStart(2, "0")}
        </span>
        <div className="gallery-actions">
          <button
            aria-label="Previous screenshot"
            onClick={previous}
            disabled={images.length < 2}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            aria-label="Next screenshot"
            onClick={next}
            disabled={images.length < 2}
          >
            <ArrowRight size={16} />
          </button>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button aria-label="Expand screenshot">
                <Expand size={15} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="gallery-overlay" />
              <Dialog.Content className="gallery-dialog">
                <Dialog.Title className="sr-only">
                  {title} screenshot gallery
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  Use the left and right arrow keys to change screenshots.
                  Escape closes the gallery.
                </Dialog.Description>
                <Dialog.Close className="gallery-close">
                  <X size={18} /> Close
                </Dialog.Close>
                <div className="gallery-dialog-image">
                  <Image
                    src={images[index]}
                    alt={`${title} expanded screenshot ${index + 1}`}
                    fill
                    sizes="95vw"
                  />
                </div>
                <div className="gallery-controls">
                  <span aria-live="polite">
                    {index + 1} / {images.length}
                  </span>
                  <div className="gallery-actions">
                    <button
                      aria-label="Previous screenshot"
                      onClick={previous}
                      disabled={images.length < 2}
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      aria-label="Next screenshot"
                      onClick={next}
                      disabled={images.length < 2}
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
