import './styles.css';

export const Card = ({ dark, children }) => {
  const classes = dark ? 'card card--dark' : 'card';

  return <div className={classes}>{children}</div>;
};
