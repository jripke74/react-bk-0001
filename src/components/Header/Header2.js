import logo from "../../assets/images/investment-calculator-logo.png";
import classes from "./Header2.module.css";

const Header2 = () => {
  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" />
      <h1>Investment Calculator</h1>
    </header>
  );
};

export default Header2;
