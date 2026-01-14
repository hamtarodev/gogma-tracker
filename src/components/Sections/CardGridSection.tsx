import type {Component} from "solid-js";
import {For} from "solid-js";
import {useTrackerViewModel} from "../../context/TrackerContext.tsx";
import SessionCard from "../Cards/SessionCard.tsx";

const CardGridSection: Component = () => {
  const trackerViewModel = useTrackerViewModel();

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-6">
      <For each={trackerViewModel.trackerSessions()}>
        {(session) => (
          <SessionCard
            selectedWeapon={session.selectedWeapon}
            selectedWeaponDisplayName={session.selectedWeaponDisplayName}
            rolls={session.rolls}
            targetSkills={session.targetSkills}
          />
        )}
      </For>
    </div>
  )
}

export default CardGridSection