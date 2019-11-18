import React from 'react';
import LoadFile from '../../assets/img/spinner.gif'
export default function Loader() {
    return (
        <div className="-loading -active">
            <div className="loading-inner">
                <center>
                    <h6><img src={LoadFile} alt='No Data' /></h6>
                </center>
            </div>
        </div>
    );
}