import type { Component } from "solid-js";
import { createSignal, onMount, onCleanup } from "solid-js";
import { useTrackerViewModel } from "../../context/TrackerContext.tsx";
import { getWeaponIcons } from "../../utils/WeaponImageUtil.ts";
import {Target, Sparkles, Flame, X, Check} from "../../utils/icons.ts";

const SwipeTracker: Component = () => {
  const trackerViewModel = useTrackerViewModel();
  
  const [cardTransform, setCardTransform] = createSignal("translate(0px, 0px) rotate(0deg)");
  const [cardOpacity, setCardOpacity] = createSignal(1);
  const [cardBackground, setCardBackground] = createSignal("");
  const [cardBorder, setCardBorder] = createSignal("");
  const [swipeDirection, setSwipeDirection] = createSignal<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = createSignal(false);
  const [showFeedback, setShowFeedback] = createSignal(false);
  const [feedbackMessage, setFeedbackMessage] = createSignal("");

  let cardRef: HTMLDivElement | undefined;
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  const selectedSession = () => trackerViewModel.selectedTrackerSession();
  const currentRoll = () => (selectedSession()?.rolls.length || 0) + 1;
  const totalRolls = () => selectedSession()?.rolls.length || 0;
  const successCount = () => selectedSession()?.rolls.filter(roll => roll === 1).length || 0;
  const successRate = () => totalRolls() > 0 ? ((successCount() / totalRolls()) * 100).toFixed(1) : "0.0";

  const handleStart = (clientX: number, clientY: number) => {
    if (isAnimating()) return;
    startX = clientX;
    startY = clientY;
    isDragging = true;
    setSwipeDirection(null);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || isAnimating()) return;
    
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    const rotation = deltaX * 0.1;
    
    setCardTransform(`translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`);
    
    // Calculate color intensity based on swipe distance
    const maxSwipe = 150;
    const intensity = Math.min(Math.abs(deltaX) / maxSwipe, 1);
    
    if (deltaX > 20) {
      // Swiping right - success tint
      const borderWidth = Math.min(intensity * 4, 4);
      setCardBackground("hsl(var(--su) / 0.1)");
      setCardBorder(`${borderWidth}px solid hsl(var(--su))`);
      setSwipeDirection(deltaX > 50 ? "right" : null);
    } else if (deltaX < -20) {
      // Swiping left - error tint
      const borderWidth = Math.min(intensity * 4, 4);
      setCardBackground("hsl(var(--er) / 0.1)");
      setCardBorder(`${borderWidth}px solid hsl(var(--er))`);
      setSwipeDirection(deltaX < -50 ? "left" : null);
    } else {
      // Neutral position
      setCardBackground("");
      setCardBorder("");
      setSwipeDirection(null);
    }
  };

  const handleEnd = (clientX: number) => {
    if (!isDragging || isAnimating()) return;
    isDragging = false;
    
    const deltaX = clientX - startX;
    const threshold = 100;
    
    if (Math.abs(deltaX) > threshold) {
      handleSwipe(deltaX > 0 ? "right" : "left");
    } else {
      resetCard();
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating()) return;
    setIsAnimating(true);
    
    const isSuccess = direction === "right";
    const translateX = direction === "right" ? "100vw" : "-100vw";
    const rotation = direction === "right" ? "30deg" : "-30deg";
    
    setCardTransform(`translate(${translateX}, -100px) rotate(${rotation})`);
    setCardOpacity(0);
    
    addRoll(isSuccess ? 1 : 0);
    
    setFeedbackMessage(isSuccess ? `HIT! Roll #${currentRoll() - 1}` : `MISS! Roll #${currentRoll() - 1}`);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      resetCard();
      setIsAnimating(false);
    }, 1500);
  };

  const resetCard = () => {
    setCardTransform("translate(0px, 0px) rotate(0deg)");
    setCardOpacity(1);
    setCardBackground("");
    setCardBorder("");
    setSwipeDirection(null);
  };

  const addRoll = (result: 0 | 1) => {
    const currentSession = selectedSession();
    if (!currentSession) return;
    
    const updatedSession = {
      ...currentSession,
      rolls: [...currentSession.rolls, result]
    };
    
    trackerViewModel.setSelectedTrackerSession(updatedSession);
    trackerViewModel.updateTrackerSession(updatedSession);
  };

  onMount(() => {
    const card = cardRef;
    if (!card) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      handleEnd(touch.clientX);
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      handleEnd(e.clientX);
    };

    card.addEventListener("touchstart", handleTouchStart, { passive: false });
    card.addEventListener("touchmove", handleTouchMove, { passive: false });
    card.addEventListener("touchend", handleTouchEnd, { passive: false });
    card.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    onCleanup(() => {
      card.removeEventListener("touchstart", handleTouchStart);
      card.removeEventListener("touchmove", handleTouchMove);
      card.removeEventListener("touchend", handleTouchEnd);
      card.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    });
  });

  if (!selectedSession()) {
    return (
      <div class="flex items-center justify-center h-64">
        <p class="text-lg text-base-content opacity-60">No tracker session selected</p>
      </div>
    );
  }

  return (
    <div class="relative w-full max-w-md mx-auto h-[calc(100vh-12rem)] flex flex-col overflow-hidden pb-24">
      {/* Roll Counter */}
      <div class="text-center py-2">
        <h2 class="text-xl font-bold">Roll #{currentRoll()}</h2>
      </div>

      {/* Card Stack Container - takes remaining space */}
      <div class="relative flex-1 flex items-center justify-center p-2 min-h-0">
        {/* Background Cards */}
        <div class="absolute inset-4 bg-base-200 rounded-2xl shadow-lg transform scale-95 -z-10"></div>
        <div class="absolute inset-4 bg-base-300 rounded-2xl shadow-md transform scale-90 -z-20"></div>

        {/* Main Card */}
        <div
          ref={cardRef}
          class="relative w-full h-80 bg-base-100 rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing transition-all duration-300 ease-out select-none"
          style={{
            transform: cardTransform(),
            opacity: cardOpacity(),
            background: cardBackground() || undefined,
            border: cardBorder() || undefined,
          }}
        >
          <div class="p-6 h-full flex flex-col justify-between">
            {/* Header */}
            <div class="text-center">
              <div class="flex items-center justify-center gap-2 mb-4">
                <Target class="w-6 h-6 text-primary" />
                <h3 class="text-xl font-bold">TRACKING THIS COMBO</h3>
                <Target class="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Weapon and Skills */}
            <div class="text-center space-y-4">
              <div class="flex items-center justify-center gap-3">
                <img 
                  src={getWeaponIcons(selectedSession()!.selectedWeapon)} 
                  alt={selectedSession()!.selectedWeapon}
                  class="w-12 h-12"
                />
                <h4 class="text-lg font-semibold">{selectedSession()!.selectedWeaponDisplayName}</h4>
              </div>
              
              <div class="space-y-2">
                <div class="flex items-center justify-center gap-2 text-secondary font-medium">
                  <Sparkles class="w-5 h-5" />
                  <span>{selectedSession()!.targetSkills.setBonusSkill?.skill_display_name}</span>
                </div>
                <div class="flex items-center justify-center gap-2 text-accent font-medium">
                  <Flame class="w-5 h-5" />
                  <span>{selectedSession()!.targetSkills.groupSkills?.skill_display_name}</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div class="text-center space-y-2">
              <p class="text-lg font-semibold">Did you get BOTH skills?</p>
              <div class="flex items-center justify-center gap-2 text-sm text-base-content opacity-60">
                <X class="w-4 h-4" />
                <span>Swipe LEFT for NO</span>
              </div>
              <div class="flex items-center justify-center gap-2 text-sm text-base-content opacity-60">
                <Check class="w-4 h-4" />
                <span>Swipe RIGHT for YES</span>
              </div>
            </div>

            {/* Swipe Indicators */}
            {swipeDirection() === "left" && (
              <div class="absolute inset-0 flex items-center justify-center bg-error bg-opacity-20 rounded-2xl">
                <X class="w-24 h-24 text-error" />
              </div>
            )}
            {swipeDirection() === "right" && (
              <div class="absolute inset-0 flex items-center justify-center bg-success bg-opacity-20 rounded-2xl">
                <Check class="w-24 h-24 text-success" />
              </div>
            )}
          </div>
        </div>

        {/* Feedback Overlay */}
        {showFeedback() && (
          <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl z-20 animate-in fade-in duration-300">
            <div class="bg-base-100 p-6 rounded-xl text-center animate-in zoom-in-95 duration-300 delay-100">
              <p class="text-2xl font-bold mb-2">{feedbackMessage()}</p>
              <p class="text-lg">Total: {successCount()}/{totalRolls()} ({successRate()}%)</p>
            </div>
          </div>
        )}
      </div>

      {/* Fallback Buttons */}
      <div class="flex gap-2 p-2">
        <button
          onClick={() => handleSwipe("left")}
          disabled={isAnimating()}
          class="flex-1 btn btn-error font-bold py-3 px-4 rounded-xl flex flex-col items-center gap-1"
        >
          <X class="w-5 h-5" />
          <div>
            <div class="text-sm">MISS</div>
            <div class="text-xs">Swipe ← / Tap</div>
          </div>
        </button>
        <button
          onClick={() => handleSwipe("right")}
          disabled={isAnimating()}
          class="flex-1 btn btn-success font-bold py-3 px-4 rounded-xl flex flex-col items-center gap-1"
        >
          <Check class="w-5 h-5" />
          <div>
            <div class="text-sm">HIT</div>
            <div class="text-xs">Swipe → / Tap</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SwipeTracker;