import React from "react";
import { Loader } from "@/components/loader";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PageContainer = (props: {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  const { children, className, isLoading } = props;
  return (
    <div className="w-full">
      <div className="flex items-center justify-center mt-[66px] mb-[30px]">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[10vh]">
            <Loader size="lg" color="black" />
          </div>
        ) : (
          <Card
            className={cn(
              `booking--card w-full md:min-w-[900px] md:max-w-[1000px] min-h-[540px]
        mx-auto shadow-[0px_1px_8px_0px_rgba(0,0,0,0.08)] 
        border border-[rgba(26,26,26,0.1)] rounded-lg
        `,
              className && className
            )}
          >
            <CardContent className="relative py-0 px-0">
              <div>{children}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PageContainer;
