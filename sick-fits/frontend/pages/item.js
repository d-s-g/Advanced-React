import Single from '../components/Single';

const SingleItem = ({query}) => {

    return (
        <div>
            <Single id={query.id}/>
        </div>
    );
};

export default SingleItem;