import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import storeItems from "../data/items.json";
import { Cart } from "../components/Cart.tsx";
import { useLocalStorageHook } from "../localStorage/useLocalStorageHook.ts";

type ShoppingCartContext = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredItems: StoreItem[];
    setFilteredItems: (items: StoreItem[]) => void;
    searchShow: boolean;
    setSearchShow: (show: boolean) => void;

    cartItems: CartItem[];
    cartQuantity: number;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeCartQuantity: (id: number) => void;
    openCart: () => void;
    closeCart: () => void;
};

type ShoppingCartProviderProps = {
    children: ReactNode;
};

type StoreItem = {
    id: number;
    name: string;
};

type CartItem = {
    id: number;
    quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState<StoreItem[]>(storeItems);
    const [cartItems, setCartItems] = useLocalStorageHook<CartItem[]>('Shopping Cart', []);
    const [isOpen, setIsOpen] = useState(false);
    const [searchShow, setSearchShow] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
            }
        });
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            const item = currItems.find(item => item.id === id);
            if (item?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
            }
        });
    }

    function removeCartQuantity(id: number) {
        setCartItems(currItems => currItems.filter(item => item.id !== id));
    }

    useEffect(() => {
        setFilteredItems(
            storeItems.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);

    return (
        <ShoppingCartContext.Provider
            value={{
                searchTerm,
                setSearchTerm,
                filteredItems,
                setFilteredItems,
                searchShow,
                setSearchShow,
                cartQuantity,
                cartItems,
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeCartQuantity,
                openCart,
                closeCart
            }}
        >
            {children}
            <Cart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}
