import React, { useState } from 'react';
import { db, storage } from '../services/Firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { BsThreeDots } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setData } from '../redux/productSlice';
import { BsTrash, BsFillPencilFill, BsThreeDotsVertical } from 'react-icons/bs';
// name, price, image, category, time, id, allProducts;
function ProductLine({ data }) {
  // console.log(name);
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
    console.log('a bad b')
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'menu', id));

      // Update Redux state
      const updatedProducts = data.filter((product) => product.id !== id);
      console.log(updatedProducts);
      dispatch(setData(updatedProducts));
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  const handleEdit = (id) => {};

  return (
    <>
      {Object.values(data).map((item, index) => (
        <tr className="text-center" key={index}>
          <td className="w-20 h-15">
            <img src={item.image} alt="" className="w-full h-full object-fit" />
          </td>
          <td>{item.dish_name}</td>
          <td>{item.dish_price}</td>
          <td>{item.category}</td>
          <td></td>
          <td style={{}}>{item.time}</td>
          <td>
            <div className="relative p-2">
              <BsThreeDots onClick={ handleToggleOptions} />

              {showOptions && (
                <div className="absolute top-7 right-0 bg-gray-100 p-2 flex">
                  <button className="mr-2">
                    <BsFillPencilFill onClick={() => handleEdit(item.id)} />
                  </button>
                  <button>
                    <BsTrash onClick={() => handleDelete(item.id)} />
                  </button>
                </div>
              )}
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default ProductLine;
