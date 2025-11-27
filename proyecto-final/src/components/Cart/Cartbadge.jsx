import { useCart } from "../../hooks/useCart"

function CartBadge() {
    const { getCartItemsCount } = useCart();
    const itemCount = getCartItemsCount();
    
    if (itemCount <= 0) return null;
    
    return (
        <span className="px-2">
            {itemCount}
        </span>
    );
}

export default CartBadge;