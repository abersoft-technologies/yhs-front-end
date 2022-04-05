import React from "react";
import classnames from 'classnames';
import { SpaceSize } from '../../../types/style';

interface ITextProps {
    text: string;
    width?: "full" | "auto" | "small" | "medium" | "large";
    pY?: SpaceSize;
    pX?: SpaceSize;
    textSize?: SpaceSize;
    color?: string;
}

export const Text = (props: ITextProps) => {

    const classes = classnames({
        text: true,
        [`text--width-${props.width}`]: props.width,
        [`text--py-${props.pY}`]: props.pY,
        [`text--px-${props.pX}`]: props.pX,
        [`text--size-${props.textSize}`]: props.textSize,
        [`text--color-${props.color}`]: props.color
    });

    return (
        <p className={classes}>{props.text}</p>
    )
}