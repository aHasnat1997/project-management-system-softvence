import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function TooltipWrapper(
  { trigger, content, side = 'right' }:
    { trigger: React.ReactNode, content: React.ReactNode, side?: "right" | "top" | "bottom" | "left" }
) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent side={side}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  );
};
