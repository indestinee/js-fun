import './index.css';

interface TextParam {
  children?: React.ReactNode;
  childrens?: React.ReactNode[];
}

export const Text = (param: TextParam) => {
  return (
    <div className="text-row">
      {param.children ? param.children : null}
      {param.childrens ? param.childrens.map((child) => (child)) : null}
    </div>
  );
};
