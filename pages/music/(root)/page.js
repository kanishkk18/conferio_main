"use client"
import AlbumCard from "../../../components/music-components/cards/album";
import ArtistCard from "../../../components/music-components/cards/artist";
import SongCard from "../../../components/music-components/cards/song";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getSongsByQuery, searchAlbumByQuery } from "@/lib/fetch";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, SkipBack, SkipForward } from "lucide-react";
// import MusicCarousel from "../components/ui/MusicCarousel";
import Header from "../../../components/music-components/page/header";
import Image from "next/image";


export default function Page() {
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [activeCard, setActiveCard] = useState(3); // Initially, the third card is active
  const containerRef = useRef(null); // Ref for the scrollable container

  const cards = [1, 2, 3, 4, 5];

  const handleCardClick = (i) => {
    setActiveCard(i);
    const container = containerRef.current;
    const cardWidth = 250; // Width of each card
    const offset = (container.offsetWidth - cardWidth) / 2; // Center offset
    container.scrollTo({
      left: i * cardWidth - offset,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    const cardWidth = 250; // Width of each card
    const scrollLeft = container.scrollLeft;
    const newActiveCard = Math.round(scrollLeft / cardWidth) + 1; // Determine closest card
    if (newActiveCard !== activeCard) {
      setActiveCard(newActiveCard);
    }
  };

  const getSongs = async (e, type) => {
    const get = await getSongsByQuery(e);
    const data = await get.json();
    if (type === "latest") {
      setLatest(data.data.results);
    } else if (type === "popular") {
      setPopular(data.data.results);
    }
  };

  const getAlbum = async () => {
    const get = await searchAlbumByQuery("latest");
    const data = await get.json();
    setAlbums(data.data.results);
  };

  useEffect(() => {
    getSongs("latest", "latest");
    getSongs("trending", "popular");
    getAlbum();
  }, []);

  return (
    <main className="pl-8 pb-20  max-w-screen overflow-hidden">
<Header />

      {/* <MusicCarousel/> */}

<div className="relative mb-16 h-[320px] mt-10">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex justify-start thin-scrollbar items-center py-4 overflow-x-scroll scroll-smooth"
      >
        {cards.map((i) => (
          <div
            key={i}
            onClick={() => handleCardClick(i)} // Set clicked card as main
            className={`relative min-w-[280px] h-[340px] rounded-3xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out cursor-pointer ${
              i === activeCard ? "z-10" : "-ml-12"
            }`}
            style={{
              transform: `translateX(${(i - activeCard) * -15}%) scale(${
                1 - Math.abs(i - activeCard) * 0.1
              })`,
              zIndex: 5 - Math.abs(i - activeCard),
              opacity: 1 - Math.abs(i - activeCard) * 0.2,
            }}
          >
            <Image height={1000} width={1000}
              src="https://c.saavncdn.com/408/Rockstar-Hindi-2011-20221212023139-500x500.jpg"
              alt={`Featured ${i}`}
              className="w-full h-full object-cover"
            />
            {i === activeCard && (
              <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6">
                <Button
                  size="icon"
                  className="absolute right-4 top-4 rounded-full bg-white/20 hover:bg-white/30"
                >
                  <Play className="h-6 w-6" />
                </Button>
                <h3 className="text-2xl font-bold">Echoes of Midnight</h3>
                <p className="text-gray-200">Jon Hickman</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

       <div className="mb-8">
            <div className="flex items-center justify-between mb-4 ">
              <h2 className="text-xl font-bold text-neutral-200">Select Categories</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap ">
              {["All", "Relax", "Sad", "Party", "Romance", "Energetic", "Relaxing", "Jazz", "Alternative"].map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "secondary"}
                  className={`rounded-full px-8 text-white ${category === "All" ? "bg-red-600" : "bg-transparent border border-neutral-700"}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
      <div>
        <h1 className="text-base">Songs</h1>
        <p className="text-xs text-muted-foreground">Top new released songs.</p>
        <ScrollArea className="rounded-md mt-4">
          <div className="flex gap-4">
            {latest.length ? latest.slice().reverse().map((song) => (
              <SongCard className="" key={song.id} image={song.image[2].url} album={song.album} title={song.name} artist={song.artists.primary[0].name} id={song.id} />
            )) : (
              <>
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="mt-14">
        <h1 className="text-base">Albums</h1>
        <p className="text-xs text-muted-foreground">Top new released albums.</p>
        <ScrollArea className="rounded-md mt-6">
          <div className="flex gap-4">
            {albums.length ? albums.slice().reverse().map((song) => (
              <AlbumCard key={song.id} lang={song.language} image={song.image[2].url} album={song.album} title={song.name} artist={song.artists.primary[0].name} id={`album/${song.id}`} />
            )) : (
              <>
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="mt-12">
        <h1 className="text-base">Artists</h1>
        <p className="text-xs text-muted-foreground">Most searched artists.</p>
        <ScrollArea className="rounded-md mt-6">
          <div className="flex gap-4">
            {latest.length ? [...new Set(latest.map(a => a.artists.primary[0].id))].map(id => (
              <ArtistCard key={id} id={id} image={latest.find(a => a.artists.primary[0].id === id).artists.primary[0].image[2]?.url || `https://az-avatar.vercel.app/api/avatar/?bgColor=0f0f0f0&fontSize=60&text=${latest.find(a => a.artists.primary[0].id === id).artists.primary[0].name.split("")[0].toUpperCase() || "UN"}`} name={latest.find(a => a.artists.primary[0].id === id).artists.primary[0].name} />
            )) : (
              <>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="mt-12">
        <h1 className="text-base">Trending</h1>
        <p className="text-xs text-muted-foreground">Most played songs in this week.</p>
        <ScrollArea className="rounded-md mt-6">
          <div className="flex gap-4">
            {popular.length ? popular.map((song) => (
              <SongCard key={song.id} id={song.id} image={song.image[2].url} title={song.name} artist={song.artists.primary[0].name} />
            )) : (
              <>
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </main>
  )
}
