import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import classNames from "classnames";

const teamMembers = [
  { name: "Emily Kim", role: "Founder", img: "https://i.pinimg.com/736x/28/a3/dd/28a3dde8cbc89b5e4759da2aabb8fd7d.jpg?q=80&w=3687&auto=format&fit=crop" },
  { name: "Michael Steward", role: "Creative Director", img: "https://i.pinimg.com/736x/28/a3/dd/28a3dde8cbc89b5e4759da2aabb8fd7d.jpg?q=80&w=3870&auto=format&fit=crop" },
  { name: "Emma Rodriguez", role: "Lead Developer", img: "https://i.pinimg.com/736x/28/a3/dd/28a3dde8cbc89b5e4759da2aabb8fd7d.jpg?w=900&auto=format&fit=crop&q=60" },
  { name: "Julia Gimmel", role: "UX Designer", img: "https://i.pinimg.com/736x/28/a3/dd/28a3dde8cbc89b5e4759da2aabb8fd7d.jpg?w=900&auto=format&fit=crop&q=60" },
  { name: "Lisa Anderson", role: "Marketing Manager", img: "https://i.pinimg.com/736x/28/a3/dd/28a3dde8cbc89b5e4759da2aabb8fd7d.jpg?w=900&auto=format&fit=crop&q=60" },
  { name: "James Wilson", role: "Product Manager", img: "https://i.pinimg.com/736x/28/a3/dd/28a3dde8cbc89b5e4759da2aabb8fd7d.jpg?q=80&w=3687&auto=format&fit=crop" },
];

export default function MusicCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateCarousel = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const validIndex = (newIndex + teamMembers.length) % teamMembers.length;
    setCurrentIndex(validIndex);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleKey = (e) => {
    if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
    else if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  const getCardClass = (i) => {
    const offset = (i - currentIndex + teamMembers.length) % teamMembers.length;
    if (offset === 0) return "z-10 scale-[1.1]";
    if (offset === 1) return "translate-x-[200px] scale-90 opacity-90 z-5 grayscale";
    if (offset === 2) return "translate-x-[400px] scale-70 opacity-70 z-1 grayscale";
    if (offset === teamMembers.length - 1) return "-translate-x-[200px] scale-90 opacity-90 z-5 grayscale";
    if (offset === teamMembers.length - 2) return "-translate-x-[400px]  opacity-70 z-1 grayscale";
    return "opacity-0 pointer-events-none hidden";
  };

  const touchStartX = useRef(0);

  const handleTouchStart = (e) => (touchStartX.current = e.changedTouches[0].screenX);
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) updateCarousel(currentIndex + (diff > 0 ? 1 : -1));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 h-fit overflow-hidden relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
     
      <div className="relative w-full max-w-7xl h-[450px] perspective-[1000px]">
        <button onClick={() => updateCarousel(currentIndex - 1)} className="absolute left-5 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-blue-900/60 text-white rounded-full flex items-center justify-center text-xl hover:bg-black/80 z-20">‹</button>

        <div className="w-full h-full flex items-center justify-center relative transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              onClick={() => updateCarousel(i)}
              className={classNames(
                "absolute w-[280px] h-[350px] bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer",
                getCardClass(i)
              )}
            >
              <Image src={member.img} alt={member.name} width={1000} height={1000} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>

        <button onClick={() => updateCarousel(currentIndex + 1)} className="absolute right-5 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-blue-900/60 text-white rounded-full flex items-center justify-center text-xl hover:bg-black/80 z-20">›</button>
      </div>
    </div>
  );
}
