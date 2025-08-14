import { redirect } from 'react-router-dom';

const First = () => {
  return null;
};

export const loader = () => {
  return redirect('one');
};

export default First;
