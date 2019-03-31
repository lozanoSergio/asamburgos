import GridContainer from "../src/components/Grid/GridContainer";


const BasePage = props => {
  const { className, title } = props;
  return (
    <div className={`base-page ${className}`}>
      <GridContainer>
        {title && (
          <div className="page-header">
            <h1 className="page-header-title">{title}</h1>
          </div>
        )}
        {props.children}
      </GridContainer>
    </div>
  );
};

BasePage.defaultProps = {
  className: ""
};

export default BasePage;