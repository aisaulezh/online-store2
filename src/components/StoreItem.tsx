import {Button, Card} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import {formatterCurrency} from "../currency/currencyFormatter.ts";
import {NavLink} from "react-router-dom";


type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
    rating: number
}

export function StoreItem({id, name, price, imgUrl, rating}: StoreItemProps) {

    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartQuantity,
    } = useShoppingCart()

    const quantity = getItemQuantity(id);

    function  stars() {
        const ratingArr = [];
        for (let i = 0; i < Math.floor(5 - rating); i++)
            ratingArr.push("bi bi-star-fill");
        if (rating % 1 !== 0) ratingArr.push("bi bi-star-half");
        for (let i = 0; i < Math.floor(5 - rating); i++)
            ratingArr.push("bi bi-star");

        return ratingArr.map((el, index) => <i key={index} className={el}></i>);
    }





    return(

        <Card className="mb-4" style={{ height: '500px' }}>
            <NavLink to={`/products/${id}`}>
                <Card.Img
                variant="top"
                src={imgUrl}
                style={{objectFit: "cover"}}
                height="270px"


            />
            </NavLink>

            <div>{stars()}</div>


            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-around align-items-baseline mb-4">

                    <span className="fs-6">{name}</span>
                    <span className="text-muted fs-4">{formatterCurrency(price)}</span>

                </Card.Title>
                <Card.Text>
                    Make your space bloom with this Embroidered White Sunflower Pillow.
                </Card.Text>

                <div className="mb-1">

                    {quantity === 0 ? (

                        <Button
                            variant="outline-secondary"
                            className="w-100 mt-4"

                            onClick={() => {increaseCartQuantity(id)}}
                        >
                            Add to Cart
                        </Button>

                    ) : (

                        <div className="d-flex align-items-center flex-column" style={{gap: ".5rem"}}>

                            <div className="d-flex justify-content-center" style={{gap: ".5rem"}}>
                                <Button variant="outline-secondary" onClick={() => {decreaseCartQuantity(id)}}> - </Button>


                                <div>
                                    <span className="fs-4">{quantity}</span> in cart
                                </div>


                                <Button variant="outline-secondary" onClick={() => {increaseCartQuantity(id)}}> + </Button>
                            </div>

                            <Button variant="outline-danger" onClick={() => {removeCartQuantity(id)}}>Remove</Button>


                        </div>
                    )}
                </div>





            </Card.Body>
        </Card>
    )
}