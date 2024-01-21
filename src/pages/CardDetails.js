import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack, IoMdAdd } from 'react-icons/io';
import { BsExclamationTriangle } from 'react-icons/bs';
import detailpic from '../assets/detail2.jpg';
import drink1 from '../assets/drink1.jpg';
import drink2 from '../assets/drink2.jpg';
import drink3 from '../assets/drink3.jpg';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartItems } from '../redux/productSlice';
import { toast } from 'react-hot-toast';
import { CiHeart } from 'react-icons/ci';
import '../css/card-detail.css';
import { useSelector } from 'react-redux';

function CardDetails() {
  const { id } = useParams();

  const dishData = useSelector((state) => state.product.productList);

  const dishDisplay = dishData.find((item) => item.id === id);


    const dispatch = useDispatch();
    const handleAddCart = () => {
      dispatch(
        addCartItems({
          dish_name: dishDisplay.dish_name,
          dish_price: dishDisplay.dish_price,
          ingredients: dishDisplay.ingredients,
          category: dishDisplay.category,
          extra_deets: dishDisplay.extra_deets,
          image: dishDisplay.image,
        })
      );
      toast(`${dishDisplay.dish_name} added to order list`);
    };

  return (
    <div style={{ padding: '0 20px' }}>
      <header className="flex justify-between p-1 items-center">
        <Link to="/menu">
          <IoIosArrowRoundBack style={{ fontSize: '30px' }} />
        </Link>
        <p className="dish-name">{dishDisplay.dish_name}</p>
        <Link to="">
          {/* <div className="addition-box"> */}

          <CiHeart
            className="addition-sign"
            onClick={handleAddCart}
            style={{ fontSize: '25px' }}
          />
          {/* </div> */}
        </Link>
      </header>
      <div className="page-content-container">
        <div className="card-detail-container ">
          <div className="main-food-detail-img-container">
            <div className="food-detail-img-container">
              <img src={dishDisplay.image} alt="" className="food-detail-img" />
            </div>
          </div>
          <div className="card-detail-content">
            {/* <div className="dish-name">English Breakfast</div> */}
            <div className="food-category">Vegan</div>
            <div>
              <div className="ingredients">Ingredients</div>
              <p>{dishDisplay.ingredients}</p>
              <div className="allergens">
                {/* <BsExclamationTriangle className="warning" /> */}
                <h4>Allergy Information</h4>
                <p>
                  Not all ingredients are listed in the menu. Before placing
                  your order, please contact the restaurant if a person in your
                  party has a food allergy or other food sensitivities
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="recommended-beverages">
          <p>Recommended Beverages</p>
          <div className="scroll" style={{}}>
            <div className="card">
              <div style={{ width: '290px', height: '150px' }}>
                <img
                  src={drink1}
                  alt=""
                  style={{
                    width: '100%',
                    borderRadius: '20px',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
            <div className="card">
              <div style={{ width: '290px', height: '150px' }}>
                <img
                  src={drink2}
                  alt=""
                  style={{
                    width: '100%',
                    borderRadius: '20px',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
            <div className="card">
              <div style={{ width: '290px', height: '150px' }}>
                <img
                  src={drink3}
                  alt=""
                  style={{
                    width: '100%',
                    borderRadius: '20px',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
