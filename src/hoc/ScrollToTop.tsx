const ScrollToTop: React.FC = ({ children }): JSX.Element => {
  typeof window !== 'undefined' && window.scrollTo({ top: 0 });
  return <>{children}</>;
};

export default ScrollToTop;
