import type { Component, JSXElement } from "solid-js";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string | JSXElement;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  icon?: JSXElement;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: Component<ConfirmModalProps> = (props) => {
  return (
    <div class={`modal ${props.isOpen ? 'modal-open' : ''}`}>
      <div class="modal-box">
        <h3 class="font-bold text-lg">{props.title}</h3>
        <div class="py-4">
          {props.message}
        </div>
        <div class="modal-action">
          <button 
            onClick={props.onCancel}
            class="btn btn-ghost"
          >
            {props.cancelText || 'Cancel'}
          </button>
          <button 
            onClick={props.onConfirm}
            class={props.confirmButtonClass || 'btn btn-error'}
          >
            {props.icon}
            {props.confirmText || 'Confirm'}
          </button>
        </div>
      </div>
      <div class="modal-backdrop" onClick={props.onCancel}></div>
    </div>
  );
};

export default ConfirmModal;