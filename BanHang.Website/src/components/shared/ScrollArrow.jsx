import React, {useState} from 'react';
import { TiArrowUpThick } from "react-icons/ti";


function ScrollArrow(props) {

  const [showScroll, setScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop)
  return (

      <TiArrowUpThick
        className={"scrollTop"}
        onClick={scrollTop}
        style={{height: 40, display: showScroll ? 'flex' : 'none'}}
      />
  );
}

export default ScrollArrow;
