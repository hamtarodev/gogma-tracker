import {type Component, For, createSignal} from "solid-js";
import {useTrackerViewModel} from "../../context/TrackerContext.tsx";
import type {TrackerSession} from "../../interfaces/SessionInterfaces.ts";
import {Plus, X} from "../../utils/icons.ts";

const NewTrackerForm: Component = () => {
  const trackerViewModel = useTrackerViewModel();
  const [selectedWeapon, setSelectedWeapon] = createSignal<string>("");
  const [selectedGroupSkill, setSelectedGroupSkill] = createSignal<string>("");
  const [selectedSetBonusSkill, setSelectedSetBonusSkill] = createSignal<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = createSignal(false);

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

      {/* Mobile Layout - Drawer Toggle Button */}
      <div class="block md:hidden">
        <button
          class="btn btn-primary w-full gap-2"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Plus class="w-5 h-5" />
          New Tracker
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        class={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isDrawerOpen() ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          class="absolute inset-0 bg-black/50"
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          class={`absolute bottom-0 left-0 right-0 bg-base-100 rounded-t-2xl p-4 space-y-4 transform transition-transform duration-300 ${isDrawerOpen() ? 'translate-y-0' : 'translate-y-full'}`}
        >
          {/* Drawer Header */}
          <div class="flex items-center justify-between pb-2 border-b border-base-300">
            <h3 class="text-lg font-bold">Create New Tracker</h3>
            <button
              class="btn btn-ghost btn-sm btn-circle"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X class="w-5 h-5" />
            </button>
          </div>

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
            onClick={() => {
              handleCreateTracker();
              setIsDrawerOpen(false);
            }}
            disabled={!selectedWeapon() || !selectedGroupSkill() || !selectedSetBonusSkill()}
          >
            Create Tracker
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewTrackerForm