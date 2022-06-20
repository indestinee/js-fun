export interface SpacingParam {
  marginTop?: string,
  marginBottom?: string,
  marginLeft?: string,
  marginRight?: string,
  children?: React.ReactNode;
}

export const Spacing = (param: SpacingParam) => {
  return (
    <div style={{
      marginTop: param.marginTop,
      marginBottom: param.marginBottom,
      marginLeft: param.marginLeft,
      marginRight: param.marginRight,
    }}>{param.children}</div>
  );
};
