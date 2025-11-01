import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

function Portal({ children, containerId = "portal-root" }) {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    let portalContainer = document.getElementById(containerId);

    if (!portalContainer) {
      portalContainer = document.createElement("div");
      portalContainer.id = containerId;
      document.body.appendChild(portalContainer);
    }

    setContainer(portalContainer);

    return () => {
      if (portalContainer && portalContainer.childNodes.length === 0) {
        portalContainer.remove();
      }
    };
  }, [containerId]);

  return container ? createPortal(children, container) : null;
}

export default Portal;
