import Items from '../components/Items';

// import PropTypes from 'prop-types';

const shop = props => {
    return (
        <div>
             <Items page={parseFloat(props.query.page) || 1} />
        </div>
    );
};

shop.propTypes = {
    
};

export default shop;
