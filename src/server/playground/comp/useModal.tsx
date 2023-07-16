import { useState } from "../../../deps.ts";

export default function useModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggleModal = () => {
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggleModal,
  };
}
