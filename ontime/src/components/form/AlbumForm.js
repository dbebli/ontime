import * as React from "react";
import UserService from "../../services/UserService";
import {PopupContext} from "../../contexts/PopupContext";
import {connect} from "react-redux";
import {setUser} from "../../action-creator/user/setUser";
import SongService from "../../services/SongService";
import AlbumService from "../../services/AlbumService";
import {getAlbums} from "../../selectors/getAlbums";
import {getAuthors} from "../../selectors/getAuthors";
import {getCategories} from "../../selectors/getCategories";
import {setSongs} from "../../action-creator/songs/setSongs";
import {SongForm} from "./SongForm";
import {setAlbums} from "../../action-creator/albums/setAlbums";

export class AlbumForm extends React.PureComponent {
    state = {
        imageSrc: null,
        categoryId: "",
        authorId: "",
        name: "",
        error: ""
    };

    onPhotoSelected = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.setState({imageSrc: event.target.result})
        };
        reader.readAsDataURL(file);
    };


    submit = async (e) => {
        e.preventDefault();
        const {name, categoryId, authorId, imageSrc} = this.state;
        const response = await AlbumService.create({
            name,
            categoryId,
            img: imageSrc,
            authorId,
        });
        const data = await response.json();
        if (response.ok) {
            this.setState({
                error: "album added to database",
                imageSrc: null,
                categoryId: "",
                authorId: "",
                name: "",
            })
            const albums = await AlbumService.findAll();
            const dataAlbums = await albums.json();
            this.props.setAlbums(dataAlbums.albums);

        } else {
            this.setState({error: JSON.stringify(data.message)})
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };

    render() {
        const {imageSrc, error} = this.state;
        const {authors, categories} = this.props;
        const img = imageSrc ? <img src={imageSrc} alt="" width={60}/> : null;
        const errorMsg = error ? <p>{error}</p> : null;
        return (
            <form className="form album" onSubmit={this.submit}>
                <h3>Album</h3>
                <label>name (required)</label>
                <input type="text" required={true} onChange={this.handleChange} id="name"/>
                <label>image</label>
                {img}
                <input type="file" onChange={this.onPhotoSelected} accept="image/png, image/jpeg"/>

                <label>author (required)</label>
                <select onChange={this.handleChange} id="authorId">
                    <option value=""></option>
                    {authors.map(author => (
                        <option value={author.id} key={author.id}>{author.name}</option>
                    ))}
                </select>
                <label>Pick a Category (required)</label>
                <select onChange={this.handleChange} id="categoryId">
                    <option value=""></option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>
                {errorMsg}
                <button className="">Add</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authors: getAuthors(state),
        categories: getCategories(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAlbums: (albums) => dispatch(setAlbums(albums)),
    }
};

export const SmartAlbumForm = connect(mapStateToProps, mapDispatchToProps)(AlbumForm);