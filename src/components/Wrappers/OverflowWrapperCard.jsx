/* eslint-disable react/prop-types */
import "../../index.css"

const OverflowWrapperCard = ({ children }) => {
  return (
    <div className="shadow-lg border-2 rounded-lg p-3 border-primary">{children}</div>
  );
};

export default OverflowWrapperCard;
