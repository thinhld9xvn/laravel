import React from 'react'
import { handleGetDate } from 'utils/dateTime/handleGetDate';
export default function PostFeaInitDate({ date, time, msg = `Thời gian khởi tạo:`, className = 'mtop10' }) {
    const {d, day, month, year} = date;
    const strDate = d && day && month && year ? `${handleGetDate(d)} ${day}/${month}/${year}` : '';
  return (
    <div className={"rowFluid rowFeaDate ".concat(className)}>
        <span className="fluid-label flex-align-center">
            <span className="fa fa-calendar"></span>
            <span className="padLeft5">{msg}</span>
        </span>
        <span className="fluid-label">
            <strong>{strDate}</strong>
            {time ? (
                <span className="fluid-label">
                    <span className="fa fa-history"></span>
                    <span className="padLeft5">
                        <strong>{time}</strong>
                    </span>
                </span> 
            ) : null}
        </span>
    </div>
  )
}
