import * as React from "react";
import {connect} from "react-redux";
import {getCategories} from "../selectors/category/getCategories";
import {changeSelectedCategory} from "../action-creator/changeSelectedCategory";

export class CategorySelector extends React.PureComponent {

    onCategorySelected = (e) => {
        this.props.changeSelectedCategory(parseFloat(e.target.value))
    };

    render() {
        return (
            <select name="" id="" onChange={this.onCategorySelected} style={{border: '2px solid #46d2e9'}}>
                <option value="0"></option>
                {this.props.categories.map(category => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                ))}
            </select>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        categories: getCategories(state)
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeSelectedCategory: (categoryId) => dispatch(changeSelectedCategory(categoryId))
    }
};

export const SmartCategorySelector = connect(mapStateToProps, mapDispatchToProps)(CategorySelector);