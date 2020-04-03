import Items from '../components/Items';

// import PropTypes from 'prop-types';

const index = props => {
    return (
        <div>
            <Items page={parseFloat(props.query.page) || 1}/>
        </div>
    );
};

index.propTypes = {
    
};

export default index;