'use client';
import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{
  name: 'Kwame Asante',
  role: 'Business Consultant, Accra',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e8288816-1772198562258.png",
  text: 'Stayed for 3 weeks on a corporate project. The apartment felt like a boutique hotel — spotless, great Wi-Fi, and the backup power meant I never missed a deadline. Will return.',
  rating: 5,
  stay: '3-week stay · One Bedroom'
},
{
  name: 'Abena Mensah',
  role: 'Returning Ghanaian, London',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15c9994e3-1777820929540.png",
  text: 'Perfect base for visiting family in Tema. Much better value than a hotel, and the kitchenette meant I could cook local food. The security gave me real peace of mind.',
  rating: 5,
  stay: '10-day stay · Two Bedroom'
},
{
  name: 'James Osei-Bonsu',
  role: 'Expatriate Engineer, Takoradi',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18591d91f-1767978242303.png",
  text: 'Monthly rate is excellent for the quality. Full A/C, Smart TV, and very close to the motorway for my commute. The team responds quickly on WhatsApp.',
  rating: 5,
  stay: '2-month stay · One Bedroom'
},
{
  name: 'Efua Darko',
  role: 'Medical Professional, Tema',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dac8b24b-1765819828759.png",
  text: 'Needed accommodation close to the hospital for a 6-week rotation. Extended Stay Suite was ideal — clean, quiet, and the laundry service was a lifesaver.',
  rating: 5,
  stay: '6-week stay · One Bedroom'
}];


export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {if (timerRef.current) clearInterval(timerRef.current);};
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const t = testimonials[active];

  return (
    <section id="reviews" className="scroll-mt-24 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
      style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(201,162,39,0.3) 0%, transparent 50%)' }} />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="section-label justify-center mb-4 text-accent">Guest Reviews</div>
          <h2 className="text-section-title font-display font-medium text-white">
            What Our Guests Say
          </h2>
          <p className="text-white/50 text-sm mt-2">Trusted by business travelers, expats & families</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12 transition-all duration-500">
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: t.rating }).map((_, i) =>
            <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#C9A227"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            )}
          </div>

          {/* Quote */}
          <blockquote className="font-display text-xl lg:text-2xl font-light text-white leading-relaxed mb-8">
            &ldquo;{t.text}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/30 flex-shrink-0">
                <AppImage
                  src={t.avatar}
                  alt={`Portrait of ${t.name}, a guest at Extended Stay Suite`}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full" />
                
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-white/50 text-xs">{t.role}</p>
              </div>
            </div>
            <span className="text-accent text-xs font-medium bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
              {t.stay}
            </span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) =>
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-400 ${i === active ? 'w-8 bg-accent' : 'w-3 bg-white/20 hover:bg-white/40'}`}
            aria-label={`Review ${i + 1}`} />

          )}
        </div>
      </div>
    </section>);

}