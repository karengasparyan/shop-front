import React from "react";
import { useMediaPredicate } from 'react-media-hook';
import Header from "./Header";

export default function HeaderContainer() {
  const bigger = useMediaPredicate('(min-width: 768px)');
  const innerWidth = bigger ? 'showDesktop' : 'showMobile';
  return (<Header innerWidth={innerWidth} />)
};

