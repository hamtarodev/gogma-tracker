import type {ArmorSkillDetails} from "./ArmorSkillsInterfaces.ts";

export interface TrackerSession {
  selectedWeapon: string
  selectedWeaponDisplayName: string
  targetSkills: TargetSkills
  rolls: number[]
}

interface TargetSkills {
  setBonusSkill: ArmorSkillDetails | undefined
  groupSkills: ArmorSkillDetails | undefined
}

