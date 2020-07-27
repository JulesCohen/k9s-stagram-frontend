import React from "react";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  // const nodeRef = useRef(null);
  const content = (
    <>
      {props.show && <Backdrop onClick={props.onClick} />}
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="slide-in-right"
        mountOnEnter
        unmountOnExit
        // nodeRef={nodeRef}
      >
        <aside className="side-drawer">{props.children}</aside>
      </CSSTransition>
    </>
  );

  return content;
};

export default SideDrawer;
