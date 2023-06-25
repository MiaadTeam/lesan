import { useState } from "https://esm.sh/preact@10.5.15/hooks";

export default function useModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggle
  };
}