import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
   mutation CREATE_ITEM_MUTATION($title: String!, $description: String!, $price: Int!, $image: String, $largeImage: String) {

        createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
            id
        }

   }
`;

class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: '',
    };
    uploadFile = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sickfits');

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dehege/image/upload', {
                method: 'POST',
                body: data
            });

        const file = await res.json();
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        })
        
    };
    handleChange = (e) => {
        const {name, type, value} = e.target;
        const inputValue = type === 'number' ? parseFloat(value) : value;
        this.setState({ [ name ]: inputValue });
    };
    handleSubmit = mutation => async e => {
       e.preventDefault();
       const res = await mutation();
        Router.push({
            pathname: '/item',
            query: {id: res.data.createItem.id}
        });
    };
    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, {loading, error}) => (

                    <Form onSubmit={this.handleSubmit(createItem)}>
                    <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>

                        <label htmlFor="file">
                            Image
                            <input 
                                type="file"
                                id="file"
                                name="file"
                                placeholder="Upload an image"
                                onChange={this.uploadFile}
                            >
                            </input>
                        </label>
                        {this.state.image && <img src={this.state.image} alt={this.state.title}/> }
                        <label htmlFor="title">
                            Title
                            <input 
                                type="text"
                                id="title"
                                name="title"
                                placeholder="title"
                                required
                                value={this.state.title}
                                onChange={this.handleChange}
                            >
                            </input>
                        </label>

                        <label htmlFor="price">
                            Price
                            <input 
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Price"
                                required
                                value={this.state.price}
                                onChange={this.handleChange}
                            >
                            </input>
                        </label>

                        <label htmlFor="description">
                            Description
                            <textarea 
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Add a Description"
                                required
                                value={this.state.description}
                                onChange={this.handleChange}
                            >
                            </textarea>
                        </label>
                        <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION }