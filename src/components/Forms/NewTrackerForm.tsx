import {type Component, For, createSignal} from "solid-js";
import {useTrackerViewModel} from "../../context/TrackerContext.tsx";
import type {TrackerSession} from "../../interfaces/SessionInterfaces.ts";

const NewTrackerForm: Component = () => {
  const trackerViewModel = useTrackerViewModel();
  const [selectedWeapon, setSelectedWeapon] = createSignal<string>("");
  const [selectedGroupSkill, setSelectedGroupSkill] = createSignal<string>("");
  const [selectedSetBonusSkill, setSelectedSetBonusSkill] = createSignal<string>("");

  const isWeaponAlreadySelected = (weaponName: string): boolean => {
    return trackerViewModel.trackerSessions().some(session => session.selectedWeapon === weaponName);
  };

  const handleCreateTracker = () => {
    const weaponValue = selectedWeapon();
    const groupSkillValue = selectedGroupSkill();
    const setBonusSkillValue = selectedSetBonusSkill();
    
    if (weaponValue && !isWeaponAlreadySelected(weaponValue)) {
      const weaponData = trackerViewModel.weapons()?.find(weapon => weapon.weapon_name === weaponValue);
      const selectedWeaponDisplayName = weaponData?.weapon_display_name || "";
      
      const groupSkillData = trackerViewModel.groupSkills()?.find(skill => skill.skill_name === groupSkillValue);
      const setBonusSkillData = trackerViewModel.setBonusSkills()?.find(skill => skill.skill_name === setBonusSkillValue);
      
      const newSession: TrackerSession = {
        selectedWeapon: weaponValue,
        selectedWeaponDisplayName,
        targetSkills: {
          setBonusSkill: setBonusSkillData,
          groupSkills: groupSkillData
        },
        rolls: []
      };
      
      trackerViewModel.addTrackerSession(newSession);
      
      setSelectedWeapon("");
      setSelectedGroupSkill("");
      setSelectedSetBonusSkill("");
    }
  };

  return (
    <div class="w-full max-w-7xl mx-auto p-4">
      {/* Desktop Layout */}
      <div class="hidden lg:flex gap-4 items-end">
        <fieldset class="fieldset flex-1">
          <legend class="fieldset-legend">Select a weapon</legend>
          <select 
            class="select select-bordered w-full" 
            value={selectedWeapon()}
            onChange={(e) => setSelectedWeapon(e.target.value)}
          >
            <option disabled value="">Select a weapon</option>
            <For each={trackerViewModel.weapons()}>
              {(weapon) => (
                <option
                  value={weapon.weapon_name}
                  disabled={isWeaponAlreadySelected(weapon.weapon_name)}
                >
                  {weapon.weapon_display_name}
                </option>
              )}
            </For>
          </select>
        </fieldset>

        <fieldset class="fieldset flex-1">
          <legend class="fieldset-legend">Select a Set Bonus Skill</legend>
          <select
            class="select select-bordered w-full"
            value={selectedSetBonusSkill()}
            onChange={(e) => setSelectedSetBonusSkill(e.target.value)}
          >
            <option disabled value="">Select a set bonus skill</option>
            <For each={trackerViewModel.setBonusSkills()}>
              {(skill) => (
                <option value={skill.skill_name}>
                  {skill.skill_display_name}
                </option>
              )}
            </For>
          </select>
        </fieldset>

        <fieldset class="fieldset flex-1">
          <legend class="fieldset-legend">Select a Group Skill</legend>
          <select 
            class="select select-bordered w-full"
            value={selectedGroupSkill()}
            onChange={(e) => setSelectedGroupSkill(e.target.value)}
          >
            <option disabled value="">Select a group skill</option>
            <For each={trackerViewModel.groupSkills()}>
              {(skill) => (
                <option value={skill.skill_name}>
                  {skill.skill_display_name}
                </option>
              )}
            </For>
          </select>
        </fieldset>

        <button 
          class="btn btn-primary px-8 py-3 whitespace-nowrap"
          onClick={handleCreateTracker}
          disabled={!selectedWeapon() || !selectedGroupSkill() || !selectedSetBonusSkill()}
        >
          Create Tracker
        </button>
      </div>

      {/* Tablet Layout */}
      <div class="hidden md:block lg:hidden">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Select a weapon</legend>
            <select 
              class="select select-bordered w-full" 
              value={selectedWeapon()}
              onChange={(e) => setSelectedWeapon(e.target.value)}
            >
              <option disabled value="">Select a weapon</option>
              <For each={trackerViewModel.weapons()}>
                {(weapon) => (
                  <option
                    value={weapon.weapon_name}
                    disabled={isWeaponAlreadySelected(weapon.weapon_name)}
                  >
                    {weapon.weapon_display_name}
                  </option>
                )}
              </For>
            </select>
          </fieldset>

          <fieldset class="fieldset">
            <legend class="fieldset-legend">Set Bonus Skill</legend>
            <select
              class="select select-bordered w-full"
              value={selectedSetBonusSkill()}
              onChange={(e) => setSelectedSetBonusSkill(e.target.value)}
            >
              <option disabled value="">Select set bonus</option>
              <For each={trackerViewModel.setBonusSkills()}>
                {(skill) => (
                  <option value={skill.skill_name}>
                    {skill.skill_display_name}
                  </option>
                )}
              </For>
            </select>
          </fieldset>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Group Skill</legend>
            <select 
              class="select select-bordered w-full"
              value={selectedGroupSkill()}
              onChange={(e) => setSelectedGroupSkill(e.target.value)}
            >
              <option disabled value="">Select group skill</option>
              <For each={trackerViewModel.groupSkills()}>
                {(skill) => (
                  <option value={skill.skill_name}>
                    {skill.skill_display_name}
                  </option>
                )}
              </For>
            </select>
          </fieldset>

          <div class="flex items-end">
            <button 
              class="btn btn-primary w-full"
              onClick={handleCreateTracker}
              disabled={!selectedWeapon() || !selectedGroupSkill() || !selectedSetBonusSkill()}
            >
              Create Tracker
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div class="block md:hidden space-y-4">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Select a weapon</legend>
          <select 
            class="select select-bordered w-full" 
            value={selectedWeapon()}
            onChange={(e) => setSelectedWeapon(e.target.value)}
          >
            <option disabled value="">Select a weapon</option>
            <For each={trackerViewModel.weapons()}>
              {(weapon) => (
                <option
                  value={weapon.weapon_name}
                  disabled={isWeaponAlreadySelected(weapon.weapon_name)}
                >
                  {weapon.weapon_display_name}
                </option>
              )}
            </For>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Select a Set Bonus Skill</legend>
          <select
            class="select select-bordered w-full"
            value={selectedSetBonusSkill()}
            onChange={(e) => setSelectedSetBonusSkill(e.target.value)}
          >
            <option disabled value="">Select a set bonus skill</option>
            <For each={trackerViewModel.setBonusSkills()}>
              {(skill) => (
                <option value={skill.skill_name}>
                  {skill.skill_display_name}
                </option>
              )}
            </For>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Select a Group Skill</legend>
          <select 
            class="select select-bordered w-full"
            value={selectedGroupSkill()}
            onChange={(e) => setSelectedGroupSkill(e.target.value)}
          >
            <option disabled value="">Select a group skill</option>
            <For each={trackerViewModel.groupSkills()}>
              {(skill) => (
                <option value={skill.skill_name}>
                  {skill.skill_display_name}
                </option>
              )}
            </For>
          </select>
        </fieldset>

        <button 
          class="btn btn-primary w-full py-4"
          onClick={handleCreateTracker}
          disabled={!selectedWeapon() || !selectedGroupSkill() || !selectedSetBonusSkill()}
        >
          Create Tracker
        </button>
      </div>
    </div>
  )
}

export default NewTrackerForm