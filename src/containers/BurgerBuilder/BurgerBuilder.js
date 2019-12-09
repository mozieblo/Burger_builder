import React, { Component } from 'react';

import Aux from '../../hoc/Auxchange/Auxchange';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    bacon: 0.7,
    cheese: 0.6,
    meat: 1.4,
    salad: 0.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 3,
        purchasable: false,
        purchaising: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://my-burger-builder-react-2f767.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }

    updatePurchaseState = ( ingredient ) => {
        let sum = Object.keys(ingredient).map((ingKey) => {
            return ingredient[ingKey];
        }).reduce((sum, el) => {
            return sum + el;
        })

        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + INGREDIENT_PRICES[type];
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
           return;
        }
        
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - INGREDIENT_PRICES[type];
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaisingHandler = () => {
        this.setState({ purchaising: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchaising: false });
    }

    purchaseContinueHandler = () => {
        // this.setState({ loading: true })
        // //alert('You continue!');
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Magdalena Oz',
        //         address: {
        //             street: 'Teststreet 3',
        //             zipCode: '3456',
        //             country: 'Poland'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        //     axios.post('orders.json', order)
        //         .then(response => {
        //             //console.log(response);
        //             this.setState({ loading: false, purchaising: false })
        //         })
        //         .catch(error => {
        //             //console.log(error);
        //             this.setState({ loading: false, purchaising: false })
        //         });
        this.props.history.push('/checkout');
    }
 
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null
        
        let burger = this.state.error ? <p>Ingredient's can't be loaded!</p> : <Spinner />;
        
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaisingHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                price={this.state.totalPrice}
                ingredients={this.state.ingredients} 
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

export default withErrorHandler(BurgerBuilder, axios);