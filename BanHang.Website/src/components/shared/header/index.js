import React, { useState } from "react";
import HeaderTop from "./HeaderTop";
import HeaderCenter from "./HeaderCenter";
import HeaderBottom from "./HeaderBottom";
import MobileMenu from "./MobileMenu";

export default function Header(props) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div>
      <HeaderTop />
      <HeaderCenter
        isShow={showMobileMenu}
        setShow={(isShow) => setShowMobileMenu(isShow)}
      />
      <HeaderBottom />
      <MobileMenu
        show={showMobileMenu}
        setShow={(show) => setShowMobileMenu(show)}
      />
    </div>
  );
}
