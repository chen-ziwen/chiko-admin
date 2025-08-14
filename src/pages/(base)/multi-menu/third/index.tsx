import { redirect } from 'react-router-dom';

const Third = () => {
  return null;
};

export const loader = () => {
  return redirect('child');
};

export default Third;
