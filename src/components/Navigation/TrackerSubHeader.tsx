import type {Component} from "solid-js";
import {ArrowLeft} from "../../utils/icons.ts";
import {useNavigate} from "@solidjs/router";
import {useTrackerViewModel} from "../../context/TrackerContext.tsx";
import {getWeaponIcons} from "../../utils/WeaponImageUtil.ts";

const TrackerSubHeader: Component = () => {
  const navigate = useNavigate();
  const trackerViewModel = useTrackerViewModel();
  const selectedSession = trackerViewModel.selectedTrackerSession();

  return (
    <div class="flex items-center justify-between w-full">
      <button
        onClick={() => navigate("/", { replace: true })}
        class="btn btn-ghost">
        <ArrowLeft/>
        Back
      </button>
      
      {selectedSession && (
        <div class="flex items-center gap-2">
          <img 
            src={getWeaponIcons(selectedSession.selectedWeapon)} 
            alt={selectedSession.selectedWeapon}
            class="w-8 h-8"
          />
          <h2 class="text-lg font-semibold">{selectedSession.selectedWeaponDisplayName}</h2>
        </div>
      )}
    </div>
  )
};

export default TrackerSubHeader;