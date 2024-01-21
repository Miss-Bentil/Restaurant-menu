import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { BsTrash3, BsAlarm } from 'react-icons/bs';
import { FaShoppingBag } from 'react-icons/fa';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import food1 from '../assets/food1.jpg';
import { CiViewList } from 'react-icons/ci';
import '../css/menu.css';
import '../css/cart.css';
import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';

function Cart() {
  const cartItems = useSelector((state) => state.product.cartItem);

  return (
    <div style={{ padding: '0 20px' }}>
      <header className="flex justify-center p-2 items-center ">
        <Link to="/menu" className="flex items-center">
          <IoIosArrowRoundBack style={{ fontSize: '30px' }} />
        </Link>
        <p className="flex-1 text-center">Order List</p>
      </header>

      {cartItems.length > 0 ? (
        <div className="cart-container">
          <div>
            {cartItems.map((item, index) => (
              <div key={index}>
                <CartItem
                  dish_name={item.dish_name}
                  dish_price={item.dish_price}
                  extra_deets={item.extra_deets}
                  image={item.image}
                  ingredients={item.ingredients}
                  qty={item.qty}
                  total={item.total}
                  id={item.id}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center mt-80 ">
            <CiViewList style={{ fontSize: 60, color: '#A9A9A9' }} />
          </div>
          <p className="text-center pt-5" style={{ color: '#A9A9A9' }}>
            There are no items in your order list
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
