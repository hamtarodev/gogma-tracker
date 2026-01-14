import { createContext, useContext, createResource, type Component, type JSXElement, type Resource, createSignal } from "solid-js"
import { makePersisted } from "@solid-primitives/storage"
import type {WeaponData, WeaponDetails} from "../interfaces/WeaponsInterfaces"
import type {ArmorSkillDetails, SetBonusSkillsData, GroupSkillsData} from "../interfaces/ArmorSkillsInterfaces.ts";
import weaponsData from "../data/weapons.json"
import setBonusSkillsData from "../data/set_bonus_skills.json"
import groupSkillsData from "../data/group_skills.json"
import type {TrackerSession} from "../interfaces/SessionInterfaces.ts";

interface TrackerContextModel {
  weapons: Resource<WeaponDetails[]>,
  setBonusSkills: Resource<ArmorSkillDetails[]>
  groupSkills: Resource<ArmorSkillDetails[]>
  trackerSessions: () => TrackerSession[]
  addTrackerSession: (session: TrackerSession) => void
  updateTrackerSession: (updatedSession: TrackerSession) => void
  selectedTrackerSession: () => TrackerSession | undefined
  setSelectedTrackerSession: (session: TrackerSession) => void
  clearAllData: () => void
}

const TrackerContext = createContext<TrackerContextModel>()

const loadWeapons = (): WeaponDetails[] => {
  return (weaponsData as WeaponData).weapons
}

const loadSetBonusSkills = (): ArmorSkillDetails[] => {
  return (setBonusSkillsData as SetBonusSkillsData).set_bonus_skills
}

const loadGroupSkills = (): ArmorSkillDetails[] => {
  return (groupSkillsData as GroupSkillsData).group_skills
}

export const TrackerProvider: Component<{ children: JSXElement | JSXElement[] }> = (props) => {
  const [weapons] = createResource(loadWeapons)
  const [setBonusSkills] = createResource(loadSetBonusSkills)
  const [groupSkills] = createResource(loadGroupSkills)
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