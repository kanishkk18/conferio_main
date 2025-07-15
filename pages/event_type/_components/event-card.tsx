import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
import { ENV } from "@/lib/get-env";
import { cn } from "@/lib/utils";
import { Clock, Ellipsis } from "lucide-react";
import { FC, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ExternalLink } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Badge } from "react-daisyui";

interface PropsType {
  id: string;
  title: string;
  slug: string;
  duration: number;
  isPrivate: boolean;
  username: string;
  isPending: boolean;
  onToggle: () => void;
}

const EventCard: FC<PropsType> = ({
  title,
  duration,
  slug,
  isPrivate = false,
  username,
  isPending,
  onToggle,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const event_link = `${ENV.NEXT_PUBLIC_APP_ORIGIN}/${username}/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(event_link)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast.success("Event link copied");
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
      });
  };
  return (
    <div className="border-b dark:border-neutral-800">
      
      <Card
        className={cn(
          `rounded-none bg-transparent shadow-none border-none p-3 px-5 flex items-center justify-between`,
          isPrivate && "bg-transparent"
        )}
      >
        <CardContent className="relative flex p-0">
          <div
            className={cn(
              ` `,
              isPrivate && "bg-[rgb(178,178,178)]"
            )}
          ></div>

          {/* {Event details} */}
          <div className="w-full gap-2 flex flex-col">
            <div className="flex justify-end items-end text-end">
            <h2
              className={cn(
              `text-md font-semibold dark:text-neutral-300`,
              isPrivate && "text-[rgba(109,107,107,0.61)]"
              )}
            >
              {title}
            </h2>
            <p className="text-xs text-gray-500">/{slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}</p>
            </div>
            <p className="dark:text-[#ffffff] text-xs flex justify-center text-center items-center px-1 gap-1 rounded-sm w-fit dark:bg-neutral-600"><Clock className="h-3 w-3"/> {duration}m</p>
            
          </div>
        </CardContent>

        <CardFooter
          className="flex p-0 gap-4 items-center justify-center">

             <Badge
        className="dark:bg-neutral-700 text-xs font-semibold"  >
            {isPending ? (
              <Loader size="sm" color="black" />
            ) : (
              <span className="">{isPrivate ? "Hidden" : ""}</span>
            )}
          </Badge>          

          <Switch
  checked={isPrivate}
  onCheckedChange={onToggle}
  disabled={isPending}
/>
            <div className="flex gap-3 px-3 justify-center items-center rounded-md border dark:border-neutral-700">
          <Link
              href={event_link}
              className={cn(
                `p-0`,
                isPrivate && "pointer-events-none opacity-60"
              )}
            >
              <ExternalLink className="h-4 w-4 text-neutral-500 dark:text-white"/>
            </Link>

            <div className="dark:bg-neutral-700 bg-neutral-300 h-5 min-h-full w-[1px]"></div>

          <Button
            disabled={isPrivate}
            className="bg-transparent shadow-none text-neutral-500 dark:text-white hover:bg-transparent p-0"
            onClick={handleCopyLink}>

            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-link-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            {/* <span>{isCopied ? "Copied!" : "Copy link"}</span> */}
          </Button>
          
            <div className="dark:bg-neutral-700 bg-neutral-300 h-5 min-h-full w-[1px]"></div>
          <Button className="bg-transparent shadow-none text-neutral-500 dark:text-white hover:bg-transparent p-0">
            <Ellipsis/>
          </Button>

          </div>

        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;
