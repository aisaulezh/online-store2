import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import storeItems from "../data/items.json";
import { Button, Stack } from "react-bootstrap";
import { formatterCurrency } from "../currency/currencyFormatter.ts";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

type CartItemProps = {
    id: number;
    quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeCartQuantity, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
    const [itemQuantity, setItemQuantity] = useState(quantity);

    const item = storeItems.find(i => i.id === id);
    if (!item) return null;

    const incrementQuantity = () => {
        setItemQuantity(prev => prev + 1);
        increaseCartQuantity(id);
    };

    const decrementQuantity = () => {
        if (itemQuantity === 1) {
            removeCartQuantity(id);
        } else {
            setItemQuantity(prev => prev - 1);
            decreaseCartQuantity(id);
        }
    };

    return (
        <div>
            <Stack direction="horizontal" gap={3} className='d-flex align-items-center'>
                <img src={item.imgUrl} alt={item.name} style={{ width: "100px", height: "90px" }} />
                <div className="me-auto">
                    <div className="fw-semibold">
                        {item.name}{' '}
                        {itemQuantity > 1 && (
                            <span className="text-bold" style={{ fontSize: "1.2rem" }}>x{itemQuantity}</span>
                        )}
                    </div>

                    <div className="fw-normal" style={{ fontSize: "1rem" }}>
                        {formatterCurrency(item.price)}
                    </div>

                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Button
                                variant="outline-secondary"
                                className="fw-bolder"
                                style={{
                                    borderRadius: '10px',
                                    width: '30px',
                                    height: '30px',
                                    marginTop: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onClick={decrementQuantity}
                                disabled={itemQuantity === 1}
                            >
                                <span style={{alignSelf: 'center'}}>−</span>
                            </Button>
                            <span className="mx-2 fw-semibold">{itemQuantity}</span>
                            <Button
                                variant="outline-secondary"
                                className="fw-bolder"
                                style={{
                                    borderRadius: '10px',
                                    width: '30px',
                                    height: '30px',
                                    marginTop: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onClick={incrementQuantity}
                            >
                                <span style={{alignSelf: 'center'}}>+</span>
                            </Button>
                        </div>

                    </div>
                </div>

                <div className="fw-bold">
                    {formatterCurrency(item.price * itemQuantity)}
                </div>
                <Button variant="outline-danger" onClick={() => removeCartQuantity(item.id)}>
                    <IoTrashOutline className="lg"/>
                </Button>
            </Stack>

            <hr style={{marginTop: '10px', marginBottom: '10px'}}/>
        </div>
    );
}
