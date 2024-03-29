import { ConnectWallet, SwaplaceIcon } from "@/components/01-atoms";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import React, { useEffect, useState } from "react";
import cc from "classcat";

export const TheHeader = () => {
  const { isDesktop } = useScreenSize();
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const [showFullNav, setShowFullNav] = useState(
    !isDesktop && !!authenticatedUserAddress?.address
  );

  useEffect(() => {
    setShowFullNav(!isDesktop);
  }, [isDesktop]);

  return (
    <header
      onMouseEnter={() => setShowFullNav(true)}
      onMouseLeave={() => isDesktop && setShowFullNav(false)}
      className="bg-[#F2F2F2] z-40 w-screen h-auto xl:w-auto xl:h-screen py-6 flex xl:flex-col justify-between items-center px-8 font-medium shadow-lg absolute left-0 top-0 xl:items-start"
    >
      <SwaplaceIcon className="w-10" />
      <div className={cc([showFullNav ? "block" : "hidden"])}>
        <ConnectWallet />
      </div>
    </header>
  );
};
