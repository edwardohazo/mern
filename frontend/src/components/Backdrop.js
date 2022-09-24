import "./Backdrop.css";

const Backdrop = ({ click, show }) => {
  return show && <div className="backdrop" onClick={click}>BACKDROP</div>;
};

export default Backdrop; 