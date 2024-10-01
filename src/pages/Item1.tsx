import {useParams} from "react-router-dom";
import storeItems from "../data/items.json";
import React from "react";
import {Button} from "react-bootstrap";
import {formatterCurrency} from "../currency/currencyFormatter.ts";

type Params = {
    id: string;
}
const Item1: React.FC = ()  => {
    const {id} = useParams<Params>();
    const product = storeItems.find((item) => item.id === Number(id))

    if(!product) {
        return <div>Product not found</div>;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <h2>{product.name}</h2>
            <p className="fs-4">{product.description.split('\n')[0]}</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={product.imgUrl} alt={product.name} style={{width: '450px', marginRight: '20px'}}/>

                <ul className="fs-4">
                    {(product.description.split('\n').slice(1)).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

            </div>
            <p className="fw-normal fs-2" style={{alignSelf: 'flex-end'}}>{formatterCurrency(product.price)}</p>
            <Button variant="primary"
                    style={{alignSelf: 'flex-end', marginTop: '20px', width: '200px', height: '50px'}}>Add to
                Cart</Button>
        </div>

    )
}

export default Item1;