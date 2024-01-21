import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd, IoIosArrowRoundBack } from 'react-icons/io';
import ProductLine from './ProductLine';
import { useSelector, useDispatch } from 'react-redux';
import '../css/FoodItems.css';
import { db, storage } from '../services/Firebase';
import { setData } from '../redux/productSlice';
import { collection, getDocs } from 'firebase/firestore';
import { AiOutlineSearch } from 'react-icons/ai';
import { LiaTimesSolid } from 'react-icons/lia';
import '../css/menu.css';

function FoodItemsList() {
  const [uploadedData, setUploadedData] = useState([]);
  const [searchText, setSearchText] = useState('');

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
    };
    fetchDataFromFirebase();
  }, []);

  const allProducts = useSelector((state) => state.product.productList);
  // console.log(allProducts)

  const searchedProducts = allProducts.filter((product) => {
    if (searchText.trim() === '') {
      return false;
    }
    return product.dish_name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      {/* <div className="table-container"> */}
      <div className="p-2 flex items-center justify-between">
        <Link to="/upload" className="">
          <IoIosArrowRoundBack style={{ fontSize: '30px' }} />{' '}
        </Link>
        <p>View Items</p>
        <Link to="/list">
          <div></div>
        </Link>
      </div>

      <div className="search">
        <div></div>
        <div className="search-container">
          <AiOutlineSearch fontSize="22px" />
          <input
            type="text"
            placeholder="Search for dish"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText !== '' && (
            <LiaTimesSolid onClick={() => setSearchText('')} />
          )}
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Dish Name</th>
              <th>Dish Price</th>
              <th>Dish Category</th>
              <th>Ingredients</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          {searchText === '' ? (
            <tbody>
              <ProductLine data={allProducts} />
   
            </tbody>
          ) : (
            <tbody className="filtered">
              {searchText === '' ? (
                <div className="empty-search"> </div>
              ) : searchedProducts.length === 0 ? (
                <p>Item can't be found.</p>
              ) : (
                <ProductLine data={searchedProducts} />
              )}
            </tbody>
          )}
        </table>
      </div>
      {/* </div> */}
    </>
  );
}

export default FoodItemsList;
