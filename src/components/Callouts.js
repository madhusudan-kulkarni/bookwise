import { useDataContext } from "../context/dataContext";

export function Callouts({wishlist}){
    const {cartData,wishlistData} = useDataContext();

    return(<div className="callout">
        {wishlist === true ? <span>{wishlistData.length}</span> : <span>{cartData.length}</span>} 
    </div>)
}