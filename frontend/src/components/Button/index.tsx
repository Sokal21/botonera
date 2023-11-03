import classNames from "classnames";
import "./styles.scss";

export const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  return (
    <button {...props} className={classNames(props.className, "push--flat")} />
  );
};
