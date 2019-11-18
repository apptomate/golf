import React from 'react';
import DefaultUser from '../../assets/img/default_user.jpg';
export default function Profile(props) {
    const { url, className } = props;
    return (
        <img src={url || DefaultUser} alt='No Data' className={className} />
    );
}