/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ADDRESS_ZERO, NFT, SupportedNetworks } from "@/lib/client/constants";
import { EthereumAddress } from "@/lib/shared/types";
import React, { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SwapContextProps {
  inputAddress: string;
  validatedAddressToSwap: string;
  setInputAddress: (address: string) => void;
  validateAddressToSwap: (
    authedUser: EthereumAddress,
    inputEnsAddress: string | null | undefined
  ) => void;
  setUserJustValidatedInput: Dispatch<React.SetStateAction<boolean>>;
  userJustValidatedInput: boolean;
  setNftAuthUser: Dispatch<React.SetStateAction<NFT[]>>;
  nftAuthUser: NFT[];
  setNftInputUser: Dispatch<React.SetStateAction<NFT[]>>;
  nftInputUser: NFT[];
  destinyChain: SupportedNetworks;
  setDestinyChain: Dispatch<React.SetStateAction<SupportedNetworks>>;
}

export const SwapContext = React.createContext<SwapContextProps>({
  inputAddress: "",
  validatedAddressToSwap: "",
  validateAddressToSwap: (
    _authedUser: EthereumAddress,
    _inputEnsAddress: string | null | undefined
  ) => {},
  setInputAddress: (address: string) => {},
  setUserJustValidatedInput: () => {},
  userJustValidatedInput: false,
  setNftAuthUser: () => {},
  nftAuthUser: [],
  setNftInputUser: () => {},
  nftInputUser: [],
  destinyChain: SupportedNetworks.SEPOLIA,
  setDestinyChain: () => {},
});

export const SwapContextProvider = ({ children }: any) => {
  const [inputAddress, setInputAddress] = useState<string>("");
  const [validatedAddressToSwap, setValidatedAddressToSwap] = useState("");
  const [userJustValidatedInput, setUserJustValidatedInput] = useState(true);
  const [nftAuthUser, setNftAuthUser] = useState<NFT[]>([]);
  const [nftInputUser, setNftInputUser] = useState<NFT[]>([]);
  const [destinyChain, setDestinyChain] = useState<SupportedNetworks>(
    SupportedNetworks.SEPOLIA
  );

  const validateAddressToSwap = (
    _authedUser: EthereumAddress,
    _inputEnsAddress: string | null | undefined
  ) => {
    if (!inputAddress && !_inputEnsAddress) {
      toast.error("Please enter a valid address or some registered ENS domain");
      setUserJustValidatedInput(true);
      return;
    }

    let searchedAddress = inputAddress;

    if (_inputEnsAddress !== ADDRESS_ZERO && searchedAddress) {
      searchedAddress = _inputEnsAddress ?? "";
    }

    let inputIsValidAddress = false;
    try {
      new EthereumAddress(searchedAddress);
      inputIsValidAddress = true;
    } catch (e) {
      console.error(e);
    }

    if (inputIsValidAddress) {
      const inputEthAddress = new EthereumAddress(searchedAddress);

      if (inputEthAddress.equals(_authedUser)) {
        toast.error("You cannot swap with yourself");
        setValidatedAddressToSwap("");
        setUserJustValidatedInput(true);
        return;
      } else if (searchedAddress === ADDRESS_ZERO) {
        toast.error("You cannot swap with an invalid address");
        setValidatedAddressToSwap("");
        setUserJustValidatedInput(true);
        return;
      }

      setValidatedAddressToSwap(searchedAddress);
      toast.success("Searching Address");
    } else {
      toast.error(
        "Your input is not a valid address and neither some registered ENS domain"
      );
    }
    setUserJustValidatedInput(true);
  };

  useEffect(() => {
    setNftInputUser([]);
    setUserJustValidatedInput(false);
  }, [inputAddress]);

  useEffect(() => {
    setNftInputUser([]);
  }, [destinyChain]);

  useEffect(() => {
    setSwapData({
      inputAddress,
      setInputAddress,
      validatedAddressToSwap,
      validateAddressToSwap,
      setUserJustValidatedInput,
      userJustValidatedInput,
      setNftAuthUser,
      nftAuthUser,
      setNftInputUser,
      nftInputUser,
      destinyChain,
      setDestinyChain,
    });
  }, [
    inputAddress,
    validatedAddressToSwap,
    userJustValidatedInput,
    nftAuthUser,
    nftInputUser,
    destinyChain,
  ]);

  const [swapData, setSwapData] = useState<SwapContextProps>({
    inputAddress,
    setInputAddress,
    validatedAddressToSwap,
    validateAddressToSwap,
    setUserJustValidatedInput,
    userJustValidatedInput,
    setNftAuthUser,
    nftAuthUser,
    setNftInputUser,
    nftInputUser,
    destinyChain,
    setDestinyChain,
  });

  return (
    <SwapContext.Provider value={swapData}>{children}</SwapContext.Provider>
  );
};
