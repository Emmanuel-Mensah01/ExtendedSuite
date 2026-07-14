'use client';
import React, { useRef, useState } from 'react';

// ── HOW TO ADD YOUR VIDEO ────────────────────────────────────────────────
// Option A — Local video file (recommended for a file you own):
//   1. Drop your video file into: public/assets/videos/property-tour.mp4
//   2. Set VIDEO_SRC below to "/assets/videos/property-tour.mp4"
//   3. (Optional) Add a poster thumbnail to public/assets/images/ and set
//      VIDEO_POSTER to its path — this is the still image shown before play.
//   4. Leave EMBED_URL as null.
//
// Option B — YouTube / Vimeo link:
//   1. Set EMBED_URL to the embeddable URL, e.g.
//      "https://www.youtube.com/embed/VIDEO_ID" (note: /embed/, not /watch?v=)
//      or "https://player.vimeo.com/video/VIDEO_ID"
//   2. Leave VIDEO_SRC as null.
// ───────────────────────────────────────────────────────────────────────

const VIDEO_SRC: string | null = "/assets/videos/property-tour.mp4";
const VIDEO_POSTER: string | null = "/assets/images/Hotel_building-1783966115388.jpeg";
const EMBED_URL: string | null = null;

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // Slight delay so the video element is visible before we call play()
    requestAnimationFrame(() => {
      videoRef.current?.play();
    });
  };

  return (
    <section id="video-tour" className="scroll-mt-24 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(201,162,39,0.35) 0%, transparent 50%)' }}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4 text-accent">Take a Look Inside</div>
          <h2 className="text-section-title font-display font-medium text-white mb-4">
            Watch the<br />
            <span className="gold-gradient-text">Property Video Tour</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            See the apartments, amenities, and compound before you arrive.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black relative aspect-video">
          {EMBED_URL ? (
            // ── YouTube / Vimeo embed ──
            <iframe
              src={EMBED_URL}
              title="Extended Stay Suite property video tour"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            // ── Local video file with click-to-play poster ──
            <>
              <video
                ref={videoRef}
                src={VIDEO_SRC ?? undefined}
                poster={VIDEO_POSTER ?? undefined}
                controls={isPlaying}
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {!isPlaying && (
                <button
                  type="button"
                  onClick={handlePlay}
                  aria-label="Play video tour"
                  className="absolute inset-0 w-full h-full flex items-center justify-center group"
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full gold-gradient flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#1F2937" className="ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}