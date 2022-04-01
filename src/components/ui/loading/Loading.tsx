import classnames from 'classnames';

interface ILoadingProps {
    isLoading: boolean;
    size: "small" | "medium" | "large"
}

export const Loading = ({isLoading, size}: ILoadingProps) => {
    const classname = classnames({
        container: true,
        [`container--size-${size}`]: size,
    })
    return (
        isLoading ? <div className={classname}></div> : null
    )
}