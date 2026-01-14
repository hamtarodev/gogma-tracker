import type { Component } from "solid-js";
import { Trash2 } from "../../utils/icons.ts";
import { useTrackerViewModel } from "../../context/TrackerContext.tsx";

const Header: Component = () => {
  const trackerViewModel = useTrackerViewModel();

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      trackerViewModel.clearAllData();
    }
  };

  return (
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl">Gogma Artian Tracker</a>
      </div>
      <div class="navbar-end">
        <button 
          onClick={handleClearData}
          class="btn btn-ghost btn-sm text-error"
          title="Clear all data"
        >
          <Trash2 class="w-4 h-4" />
          Clear Data
        </button>
      </div>
    </div>
  )
}

export default Header