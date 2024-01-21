import React from 'react'
import food1 from '../assets/food1.jpg';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsTrash3, BsAlarm } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteCartItem, increaseQty, decreaseQty } from '../redux/productSlice';
import { toast } from 'react-hot-toast';



function CartItem({dish_name,dish_price,image,ingredients,qty,total,id}) {
    // console.log(id)
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteCartItem(id))
           toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
             loading: `Item removed from order list`,
             success: `Item removed from order list`,
             error: `Item couldn't be removed from order list`,
           });
    }

    const handleIncreaseQty = () => {
      dispatch(increaseQty(id));
    
    };
    const handleDecreaseQty = () => {
      dispatch(decreaseQty(id));
    };
  return (
    <div>
      <div className="food-item-card">
        <div style={{ width: '25%' }}>
          <div className="food-item-card-img-container">
            <img src={image} alt="" style={{}} className="food-item-card-img" />
          </div>
        </div>

        <div className="card-body">
          <div className="pl-5">
            <div className="card-header">
              <p className="card-name">{dish_name}</p>
              <div className="price">
                Ghc <span>{dish_price}</span>
              </div>
            </div>
            <div className="card-deets">
              <p className="card-deets-text">{ingredients}</p>
              <div className="delete">
                <BsTrash3 style={{ fontSize: '20px' }} onClick={handleDelete} />
              </div>
            </div>
            <div className="cart-horizontal-line"></div>
            <div
              style={{
                width: '80%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <BsAlarm style={{ color: '#99999a' }} />
                  <span style={{ color: '#b2b2b4' }}>20-30 min</span>
                </div>
              </div>

              <div className="number-of-plates">
                <ul
                  style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/* <li>
                    <AiOutlineMinus onClick={handleDecreaseQty} />
                  </li>
                  <li>{qty}</li>
                  <li>
                    <AiOutlinePlus onClick={handleIncreaseQty}/>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="horizontalLine"></div>
    </div>
  );
}

export default CartItem
