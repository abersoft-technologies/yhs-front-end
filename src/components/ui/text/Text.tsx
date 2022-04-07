import React from "react";
import classnames from 'classnames';
import { SpaceSize } from '../../../types/style';

interface ITextProps {
    text: string;
    width?: "full" | "auto" | SpaceSize;
    pY?: SpaceSize;
    pX?: SpaceSize;
    mY?: SpaceSize;
    mX?: SpaceSize;
    textSize?: SpaceSize;
    color?: string;
    onClick?: () => void;
}

export const Text = (props: ITextProps) => {

    const classes = classnames({
        text: true,
        [`text--width-${props.width}`]: props.width,
        [`text--py-${props.pY}`]: props.pY,
        [`text--px-${props.pX}`]: props.pX,
        [`text--my-${props.mY}`]: props.mY,
        [`text--mx-${props.mX}`]: props.mX,
        [`text--size-${props.textSize}`]: props.textSize,
        [`text--color-${props.color}`]: props.color
    });

    return (
        <p className={classes} onClick={props.onClick} style={{color: props.color}} >{props.text}</p>
    )
}