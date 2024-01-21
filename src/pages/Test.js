import React, { useEffect, useState } from 'react';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../services/Firebase';
import { setData } from '../redux/productSlice';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';

function Test() {
  const [imgList, setImageList] = useState([]);
  const imgListRef = ref(storage, 'foodImages/');
  const dispatch = useDispatch();
  // useEffect(() => {
  //   listAll(imgListRef)
  //     .then(async (response) => {
  //       const urls = [];

  //       for (const item of response.items) {
  //         try {
  //           const url = await getDownloadURL(item);
  //           urls.push(url);
  //         } catch (error) {
  //           console.error('Error getting image URL:', error);
  //         }
  //       }
  //       dispatch(setData(urls));
  //       setImageList(urls);
  //     })
  //     .catch((error) => {
  //       console.error('Error listing images:', error);
  //     });
  // }, []);

 const [uploadedData, setUploadedData] = useState([]);

 useEffect(() => {
   // Create a function to fetch the data from Firebase and set it in state
   const fetchDataFromFirebase = async () => {
     // Fetch data from Firestore, assuming you have a collection called 'menu'
     const menuSnapshot = await getDocs(collection(db, 'menu'));
     const menuData = menuSnapshot.docs.map((doc) => doc.data());

     // Dispatch the data to the setData action
     dispatch(setData(menuData));

     // Set the fetched data in state
     setUploadedData(menuData);
   };

   // Call the function to fetch data when the component loads
   fetchDataFromFirebase();
 }, []);

  return (
    // <div className="">
    //   {imgList.map((url, index) => {
    //     return <img key={index} src={url} alt={`Image ${index}`} />;
    //   })}
    // </div>
    <div className="flex justify-center pt-10 h-screen">
      {/* Display the fetched data and their images here */}
      {uploadedData.map((item, index) => (
        <div key={index}>
          <p>Dish Name: {item.dish_name}</p>
          <p>Dish Price: {item.dish_price}</p>
          <p>Ingredients: {item.ingredients}</p>
          <p>Category: {item.category}</p>
          <p>Extra Details: {item.extra_deets}</p>
          <img src={item.image} alt="Dish" />
        </div>
      ))}
    </div>
  );
}

export default Test;
