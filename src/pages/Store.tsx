import {Col, Row} from "react-bootstrap";
import storeItems from "../data/items.json";
import {StoreItem} from "../components/StoreItem.tsx";
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import {useEffect} from "react";

export function Store() {

    const {
        searchTerm,
        setSearchTerm,
        filteredItems,
        setFilteredItems
    } = useShoppingCart();

    useEffect(() => {

        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = storeItems.filter(item =>
            item.name.toLowerCase().includes(lowerCaseSearchTerm)
        );

        setSearchTerm(searchTerm);
        setFilteredItems(filtered);

    }, [searchTerm])



    return (
        <>
             <h1 className="fs-2 text-center text-muted align-self-md-center">Store</h1>

            <Row xs={1} md={3} lg={4}>
                {filteredItems.map(item => (
                    <Col key={item.id}>
                        <StoreItem rating={0} price={0} imgUrl={""} {...item} />
                    </Col>
                ))}
            </Row>


        </>
    );
}
