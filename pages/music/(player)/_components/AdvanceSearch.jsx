"use client";
import { Input } from "../../../../components/ui/input";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../../components/ui/dialog";
import Link from "next/link";
import { getSongsByQuery } from "../../../../lib/fetch";
import { Loader } from "lucide-react";
import { ScrollArea} from "../../../../components/ui/scroll-area";
import { Button } from "../../../../components/ui/button";
import { Play } from "lucide-react";
import { Search } from "lucide-react";

export default function AdvanceSearch() {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getSongs = async () => {
        if (query.trim() === "") {
            setData([]);
            return;
        }

        setLoading(true);
        try {
            const response = await getSongsByQuery(query);
            const result = await response.json();
            if (result.data && result.data.results) {
                setData(result.data.results);
            } else {
                console.warn("Unexpected data structure:", result);
                setData([]);
            }
        } catch (error) {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            const handler = setTimeout(() => {
                getSongs();
            }, 400);

            return () => {
                clearTimeout(handler);
            };
        } else {
            setData([]);
        }
    }, [query]);

    return (
        <div className="px-6 !mb-10 md:px-20 lg:px-32">
             <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger */}
            <DialogTrigger asChild>
                <div className="flex cursor-text h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
                    Look for songs by name...
                </div>
            </DialogTrigger>

            {/* Content */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left flex gap-2">
                        <Input
                            autoFocus={query === ""}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full"
                            type="search"
                            name="query"
                            placeholder="Search for songs by name..."
                            autoComplete="off"
                        />
                        <Button className="min-w-10" size="icon" asChild={query !== ""}>
                            {query !== "" ? (
                                <Link href={`/search/${query}`}>
                                    <Search className="h-4 w-4" />
                                </Link>
                            ) : (
                                <Search className="h-4 w-4" />
                            )}
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                {/* Body */}
                <div className="text-left grid gap-2 mb-5 px-0">
                    {loading && (
                        <div className="flex h-[400px] w-full items-center justify-center text-sm text-muted-foreground">
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Searching...
                        </div>
                    )}
                    {!loading && data.length === 0 && query && (
                        <div className="flex items-center justify-center h-[400px]">
                            <p className="text-sm text-muted-foreground">No results found!</p>
                        </div>
                    )}
                    {!query && !loading && (
                        <div className="flex items-center justify-center h-[400px]">
                            <p className="text-sm text-muted-foreground">Type something to search..</p>
                        </div>
                    )}
                    {query && !loading && data.length > 0 && (
                        <>
                            <div className="px-4 md:px-0">
                                <h1 className="text-sm text-foreground/70">
                                    Search results for{" "}
                                    <span className="bg-primary/70 text-primary-foreground">{query}</span>
                                </h1>
                            </div>
                            <ScrollArea className="h-[390px] md:px-0 px-4">
                                <div className="flex flex-col gap-2">
                                    {data.map((song) => (
                                        <Link
                                            className="w-full hover:bg-secondary/30 border border-border rounded-md p-3 flex items-center justify-between gap-3"
                                            key={song.id}
                                            href={`/${song.id}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={song.image[2].url}
                                                    alt={song.name}
                                                    className="bg-secondary/50 w-8 h-8 rounded-md"
                                                />
                                                <p className="text-sm grid">
                                                    {song.name.slice(0, 40)}
                                                    {song.name.length > 40 && "..."}
                                                    <span className="text-muted-foreground">
                                                        {song.artists.primary[0]?.name || "unknown"}
                                                    </span>
                                                </p>
                                            </div>
                                            <Button size="icon" className="min-w-10" variant="outline">
                                                <Play className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                            </ScrollArea>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
        </div>
    );
}
