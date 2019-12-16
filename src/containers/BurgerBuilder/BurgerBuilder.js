import React, { Component } from 'react';

import Aux from '../../hoc/Auxchange/Auxchange';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchaising: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // axios.get('https://my-burger-builder-react-2f767.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     });
    }

    updatePurchaseState = ( ingredient ) => {
        let sum = Object.keys(ingredient).map((ingKey) => {
            return ingredient[ingKey];
        }).reduce((sum, el) => {
            return sum + el;
        })
        return sum > 0
    }

    purchaisingHandler = () => {
        this.setState({ purchaising: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchaising: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }
 
    render () {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null
        
        let burger = this.state.error ? <p>Ingredient's can't be loaded!</p> : <Spinner />;
        
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaisingHandler}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                price={this.props.price}
                ingredients={this.props.ings} 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.purchaising} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient( ingName )),
        onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient( ingName ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));