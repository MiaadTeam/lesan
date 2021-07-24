const recfunc: any = (values: any, ke: any, value: any) => {
  if (values.props && values.type === "object") {
    return Object.keys(values.props).map((val, ind) => {
      return value === ""
        ? { [ke]: recfunc(values.props[val], ke, val) }
        : { [value]: recfunc(values.props[val], ke, val) };
    });
  } else {
    return { value, type: values.type };
  }
};

export const TreeData = (Data?: any) => {
  let isStatic: string[] = [];
  let subdata: any[] = [];
  let alldata: any[] = [];
  let schema: any[] = [];
  const dataSchema: any = Data.schema.props.contents.props;
  Object.keys(dataSchema).map((keyContents: string) => {
    const content = keyContents;
    Object.keys(dataSchema[keyContents].props.models.props).map(
      (keyModel: string) => {
        let doits: any[] = new Array();
        const model = keyModel;

        Object.keys(
          dataSchema[keyContents].props.models.props[keyModel].props.doits.props
        ).map((keyDoits) => {
          const doit = keyDoits;

          Object.keys(
            dataSchema[keyContents].props.models.props[keyModel].props.doits
              .props[keyDoits].props.details.props
          ).map((keyDetails) => {
            schema.push(
              recfunc(
                dataSchema[keyContents].props.models.props[keyModel].props.doits
                  .props[keyDoits].props.details.props[keyDetails],
                keyDetails,
                ""
              )
            );
          });
          let obje = {};
          schema.length !== 0
            ? (obje = {
                name: keyDoits,
                children: [
                  { data: schema, parent: content + " " + model + " " + doit },
                  {},
                ],
              })
            : (obje = { name: keyDoits });

          doits.push(obje);

          schema = [];
        });

        subdata.push({
          name: keyModel,
          children: doits,
        });

        doits = [];
      }
    );
    alldata.push({
      name: keyContents,
      children: subdata,
    });
    subdata = [];
  });
  // console.log(alldata);
  return { name: "Funql", children: alldata };
};
