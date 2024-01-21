import React, { useEffect, useState } from 'react';
import '../css/upload.css';
import { BsCloudUpload } from 'react-icons/bs';
import { Imagetobase64 } from '../utility/imagetobase64';
import { db, storage } from '../services/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd, IoIosArrowRoundBack } from 'react-icons/io';
import image from '../assets/drink2.jpg';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';

function Upload() {
  const addMealRef = collection(db, 'menu');
  let navigate = useNavigate();

  const [data, setData] = useState({
    dish_name: '',
    dish_price: '',
    ingredients: '',
    category: '',
    extra_deets: '',
    image: '',
    time: '',
  });
  // console.log(data.image)
  // Inside the functional component
  const [focusedFields, setFocusedFields] = useState({
    dish_name: false,
    dish_price: false,
    ingredients: false,
    category: false,
    extra_deets: false,
    image: false,
    time: false,
  });

  const [imageUrls, setImageUrls] = useState([]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  
  const imageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // You can log the file object to the console for debugging
      console.log('File:', file);

      // Update the state with the file object
      setData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };



  const handleSubmit = async (e) => {
    try {
      // Prevent the default form submission behavior
      e.preventDefault();

      // Reference to the storage location for the image
      const imgRef = ref(storage, `foodImages/${data.image.name + v4()}`);
      console.log(imgRef);

      // Upload the image to storage
      await uploadBytes(imgRef, data.image);

      // Get the download URL for the uploaded image
      const imageURL = await getDownloadURL(imgRef);


      // Add the document to Firestore with the image URL
      await addDoc(addMealRef, {
        dish_name: data.dish_name,
        dish_price: data.dish_price,
        ingredients: data.ingredients,
        category: data.category,
        extra_deets: data.extra_deets,
        image: imageURL,
        time: data.time,
      });
     
      setData((prevData) => ({
        ...prevData,
        image: imageURL,
      }
      ));

      // Optional: Display a success message
      alert('Image uploaded successfully');
      setData({
        dish_name: '',
        dish_price: '',
        ingredients: '',
        category: '',
        extra_deets: '',
        image: '',
        time: '',
      });
    } catch (error) {
     
      console.error('Error during image upload:', error);
     
      alert('Error during image upload. Please try again.');
    }
  };

  return (
    <div>
      <div className="p-2 flex items-center justify-between">
        <Link to="/" className="">
          <IoIosArrowRoundBack style={{ fontSize: '30px' }} />{' '}
        </Link>
        <p>Upload</p>
        <Link to="/list">
          <div>View food items</div>
        </Link>
      </div>
      <div className="flex justify-center pt-10 h-screen ">
        <div className=" ">
          <form className="contact-form " onSubmit={handleSubmit}>
            <div className="input_wrap mb-4">
              <input
                type="text"
                // class="contact_input"
                name="dish_name"
                value={data.dish_name}
                className="contact_input"
                autoComplete="off"
                onFocus={() =>
                  setFocusedFields((prev) => ({ ...prev, dish_name: true }))
                }
                onBlur={() =>
                  setFocusedFields((prev) => ({ ...prev, dish_name: false }))
                }
                onChange={handleOnChange}
                required
              />
              <label
                htmlFor="name"
                className={`label ${
                  focusedFields.dish_name || data.dish_name ? 'focused' : ''
                }`}
              >
                Dish Name
              </label>
            </div>
            <div className="input_wrap mb-4">
              <input
                type="text"
                // class="contact_input"
                name="dish_price"
                value={data.dish_price}
                className="contact_input"
                autoComplete="off"
                onFocus={() =>
                  setFocusedFields((prev) => ({ ...prev, dish_price: true }))
                }
                onBlur={() =>
                  setFocusedFields((prev) => ({ ...prev, dish_price: false }))
                }
                onChange={handleOnChange}
                required
              />
              <label
                htmlFor="dish_price"
                className={`label ${
                  focusedFields.dish_price || data.dish_price ? 'focused' : ''
                }`}
              >
                Dish Price
              </label>
            </div>

            <div className="input_wrap mb-4">
              <input
                type="text"
                // class="contact_input"
                name="extra_deets"
                value={data.extra_deets}
                className="contact_input"
                autoComplete="off"
                onFocus={() =>
                  setFocusedFields((prev) => ({ ...prev, extra_deets: true }))
                }
                onBlur={() =>
                  setFocusedFields((prev) => ({ ...prev, extra_deets: false }))
                }
                onChange={handleOnChange}
              />
              <label
                htmlFor="extra_deets"
                className={`label ${
                  focusedFields.extra_deets || data.extra_deets ? 'focused' : ''
                }`}
              >
                Extra Deets
              </label>
            </div>

            <div className="input_wrap mb-4 ">
              <input
                type="text"
                placeholder={focusedFields.time ? 'eg. 20mins' : ''}
                name="time"
                value={data.time}
                className="contact_input"
                autoComplete="off"
                onFocus={() =>
                  setFocusedFields((prev) => ({ ...prev, time: true }))
                }
                onBlur={() =>
                  setFocusedFields((prev) => ({ ...prev, time: false }))
                }
                onChange={handleOnChange}
              />
              <label
                htmlFor="time"
                className={`label ${
                  focusedFields.time || data.time ? 'focused' : ''
                }`}
              >
                Duration
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="ingredients" className="outside-label">
                Ingredients:
              </label>{' '}
              <br />
              <textarea
                id="ingredients"
                name="ingredients"
                rows="5"
                cols="40"
                value={data.ingredients}
                onChange={handleOnChange}
                className="p-2 resize-none"
                style={{outline:'none'}}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="mb-3 outside-label">
                Upload Image
                <div
                  className="upload-box w-full   flex items-center justify-center cursor-pointer"
                  style={{ borderRadius: '8px' }}
                >
                  {data.image ? (
                    <img
                      src={data.image}
                      className="h-full w-full object-cover "
                      style={{ borderRadius: '8px' }}
                    />
                  ) : (
                    <span className="text-5xl">
                      <BsCloudUpload />
                    </span>
                  )}

                  <input
                    type="file"
                    id="image"
                    className="hidden mb-4 input"
                    accept="image/*"
                    onChange={imageChange}
                    name="image"
                  />
                </div>
              </label>
            </div>

            {/* <div>
            <label htmlFor="time">Time to get ready</label>
            <input type="text" placeholder="eg. 20-30min" name="time" />
          </div> */}

            <select
              name="category"
              id=""
              className="  mb-3 my-1  custom-dropdown"
              onChange={handleOnChange}
            >
              <option value={''} style={{ color: '#848484' }}>
                Select Category
              </option>
              <option value={'breakfast'}>Breakfast</option>
              <option value={'salad'}>Salad</option>
              <option value={'pasta'}>Pasta</option>
              <option value={'pizza'}>Pizza</option>
              <option value={'soups'}>Soups</option>
              <option value={'starters'}>Starters</option>
              <option value={'meat-corner'}>Meat Corner</option>
              <option value={'extras'}>Extras</option>
              <option value={'dessert'}>Dessert</option>
              <option value={'fresh-juice'}>Fresh Juices</option>
              <option value={'hot-beverages'}>Hot Beverages</option>
              <option value={'cold-beverages'}>Cold Beverages</option>
              <option value={'mocktails'}>Mocktails</option>
              <option value={'shisha'}>Shisha</option>
            </select>
            <div></div>
            <button type="submit">Submit</button>
          </form>
          <div className="button  w-20 text-center p-1 text-white"></div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
