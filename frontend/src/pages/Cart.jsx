import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="w-full min-h-screen p-5 bg-white overflow-x-hidden">
      <div className="text-center mt-20">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Two-column layout starts here */}
      <div className="w-full flex flex-col lg:flex-row gap-4 mt-10">
        {/* Left: Cart Items */}
        <div className="flex-1 flex flex-col gap-6">
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className="w-full border-t border-b border-black py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-black backdrop-blur-md shadow-xl p-4 rounded-2xl text-white relative">
                  <img
                    src={productData.image1}
                    alt=""
                    className="w-[100px] h-[100px] object-cover rounded-md border border-white"
                  />

                  <div className="flex flex-col justify-center gap-2">
                    <p className="text-lg sm:text-xl font-semibold">{productData.name}</p>
                    <div className="flex items-center gap-6">
                      <p className="text-md sm:text-lg">
                        {currency} {productData.price}
                      </p>
                      <span className="w-10 h-10 flex items-center justify-center rounded border border-white text-sm bg-white/10">
                        {item.size}
                      </span>
                    </div>
                  </div>

                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="absolute top-4 right-16 sm:top-1/2 sm:-translate-y-1/2 sm:right-32 w-16 text-center text-white px-2 py-1 rounded border border-white bg-white/50 backdrop-blur"
                    onChange={(e) =>
                      e.target.value.trim() === '' || e.target.value === '0'
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                  />

                  <RiDeleteBin6Line
                    className="text-white hover:text-red-500 cursor-pointer w-6 h-6 absolute top-4 right-4 sm:top-1/2 sm:-translate-y-1/2"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to remove this item from the cart?")) {
                        updateQuantity(item._id, item.size, 0);
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Cart Total + Button */}
        <div className="max-w-[1200px] mx-auto flex flex-wrap lg:flex-row gap-4 mt-10 px-4">

        {/* <div className="w-full lg:w-[400px] justify-end"> */}
          <CartTotal />
          <button
            className="text-sm bg-black text-white border border-black hover:bg-white hover:text-black transition-all duration-200 px-5 py-2 rounded-xl mt-6 w-full lg:w-auto"
    
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("Your cart is empty!");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Cart;
