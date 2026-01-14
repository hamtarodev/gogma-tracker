import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { Trash2 } from "../../utils/icons.ts";
import { useTrackerViewModel } from "../../context/TrackerContext.tsx";
import ConfirmModal from "../Modals/ConfirmModal.tsx";

const Header: Component = () => {
  const trackerViewModel = useTrackerViewModel();
  const [showClearModal, setShowClearModal] = createSignal(false);

  const handleClearData = () => {
    setShowClearModal(true);
  };

  const confirmClearData = () => {
    trackerViewModel.clearAllData();
    setShowClearModal(false);
  };

  const cancelClearData = () => {
    setShowClearModal(false);
  };

  return (
    <>
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

      <ConfirmModal
        isOpen={showClearModal()}
        title="Clear All Data"
        message={
          <>
            <p>
              Are you sure you want to clear <strong>all tracker data</strong>?
            </p>
            <p class="text-sm text-base-content opacity-60 mt-2">
              This will permanently delete all tracker sessions, rolls, and selected sessions from your browser's storage. This action cannot be undone.
            </p>
          </>
        }
        confirmText="Clear All Data"
        confirmButtonClass="btn btn-error"
        icon={<Trash2 class="w-4 h-4" />}
        onConfirm={confirmClearData}
        onCancel={cancelClearData}
      />
    </>
  )
}

export default Header