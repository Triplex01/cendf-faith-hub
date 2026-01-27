import { useState, useRef, useCallback, forwardRef } from "react";
import { motion, useDragControls, PanInfo } from "framer-motion";
import { Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResizableContainerProps {
  children: React.ReactNode;
  initialSize?: "small" | "medium" | "large";
  position?: "left" | "right";
  className?: string;
}

const SIZE_PRESETS = {
  small: { width: 200, scale: 0.7 },
  medium: { width: 260, scale: 0.85 },
  large: { width: 320, scale: 1 },
};

const MOBILE_SIZE_PRESETS = {
  small: { width: 160, scale: 0.6 },
  medium: { width: 200, scale: 0.75 },
  large: { width: 260, scale: 0.9 },
};

export const ResizableContainer = forwardRef<HTMLDivElement, ResizableContainerProps>(({
  children,
  initialSize = "small",
  position = "left",
  className = "",
}, ref) => {
  const isMobile = useIsMobile();
  const [currentSize, setCurrentSize] = useState<"small" | "medium" | "large">(initialSize);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const dragControls = useDragControls();
  const containerRef = useRef<HTMLDivElement>(null);

  const sizePresets = isMobile ? MOBILE_SIZE_PRESETS : SIZE_PRESETS;
  const currentPreset = sizePresets[currentSize];

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    setDragPosition(prev => ({
      x: prev.x + info.offset.x,
      y: prev.y + info.offset.y
    }));
  }, []);

  const cycleSize = useCallback(() => {
    const sizes: Array<"small" | "medium" | "large"> = ["small", "medium", "large"];
    const currentIndex = sizes.indexOf(currentSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setCurrentSize(sizes[nextIndex]);
  }, [currentSize]);

  const positionClasses = position === "left" 
    ? "left-2 sm:left-4 md:left-6" 
    : "right-2 sm:right-4 md:right-6";

  return (
    <motion.div
      ref={containerRef}
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        x: dragPosition.x, 
        y: dragPosition.y,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`fixed bottom-16 sm:bottom-20 md:bottom-24 z-50 cursor-grab active:cursor-grabbing ${positionClasses} ${className}`}
      style={{ 
        touchAction: "none",
        width: currentPreset.width,
        transformOrigin: position === "left" ? "bottom left" : "bottom right",
      }}
    >
      <motion.div
        animate={{ scale: currentPreset.scale }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        style={{ transformOrigin: position === "left" ? "bottom left" : "bottom right" }}
      >
        {/* Size Toggle Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full shadow-lg z-10 bg-background/90 hover:bg-background"
          onClick={cycleSize}
        >
          {currentSize === "large" ? (
            <Minimize2 className="w-3 h-3" />
          ) : (
            <Maximize2 className="w-3 h-3" />
          )}
        </Button>
        
        {children}
      </motion.div>
    </motion.div>
  );
});

ResizableContainer.displayName = "ResizableContainer";

export default ResizableContainer;
