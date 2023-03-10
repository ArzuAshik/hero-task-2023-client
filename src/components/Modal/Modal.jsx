import { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const KEY_NAME_ESC = "Escape";
const KEY_EVENT_TYPE = "keyup";

const OVERLAY_STYLES = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, .7)",
  zIndex: 999999,
};

const MODAL_BODY_STYLES = {
  position: "fixed",
  zIndex: 999999,
  background: "white",
  borderRadius: 8,
  boxShadow: "3px 3px 5px gray",
  margin: "auto",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  padding: 16
};

export default function Modal({ children, open, onClose }) {
  const modalRef = useRef(null);
  const handleEscKey = useCallback(
    (event) => {
      if (event.key === KEY_NAME_ESC) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (modalRef.current) {
      document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    }
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);

  document.getElementById("root").style.height = "auto";
  document.getElementById("root").style.overflow = "auto";

  if (!open) return null;

  document.getElementById("root").style.height = "100vh";
  document.getElementById("root").style.overflow = "hidden";

  return ReactDOM.createPortal(
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        zIndex: 999999,
        inset: 0,
      }}
      ref={modalRef}
    >
      <div onClick={onClose} style={OVERLAY_STYLES} />
      <div
        style={MODAL_BODY_STYLES}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}
