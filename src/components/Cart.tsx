import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { Offcanvas, Stack } from "react-bootstrap";
import storeItems from "../data/items.json";
import { CartItem } from "./CartItem.tsx";
import { formatterCurrency } from "../currency/currencyFormatter.ts";

type CartProps = {
    isOpen: boolean;
};

export function Cart({ isOpen }: CartProps) {
    const { closeCart, cartItems } = useShoppingCart();

    const subtotal = cartItems.reduce((total, cartItem) => {
        const item = storeItems.find(i => i.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end" style={{ width: "600px" }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <CartItem itemQuantity={item.quantity} key={item.id} {...item} />
                        ))
                    ) : (
                        <div>Your cart is empty</div>
                    )}

                    <div className="fw-bold fs-4 ms-auto">
                        Subtotal: {' '}
                        {formatterCurrency(subtotal)}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
