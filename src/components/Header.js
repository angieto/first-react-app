import React from 'react'; 

// stateless component
const Header = ({ message }) => {
    return (
        <h2 className="Header text-center">
            {message}
        </h2>
    );
};

// set proptype for Header
Header.propTypes = {
    message: React.propTypes.string
};

// export Header
export default Header;