import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

import Backdrop from "./Backdrop";

const SideDrawer = (props) => {
  const nodeRef = useRef(null);

  const content = (
    <>
      {props.show && <Backdrop onClick={props.onClick} />}
      <CSSTransition
        in={props.show}
        timeout={200}
        // nodeRef={nodeRef}
        classNames="slide-in-right"
        mountOnEnter
        unmountOnExit
      >
        <aside className="side-drawer" onClick={props.onClick}>
          {props.children}
        </aside>

        {/* {drawer} */}
      </CSSTransition>
    </>
  );

  return content;
  //   return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
