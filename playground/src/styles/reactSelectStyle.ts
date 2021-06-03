export const customStyles = {
  menu: (provided: any, state: any) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: "1px dotted pink",
    color: state.selectProps.menuColor,
    padding: 10,
  }),

  control: (_: any, { selectProps: { width } }: any) => ({
    width: width,
    display: "flex",
    border: "0.09rem solid black",
    borderRadius: "0.5rem",
    margin: "0 0.5rem",
  }),
};
