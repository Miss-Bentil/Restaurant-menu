import React, { useEffect, useState } from 'react';
import food4 from '../assets/food4.jpg';
import { IoMdAdd, IoIosArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { AiFillQqCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { addCartItems, removeCartItem } from '../redux/productSlice';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import FoodItemsList from '../pages/FoodItemsList';

function Card({ data }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [likedCards, setLikedCards] = useState([]);

  const dispatch = useDispatch();
  const handleAddCart = (item) => {
    dispatch(
      addCartItems({
        dish_name: item.dish_name,
        dish_price: item.dish_price,
        ingredients: item.ingredients,
        category: item.category,
        extra_deets: item.extra_deets,
        image: item.image,
        id: item.id,
        time: item.time,
      })
    );
    // toast(`${item.dish_name} added to order list`);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)), // 2s delay
      {
        loading: `${item.dish_name} added to order list`,
        success: `${item.dish_name} added to order list`,
        error: `${item.dish_name} couldn't be added to order list`,
      }
    );
   
  };
  // console.log(data)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleLikeToggle = (itemId) => {
    setLikedCards((prevLikedCards) => {
      if (prevLikedCards.includes(itemId)) {
        dispatch(removeCartItem(itemId));
         toast.promise(
           new Promise((resolve) => setTimeout(resolve, 2000)), 
           {
             loading: `Item removed from order list`,
             success: `Item removed from order list`,
             error: `Item couldn't be removed from order list`,
           }
         );
        return prevLikedCards.filter((id) => id !== itemId);
      } else {
        return [...prevLikedCards, itemId];
      }
    });
  };

  return (
    <div className="">
      <div className="food-items">
        {Object.values(data).map((item, index) => (
          <div key={index}>
            <div className="food-item-card">
              <Link to={`/card-details/${item.id}`}>
                <div style={{ width: '25%' }}>
                  <div className="food-item-card-img-container">
                    <img
                      src={item.image}
                      alt=""
                      style={{}}
                      className="food-item-card-img"
                    />
                  </div>
                </div>
              </Link>

              <div className="card-body">
                <div className="pl-5">
                  <div className="card-header">
                    <Link to={`/card-details/${item.id}`}>
                      <p className="card-name">{item.dish_name}</p>
                    </Link>

                    <div className="">
                      <FaHeart
                        className={`addition-sign cursor-pointer ${
                          likedCards.includes(item.id) ? 'liked' : ''
                        }`}
                        onClick={() => {
                          handleLikeToggle(item.id);
                          handleAddCart(item);
                        }}
                        style={{
                          fontSize: 23,
                          color: likedCards.includes(item.id)
                            ? 'red'
                            : '#b2b2b4',
                        }}
                      />
                    </div>
                  </div>
                  <Link to={`/card-details/${item.id}`}>
                    <div className="card-deets">
                      <p className="card-deets-text">
                        {isSmallScreen
                          ? item.ingredients.split(' ').slice(0, 4).join(' ') +
                            ' ' +
                            ' . . .'
                          : window.innerWidth <= 1024
                          ? item.ingredients.split(' ').slice(0, 6).join(' ') +
                            ' ' +
                            ' . . .'
                          : item.ingredients}
                      </p>
                      <div className="price">
                        Ghc <span>{item.dish_price}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="horizontalLine"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
