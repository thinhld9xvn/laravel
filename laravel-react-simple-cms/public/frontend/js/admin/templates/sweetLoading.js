import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function SweetLoading({ loading }) {
    return (
        <div className="sweet-loading">
            <PulseLoader
                css={override}
                size={15}
                color={"#9c27b0"}
                loading={loading}
            />
        </div> 
    )
}
