import React from 'react'
import { Link } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { IoMdAdd, IoIosArrowRoundBack } from 'react-icons/io';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Feedback() {
 
  return (
    <div>
      <header className="flex justify-between p-1 items-center relative">
        <Link to="/">
          <IoIosArrowRoundBack style={{ fontSize: '30px' }} />{' '}
        </Link>
        <p className="dish-name">Feedback</p>
        <div></div>
      </header>
      <div>
        <Modal />
      </div>
    </div>
  );
}

export default Feedback
