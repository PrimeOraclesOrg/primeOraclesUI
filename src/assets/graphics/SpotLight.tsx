import { SVGAttributes } from "react";

export const SpotLight = (props: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="1150"
      height="1129"
      viewBox="0 0 1150 1129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_f_1592_379)">
        <ellipse
          cx="574.6"
          cy="564.1"
          rx="186"
          ry="175.5"
          fill="currentColor"
          fill-opacity="0.58"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1592_379"
          x="-0.000396729"
          y="0"
          width="1149.2"
          height="1128.2"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="194.3" result="effect1_foregroundBlur_1592_379" />
        </filter>
      </defs>
    </svg>
  );
};
