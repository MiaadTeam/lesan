/** @jsx h */
import { h, FunctionalComponent, useState } from "../reactDeps.ts";
import ChevronDownIcon from "./icon/ChevronDownIcon.tsx";
import { useOutsideClick } from "./hooks/useOutsideClick.ts";

export interface IOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: IOption[];
  onChange: (options: IOption[]) => void;
}

const MultiSelect: FunctionalComponent<MultiSelectProps> = ({
  options,
  onChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
  const [unselectedOptions, setUnselectedOptions] =
    useState<IOption[]>(options);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (selectedOption: IOption) => {
    if (selectedOptions.includes(selectedOption)) {
      const filteredSelectedOptions = selectedOptions.filter(
        (option) => option.value !== selectedOption.value
      );
      setSelectedOptions(filteredSelectedOptions);
      setUnselectedOptions([...unselectedOptions, selectedOption]);
      onChange(filteredSelectedOptions);
    } else {
      const filteredUnselectedOptions = unselectedOptions.filter(
        (option) => option.value !== selectedOption.value
      );
      setSelectedOptions([...selectedOptions, selectedOption]);
      setUnselectedOptions(filteredUnselectedOptions);
      onChange([...selectedOptions, selectedOption]);
    }
  };

  const resetOptions = () => {
    setSelectedOptions([]);
    onChange([]);
    setUnselectedOptions(options);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  return (
    <div ref={ref} className="multi-select__wrapper">
      <div className="multi-select__field" onClick={toggleDropdown}>
        <div className="multi-select__selected-item-wrapper">
          {selectedOptions.map((item) => (
            <div className="multi-select__selected-item" key={item}>
              <div className="multi-select__selected-item-text">
                {item.label}
              </div>
              <div
                className="multi-select__selected-item-btn"
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionChange(item);
                }}
              >
                x
              </div>
            </div>
          ))}
        </div>
        <div className="multi-select__icons-wrapper">
          {selectedOptions.length ? (
            <div
              className="multi-select__close-icon-wrapper"
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                resetOptions();
              }}
            >
              <span className="multi-select__close-icon">x</span>
            </div>
          ) : null}

          <div className="multi-select__arrow-icon-wrapper" role="button">
            <ChevronDownIcon className="multi-select__arrow-icon" />
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="multi-select__options">
          {unselectedOptions.length ? (
            unselectedOptions.map((option) => (
              <div
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionChange(option);
                }}
                className="multi-select__option"
              >
                <div className="multi-select__option-label">{option.label}</div>
              </div>
            ))
          ) : (
            <div className="multi-select__option--no-option">No Options!</div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MultiSelect;
