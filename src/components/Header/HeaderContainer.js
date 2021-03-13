import React, {Fragment} from "react";
import { useMediaPredicate } from 'react-media-hook';
import Header from "./Header";
import Media from "react-media";

export default function HeaderContainer() {
  const bigger = useMediaPredicate('(min-width: 768px)');
  const innerWidth = bigger ? 'showDesktop' : 'showMobile';
  return (
    <Fragment>
      <Media queries={{
        mobile: "(max-width: 767px)",
        desktop: "(min-width: 768px)",
      }}>
        {matches => (
          <Fragment>
            {matches.mobile &&  <Header innerWidth={innerWidth} position="sticky" />}
            {matches.desktop &&  <Header innerWidth={innerWidth} />}
          </Fragment>
        )}
      </Media>

    </Fragment>
    )
};

