import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import Router from 'next/router';
import { consolidateStreamedStyles } from 'styled-components';

const GET_ITEM_QUERY = gql`
    query GET_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}) {
            title
            description
            price
            image
            largeImage
        }
    }
`

const UPDATE_ITEM_MUTATION = gql`
   mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int, $image: String, $largeImage: String) {

        updateItem(id: $id, title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
            id
            title
            price
            description
            image
            largeImage
        }

   }
`;

class UpdateItem extends Component {
    state = {};
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
    handleSubmit = updateItem => async e => {
       e.preventDefault();

       const res = await updateItem({
           variables:{
               id: this.props.id,
               ...this.state
           }
       });

        Router.push({
            pathname: '/item',
            query: {id: res.data.updateItem.id}
        });
    };
    render() {
        return (
            <Query query={GET_ITEM_QUERY} variables={{id: this.props.id}}>
            {({data, loading}) => {
                if (loading) return <p>loading...</p>
                if (!data.item) return <p>There is not data that matches {this.props.id}</p>
                    return (
                        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                        {(updateItem, {loading, error}) => (
                            <Form onSubmit={this.handleSubmit(updateItem)}>
                            <h1>{data.item.title}</h1>
                            <Error error={error} />
                                <fieldset disabled={loading} aria-busy={loading}>
                                <label>Current Image</label>
                                {data.item.image && <img src={data.item.image} alt={data.item.title}/> }
                                <label htmlFor="file">
                                    Upload a new image
                                    <input 
                                        type="file"
                                        id="file"
                                        name="file"
                                        placeholder="Upload a new image"
                                        onChange={this.uploadFile}
                                        >
                                    </input>
                                </label>
                                <label htmlFor="title">
                                    Title
                                    <input 
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="title"
                                        required
                                        defaultValue={data.item.title}
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
                                        defaultValue={data.item.price}
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
                                        defaultValue={data.item.description}
                                        onChange={this.handleChange}
                                        >
                                    </textarea>
                                </label>
                                <button type="submit">Save Changes</button>
                                </fieldset>
                            </Form>
                        )}
                    </Mutation>
                    )
                }
            }
        </Query>
        );
    }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION, GET_ITEM_QUERY }