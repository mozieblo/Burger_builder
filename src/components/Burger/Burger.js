import React from 'react';
import { withRouter } from 'react-router-dom';

import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = ( props ) => {
    console.log(props)
    // Object.keys zamienia object na array z samymi keys w stringach ['salad','bacon','meat','cheese']
    // mapujemy po tej array i zwracamy array z tylom miejscami co ilosc skladnikow [ [ undefined ], [ undefined ], 
    // [ undefined, undefined ], [ undefined, undefined] ]
    // mapujemy po tej array i zwracamy burgerIngredient w takiej ilosci ile jest skladnikow 
    // tworzymy unikalny key
    // reduce zamienia array na jedna array z elementami, a nie array z arrayami
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, [])

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default withRouter(burger);