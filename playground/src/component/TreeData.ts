const recfunc: any = (values: any, ke: any, value: any) => {
  if (values.props && values.type === "object") {
    return Object.keys(values.props).map((val, ind) => {
      return value === ""
        ? { [ke]: recfunc(values.props[val], ke, val) }
        : { [value]: recfunc(values.props[val], ke, val) };
    });
  } else {
    return value;
  }
};

export const TreeData = (Data?: any) => {
  let model: string[] = [];
  let alldata: any[] = [];
  let schema: any[] = [];
  const dataSchema: any = Data.schema.props.models.props;
  Object.keys(dataSchema).map((keyModel: string) => {
    model.push(keyModel);
    let doits: any[] = new Array();

    Object.keys(dataSchema[keyModel].props.doits.props).map((keyDoits) => {
      Object.keys(
        dataSchema[keyModel].props.doits.props[keyDoits].props.details.props
      ).map((keyDetails) => {
        schema.push(
          recfunc(
            dataSchema[keyModel].props.doits.props[keyDoits].props.details
              .props[keyDetails],
            keyDetails,
            ""
          )
        );
      });
      let obje = {};
      schema.length !== 0
        ? (obje = {
            name: keyDoits,
            children: [{ name: "details", data: schema }],
          })
        : (obje = { name: keyDoits });

      doits.push(obje);

      schema = [];
    });

    alldata.push({
      name: keyModel,
      children: doits,
    });
    doits = [];
  });

  return { name: "Funql", children: alldata };
};
