export interface GroupSkillsData {
  group_skills: ArmorSkillDetails[]
}

export interface SetBonusSkillsData {
  set_bonus_skills: ArmorSkillDetails[]
}

export interface ArmorSkillDetails {
  skill_display_name: string
  skill_name: string
}