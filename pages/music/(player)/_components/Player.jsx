"use client"
import { Button } from "@/components/ui/button";
import { getSongsById} from "../../../../lib/fetch";
import { Download, Pause, Play, Repeat, Loader2,Repeat1, Share2 } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Skeleton } from "../../../../components/ui/skeleton";
import { Slider } from "../../../../components/ui/slider";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { NextContext } from "../../../../hooks/use-context";
import Next from "../../../../components/music-components/cards/next";

export default function Player({ id }) {
    const [data, setData] = useState([]);
    const [playing, setPlaying] = useState(true);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [audioURL, setAudioURL] = useState("");
    const params = useSearchParams();
    const next = useContext(NextContext);

    const getSong = async () => {
        const get = await getSongsById(id);
        const data = await get.json();
        setData(data.data[0]);
        if (data?.data[0]?.downloadUrl[2]?.url) {
            setAudioURL(data?.data[0]?.downloadUrl[2]?.url);
        } else if (data?.data[0]?.downloadUrl[1]?.url) {
            setAudioURL(data?.data[0]?.downloadUrl[1]?.url);
        } else {
            setAudioURL(data?.data[0]?.downloadUrl[0]?.url);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const togglePlayPause = () => {
        if (playing) {
            audioRef.current.pause();
            localStorage.setItem("p", "false");
        } else {
            audioRef.current.play();
            localStorage.setItem("p", "true");
        }
        setPlaying(!playing);
    };

    const downloadSong = async () => {
        setIsDownloading(true);
        const response = await fetch(audioURL);
        const datas = await response.blob();
        const url = URL.createObjectURL(datas);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.name}.mp3`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('downloaded');
        setIsDownloading(false);
    };

    const handleSeek = (e) => {
        const seekTime = e[0];
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const loopSong = () => {
        audioRef.current.loop = !audioRef.current.loop;
        setIsLooping(!isLooping);
        if (isLooping) {
            toast.success('Removed from Loop!');
        } else {
            toast.success('Added to Loop!');
        }
    };

    const handleShare = () => {
        try {
            navigator.share({
                url: `https://${window.location.host}/${data.id}`
            });
        }
        catch (e) {
            toast.error('Something went wrong!');
        }
    }


    useEffect(() => {
        getSong();
        localStorage.setItem("last-played", id);
        localStorage.removeItem("p");
        if (params.get("c")) {
            audioRef.current.currentTime = parseFloat(params.get("c") + 1);
        }
        const handleTimeUpdate = () => {
            try {
                setCurrentTime(audioRef.current.currentTime);
                setDuration(audioRef.current.duration);
                localStorage.setItem("c", audioRef.current.currentTime);
            }
            catch (e) {
                setPlaying(false);
            }
        };
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, []);
   useEffect(() => {
  if (
    currentTime === duration &&
    !isLooping &&
    duration !== 0 &&
    next?.nextData?.id
  ) {
    window.location.href = `/music/(player)/${next.nextData.id}`;
  }
}, [currentTime, duration, isLooping, next?.nextData?.id]);
    return (
        <div className="mb-3 mt-4">
            <audio onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onLoadedData={() => setDuration(audioRef.current.duration)} autoPlay={playing} src={audioURL} ref={audioRef}></audio>
            <div className="grid gap-6 w-full">
                <div className="sm:flex px-6 md:px-20 lg:px-32 grid gap-5 w-full">
                    <div>
                        {data.length <= 0 ? (
                            <Skeleton className="md:w-[130px] aspect-square rounded-2xl md:h-[150px]" />
                        ) : (
                            <div className="relative">
                                <img src={data.image[2].url} className="sm:h-[150px] h-full bg-secondary/50 rounded-2xl sm:w-[200px] w-full object-cover" />
                                <img src={data.image[2].url} className="hidden dark:block absolute top-0 left-0 w-[110%] h-[110%] blur-3xl -z-10 opacity-50" />
                            </div>
                        )}
                    </div>
                    {data.length <= 0 ? (
                        <div className="flex flex-col justify-between w-full">
                            <div>
                                <Skeleton className="h-4 w-36 mb-2" />
                                <Skeleton className="h-3 w-16 mb-4" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-full rounded-full mb-2" />
                                <div className="w-full flex items-center justify-between">
                                    <Skeleton className="h-[9px] w-6" />
                                    <Skeleton className="h-[9px] w-6" />
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <Skeleton className="h-10 w-10" />
                                    <Skeleton className="h-10 w-10" />
                                    <Skeleton className="h-10 w-10" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-between w-full">
                            <div>
                                <h1 className="text-xl font-bold md:max-w-lg max-w-[260px]">{data.name}</h1>
                                <p className="text-xs text-muted-foreground">by <Link href={"/search/" + `${encodeURI(data.artists.primary[0].name.toLowerCase().split(" ").join("+"))}`} className="text-foreground">{data.artists.primary[0]?.name || "unknown"}</Link></p>
                            </div>
                            <div className="grid gap-2 w-full mt-5 sm:mt-0">
                                <Slider onValueChange={handleSeek} value={[currentTime]} max={duration} className="w-full" />
                                <div className="w-full flex items-center justify-between">
                                    <span className="text-xs">{formatTime(currentTime)}</span>
                                    <span className="text-xs">{formatTime(duration)}</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-3 sm:mt-0">
                                        <Button size="icon" variant="outline" onClick={loopSong}>
                                            {!isLooping ? <Repeat className="h-4 w-4" /> : <Repeat1 className="h-4 w-4" />}
                                        </Button>
                                        <Button size="icon" variant={playing ? "gooeyRight" : "gooeyLeft"} onClick={togglePlayPause}>
                                            {playing ? (
                                                <Pause className="h-4 w-4" />
                                            ) : (
                                                <Play className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button size="icon" variant="outline" onClick={downloadSong}>
                                            {isDownloading ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Download className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    <Button size="icon" variant="outline" onClick={handleShare}><Share2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {next.nextData && (
                <Next name={next.nextData.name} artist={next.nextData.artist} image={next.nextData.image} />
            )}
        </div>
    )
}
