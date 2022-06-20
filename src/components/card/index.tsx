import {Card} from 'react-bootstrap';
import './index.css';

interface CustomCardParam {
  children: React.ReactNode;
}

export default function CustomCard(param: CustomCardParam) {
  return (
    <Card className="custom-card">
      {param.children}
    </Card>
  );
};
