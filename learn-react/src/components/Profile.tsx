import React from 'react';

const Profile: React.FC = () => {
    const avatar = 'https://react.dev/images/docs/scientists/7vQD0fPs.jpg';
    const description = 'Gregorio Y. Zara';

    return (
        <img
            src={avatar}
            alt={description}
        />
    )
}

export default Profile;