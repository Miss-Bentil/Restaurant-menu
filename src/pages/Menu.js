import React, { useState, useEffect } from 'react';
import { db, storage } from '../services/Firebase';
import { setData } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import food3 from '../assets/food3.jpg';
import food1 from '../assets/food1.jpg';
import food4 from '../assets/food4.jpg';
import Card from '../components/Card';
import { LiaTimesSolid } from 'react-icons/lia';
import { LineWave } from 'react-loader-spinner';

import { CiHeart } from 'react-icons/ci';

import '../css/menu.css';

function Menu() {
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // const [searchedProducts, setSearchedProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      const menuSnapshot = await getDocs(collection(db, 'menu'));
      const menuData = menuSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setData(menuData));
      setUploadedData(menuData);
      setIsLoading(false);
    };
    fetchDataFromFirebase();
  }, []);

  const TotalProducts = useSelector((state) => state.product.productList);
  const filteredProducts = TotalProducts.filter((product) => {
    if (selectedCategory === 'All') {
      return true;
    } else {
      return product.category === selectedCategory;
    }
  });

  //Cart

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  // Search

  const searchedProducts = TotalProducts.filter((product) => {
    if (searchText.trim() === '') {
      return false;
    }
    return product.dish_name.toLowerCase().includes(searchText.toLowerCase());
  });




  return (
    <div style={{ padding: '0 20px' }}>
      <header className="flex justify-between p-1 items-center relative">
        <Link to="/">
          <IoIosArrowRoundBack style={{ fontSize: '30px' }} />{' '}
        </Link>

        <p className="dish-name">A nice restaurant</p>

        <Link to="/cart" className="cart-icon ">
          <CiHeart style={{ fontSize: '25px' }} />
          <div className="cart-number  ">{cartItemNumber.length}</div>
        </Link>
      </header>

      <div className="search">
        <div className="search-container">
          <AiOutlineSearch fontSize="22px" />
          <input
            type="text"
            placeholder="Search for dish"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ outline: 'none' }}
          />
          {searchText !== '' && (
            <LiaTimesSolid onClick={() => setSearchText('')} />
          )}
        </div>
      </div>
      <div className="filtered">
        {searchText === '' ? (
          <div className="empty-search"> </div>
        ) : searchedProducts.length === 0 ? (
          <p>Item can't be found.</p>
        ) : (
          <Card data={searchedProducts} />
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center page-content-container">
          <LineWave color="#6c6a6a" height="200" width="200" />
        </div>
      ) : (
        <div className="page-content-container">
          <div className="scroll" style={{}}>
            <div className="card">
              <div className="card-dimension">
                <img
                  src={food3}
                  alt=""
                  style={{
                    width: '100%',
                    borderRadius: '20px',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className="card-caption">
                <p>Healthy food</p>
              </div>
            </div>
            <div className="card">
              <div className="card-dimension">
                <img
                  src={food4}
                  alt=""
                  style={{
                    width: '100%',
                    borderRadius: '20px',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className="card-caption">
                <p>50% Off</p>
              </div>
            </div>
            <div className="card">
              <div className="card-dimension">
                <img
                  src={food1}
                  alt=""
                  style={{
                    width: '100%',
                    borderRadius: '20px',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className="card-caption">
                <p>Nutritious food</p>
              </div>
            </div>
          </div>

          <div className="food-categories">
            <ul className="scroll" style={{ whiteSpace: 'nowrap' }}>
              <li
                className={selectedCategory === 'All' ? 'active' : ''}
                onClick={() => setSelectedCategory('All')}
              >
                All
              </li>
              <li
                className={selectedCategory === 'breakfast' ? 'active' : ''}
                onClick={() => setSelectedCategory('breakfast')}
              >
                Breakfast
              </li>
              <li
                className={selectedCategory === 'salad' ? 'active' : ''}
                onClick={() => setSelectedCategory('salad')}
              >
                Salad
              </li>
              <li
                className={selectedCategory === 'pasta' ? 'active' : ''}
                onClick={() => setSelectedCategory('pasta')}
              >
                Pasta
              </li>
              <li
                className={selectedCategory === 'pizza' ? 'active' : ''}
                onClick={() => setSelectedCategory('pizza')}
              >
                Pizza
              </li>
              <li
                className={selectedCategory === 'soups' ? 'active' : ''}
                onClick={() => setSelectedCategory('soups')}
              >
                Soups
              </li>
              <li
                className={selectedCategory === 'starters' ? 'active' : ''}
                onClick={() => setSelectedCategory('starters')}
              >
                Starters
              </li>
              <li
                className={selectedCategory === 'desserts' ? 'active' : ''}
                onClick={() => setSelectedCategory('desserts')}
              >
                Desserts
              </li>
              <li
                className={selectedCategory === 'fresh-juice' ? 'active' : ''}
                onClick={() => setSelectedCategory('fresh-juice')}
              >
                Fresh Juice
              </li>
              <li
                className={selectedCategory === 'hot-beverages' ? 'active' : ''}
                onClick={() => setSelectedCategory('hot-beverages')}
              >
                Hot Beverages
              </li>
              <li
                className={
                  selectedCategory === 'cold-beverages' ? 'active' : ''
                }
                onClick={() => setSelectedCategory('cold-beverages')}
              >
                Cold Beverages
              </li>
              <li
                className={selectedCategory === 'mocktails' ? 'active' : ''}
                onClick={() => setSelectedCategory('mocktails')}
              >
                Mocktails
              </li>
              <li
                className={selectedCategory === 'shisha' ? 'active' : ''}
                onClick={() => setSelectedCategory('shisha')}
              >
                Shisha
              </li>
            </ul>

            <div className="horizontalLine mt-2"></div>
          </div>

          <div className="  ">
            {filteredProducts.length === 0 ? (
              <p
                className="flex items-center justify-center  pt-20"
                style={{ color: '#A9A9A9' }}
              >
                There are no items in this category.
              </p>
            ) : (
              <Card data={filteredProducts} />
            )}
          </div>
        </div>
      )}

      {/* {searchText === '' ? <p>ad</p> : <p></p>} */}
    </div>
  );
}

export default Menu;
