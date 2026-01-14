import type { Component } from "solid-js";
import { useTrackerViewModel } from "../../context/TrackerContext.tsx";
import { ChartLine, Check, X } from "../../utils/icons.ts";

const TrackerStatsFooter: Component = () => {
  const trackerViewModel = useTrackerViewModel();
  
  const selectedSession = () => trackerViewModel.selectedTrackerSession();
  const totalRolls = () => selectedSession()?.rolls.length || 0;
  const successCount = () => selectedSession()?.rolls.filter(roll => roll === 1).length || 0;
  const successRate = () => totalRolls() > 0 ? ((successCount() / totalRolls()) * 100).toFixed(1) : "0.0";
  const recentRolls = () => selectedSession()?.rolls.slice(-10) || [];

  if (!selectedSession()) {
    return null;
  }

  return (
    <footer class="fixed bottom-0 left-0 right-0 bg-base-200 border-t border-base-300 p-3 z-50">
      <div class="max-w-md mx-auto text-center space-y-2">
        <div class="flex items-center justify-center gap-2 font-semibold">
          <ChartLine class="w-5 h-5 text-primary" />
          <span>{totalRolls()} rolls | {successCount()} hits ({successRate()}%)</span>
        </div>
        <div class="flex justify-center gap-1">
          <span class="text-sm text-base-content opacity-60">Recent: </span>
          {recentRolls().map((roll) => (
            <span class={roll === 1 ? "text-success" : "text-error"}>
              {roll === 1 ? <Check class="w-4 h-4" /> : <X class="w-4 h-4" />}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default TrackerStatsFooter;