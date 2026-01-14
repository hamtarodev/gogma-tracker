import type {Component} from "solid-js";
import {createSignal} from "solid-js";
import type {TrackerSession} from "../../interfaces/SessionInterfaces.ts";
import {getWeaponIcons} from "../../utils/WeaponImageUtil.ts";
import {useNavigate} from "@solidjs/router";
import {Scaling, Trash2} from "../../utils/icons.ts";
import {useTrackerViewModel} from "../../context/TrackerContext.tsx";
import ConfirmModal from "../Modals/ConfirmModal.tsx";

type SessionCardProps = TrackerSession

const SessionCard: Component<SessionCardProps> = (props) => {
  const navigate = useNavigate()
  const trackerViewModel = useTrackerViewModel()
  const [showDeleteModal, setShowDeleteModal] = createSignal(false)

  const handleTrackClick = () => {
    trackerViewModel.setSelectedTrackerSession(props)
    navigate("/track", { replace: true })
  }

  const handleDeleteClick = (e: Event) => {
    e.stopPropagation() // Prevent any parent click events
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    trackerViewModel.deleteTrackerSession(props)
    setShowDeleteModal(false)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
  }

  return (
    <>
      <div class="card bg-base-100 shadow-sm w-full card-side lg:flex-col">
        <figure class="w-20 lg:w-full">
          <img 
            src={getWeaponIcons(props.selectedWeapon)} 
            alt={props.selectedWeapon}
            class="w-full h-full lg:h-32 object-contain p-2 lg:p-4"
          />
        </figure>
        <div class="card-body py-3 px-3 lg:p-6">
          <h2 class="card-title text-sm lg:text-lg">{props.selectedWeaponDisplayName}</h2>
          <div class="space-y-1">
            <p class="text-xs lg:text-sm">
              <span class="text-gray-600">Set Bonus:</span> 
              <span class="font-semibold ml-1">{props.targetSkills.setBonusSkill?.skill_display_name}</span>
            </p>
            <p class="text-xs lg:text-sm">
              <span class="text-gray-600">Group Skill:</span> 
              <span class="font-semibold ml-1">{props.targetSkills.groupSkills?.skill_display_name}</span>
            </p>
            <p class="text-xs lg:text-sm">
              <span class="text-gray-600">Rolls:</span> 
              <span class="font-semibold ml-1">{props.rolls.length}</span>
            </p>
          </div>
          <div class="card-actions justify-between mt-2">
            <button
              onClick={handleDeleteClick}
              class="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content"
              title="Delete session"
            >
              <Trash2 class="w-4 h-4" />
            </button>
            <button
              onClick={handleTrackClick}
              class="btn btn-primary btn-sm lg:btn-md">
              Track
              <Scaling class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal()}
        title="Delete Tracker Session"
        message={
          <>
            <p>
              Are you sure you want to delete the tracker for <strong>{props.selectedWeaponDisplayName}</strong>?
            </p>
            <p class="text-sm text-base-content opacity-60 mt-2">
              This will permanently delete all {props.rolls.length} roll{props.rolls.length !== 1 ? 's' : ''} data. This action cannot be undone.
            </p>
          </>
        }
        confirmText="Delete"
        icon={<Trash2 class="w-4 h-4" />}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  )
}

export default SessionCard