import classNames from "classnames";
import { SpaceSize } from "../../../types/style";

interface ITextProps {
    text: string;
    width?: SpaceSize | "auto" | "full";
    size?: SpaceSize;
    color?: string;
}

export const Text = ({text, width, size, color}: ITextProps) => {
    const classes = classNames({
        text: true,
        [`text--width-${width}`]: width,
        [`flex--size-${size}`]: size,
        [`flex--color-${color}`]: color,
      });
    return (
        <p className={classes}>{text}</p>
    )
}