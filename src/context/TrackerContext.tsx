import { createContext, useContext, type Component, type JSXElement, createSignal, type Accessor } from "solid-js"
import { makePersisted } from "@solid-primitives/storage"
import type {WeaponData, WeaponDetails} from "../interfaces/WeaponsInterfaces"
import type {ArmorSkillDetails, SetBonusSkillsData, GroupSkillsData} from "../interfaces/ArmorSkillsInterfaces.ts";
import { weaponsData } from "../data/weapons.ts"
import { setBonusSkillsData } from "../data/setBonusSkills.ts"
import { groupSkillsData } from "../data/groupSkills.ts"
import type {TrackerSession} from "../interfaces/SessionInterfaces.ts";

interface TrackerContextModel {
  weapons: Accessor<WeaponDetails[]>,
  setBonusSkills: Accessor<ArmorSkillDetails[]>
  groupSkills: Accessor<ArmorSkillDetails[]>
  trackerSessions: () => TrackerSession[]
  addTrackerSession: (session: TrackerSession) => void
  updateTrackerSession: (updatedSession: TrackerSession) => void
  deleteTrackerSession: (session: TrackerSession) => void
  selectedTrackerSession: () => TrackerSession | undefined
  setSelectedTrackerSession: (session: TrackerSession) => void
  clearAllData: () => void
}

const TrackerContext = createContext<TrackerContextModel>()

const weapons = (): WeaponDetails[] => (weaponsData as WeaponData).weapons
const setBonusSkills = (): ArmorSkillDetails[] => (setBonusSkillsData as SetBonusSkillsData).set_bonus_skills
const groupSkills = (): ArmorSkillDetails[] => (groupSkillsData as GroupSkillsData).group_skills

export const TrackerProvider: Component<{ children: JSXElement | JSXElement[] }> = (props) => {
  const [trackerSessions, setTrackerSessions] = makePersisted(createSignal<TrackerSession[]>([]), {
    name: 'trackerSessions'
  })
  
  const [selectedTrackerSession, setSelectedTrackerSession] = makePersisted(createSignal<TrackerSession | undefined>(undefined), {
    name: 'selectedTrackerSession'
  })

  const addTrackerSession = (session: TrackerSession) => {
    setTrackerSessions([...trackerSessions(), session])
    console.log(`Debugging tracker session: ${JSON.stringify(session)}`)
  }

  const updateTrackerSession = (updatedSession: TrackerSession) => {
    const sessions = trackerSessions()
    const sessionIndex = sessions.findIndex(s => 
      s.selectedWeapon === updatedSession.selectedWeapon &&
      s.targetSkills.setBonusSkill?.skill_name === updatedSession.targetSkills.setBonusSkill?.skill_name &&
      s.targetSkills.groupSkills?.skill_name === updatedSession.targetSkills.groupSkills?.skill_name
    )
    
    if (sessionIndex !== -1) {
      const updatedSessions = [...sessions]
      updatedSessions[sessionIndex] = updatedSession
      setTrackerSessions(updatedSessions)
      console.log(`Updated tracker session: ${JSON.stringify(updatedSession)}`)
    }
  }

  const deleteTrackerSession = (sessionToDelete: TrackerSession) => {
    const sessions = trackerSessions()
    const filteredSessions = sessions.filter(s => 
      !(s.selectedWeapon === sessionToDelete.selectedWeapon &&
        s.targetSkills.setBonusSkill?.skill_name === sessionToDelete.targetSkills.setBonusSkill?.skill_name &&
        s.targetSkills.groupSkills?.skill_name === sessionToDelete.targetSkills.groupSkills?.skill_name)
    )
    
    setTrackerSessions(filteredSessions)
    
    // If the deleted session was the selected one, clear the selection
    const currentSelected = selectedTrackerSession()
    if (currentSelected && 
        currentSelected.selectedWeapon === sessionToDelete.selectedWeapon &&
        currentSelected.targetSkills.setBonusSkill?.skill_name === sessionToDelete.targetSkills.setBonusSkill?.skill_name &&
        currentSelected.targetSkills.groupSkills?.skill_name === sessionToDelete.targetSkills.groupSkills?.skill_name) {
      setSelectedTrackerSession(undefined)
    }
    
    console.log(`Deleted tracker session: ${sessionToDelete.selectedWeaponDisplayName}`)
  }

  const clearAllData = () => {
    setTrackerSessions([])
    setSelectedTrackerSession(undefined)
    console.log('All data cleared from localStorage')
  }

  const contextValue: TrackerContextModel = {
    weapons,
    setBonusSkills,
    groupSkills,
    trackerSessions,
    addTrackerSession,
    updateTrackerSession,
    deleteTrackerSession,
    selectedTrackerSession,
    setSelectedTrackerSession,
    clearAllData
  }

  return (
    <TrackerContext.Provider value={contextValue}>
      {props.children}
    </TrackerContext.Provider>
  )
}

export const useTrackerViewModel = () => {
  const context = useContext(TrackerContext)
  if (context === undefined) {
    throw new Error("useTrackerViewModel must be used within a TrackerProvider")
  }
  return context
}