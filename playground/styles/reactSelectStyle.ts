export const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: "1px dotted pink",
    color: state.selectProps.menuColor,
    padding: 10,
  }),

  control: (_, { selectProps: { width } }) => ({
    width: width,
    display: "flex",
    border: "0.09rem solid black",
    borderRadius: "0.5rem",
    margin: "0 0.5rem",
  }),
};
