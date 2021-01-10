import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import "./style.scss";

const isMobile = () => {
  const ua = navigator.userAgent;
  return /Android|Mobi/i.test(ua);
};

const Cursor = () => {
  //   const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [navLinkHovered, setNavLinkHovered] = useState(false);
  const [cvBtnHovered, setCvBtnHovered] = useState(false);

  useEffect(() => {
    addEventListeners();
    handleHoverEvents();
    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseenter", onMouseEnter);
    document.removeEventListener("mouseleave", onMouseLeave);
  };

  const handleHoverEvents = () => {
    // Nav Link
    const NavLink = document.querySelector(".nav__projects");
    NavLink.addEventListener("mouseover", () => setNavLinkHovered(true));
    NavLink.addEventListener("mouseout", () => setNavLinkHovered(false));
    // CV Button
    const cvBtn = document.querySelector(".cv-button");
    cvBtn.addEventListener("mouseover", () => setCvBtnHovered(true));
    cvBtn.addEventListener("mouseout", () => setCvBtnHovered(false));
  };

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const onMouseMove = ({ clientX: x, clientY: y }) => {
    setCircle({ xy: [x, y] });
    setDot({ xy: [x, y] });
  };

  const [circle, setCircle] = useSpring(() => ({
    xy: [-50, -50],
    config: { mass: 3, tension: 550, friction: 100 },
  }));
  const [dot, setDot] = useSpring(() => ({
    xy: [-50, -50],
    config: { mass: 1, tension: 1250, friction: 70 },
  }));

  // Check if mobile/touch device
  if (typeof navigator !== "undefined" && isMobile()) return null;

  return (
    <>
      <animated.div
        className={`cursor ${hidden && "cursor--hidden"}  ${
          navLinkHovered && "cursor--large"
        } ${cvBtnHovered && "cursor--hidden"}`}
        style={{
          transform: circle.xy.interpolate(
            (x, y) => `translate3d(${x - 33.5}px,${y - 23}px,0)`
          ),
        }}></animated.div>
      <animated.div
        className={`dot ${hidden && "dot--hidden"} ${
          navLinkHovered && "dot--hidden"
        }`}
        style={{
          transform: dot.xy.interpolate(
            (x, y) => `translate3d(${x - 18}px,${y - 6}px,0)`
          ),
        }}></animated.div>
    </>
  );
};

export default Cursor;