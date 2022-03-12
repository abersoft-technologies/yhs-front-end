import React from 'react';

const ProgressBar = () => {
  const MilestonePolygon = () => (
    <svg
      width='59'
      height='51'
      viewBox='0 0 59 51'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_371_785)'>
        <path
          d='M59 25.5L44.25 51.0477L14.75 51.0477L-1.28949e-06 25.5L14.75 -0.0477505L44.25 -0.0477492L59 25.5Z'
          fill='#CADDFF'
        />
        <path
          d='M35.3806 19.4458L26.4355 28.2393L21.5625 23.4623L19.6486 25.3437L26.4355 32.0156L37.2945 21.3406L35.3806 19.4458ZM29.1502 12C21.6575 12 15.5764 17.978 15.5764 25.3437C15.5764 32.7095 21.6575 38.6875 29.1502 38.6875C36.643 38.6875 42.724 32.7095 42.724 25.3437C42.724 17.978 36.643 12 29.1502 12ZM29.1502 36.0187C23.1506 36.0187 18.2912 31.2417 18.2912 25.3437C18.2912 19.4458 23.1506 14.6687 29.1502 14.6687C35.1499 14.6687 40.0093 19.4458 40.0093 25.3437C40.0093 31.2417 35.1499 36.0187 29.1502 36.0187Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_371_785'>
          <rect
            width='51'
            height='59'
            fill='white'
            transform='translate(59) rotate(90)'
          />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <>
      <MilestonePolygon />
      <div>
        <hr />
      </div>
      <MilestonePolygon />
      <div>
        <hr />
      </div>
      <MilestonePolygon />
      <div>
        <hr />
      </div>
      <MilestonePolygon />
      <div>
        <hr />
      </div>
      <MilestonePolygon />
      <div>
        <hr />
      </div>
      <MilestonePolygon />
    </>
  );
};

export default ProgressBar;
