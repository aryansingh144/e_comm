import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from "../component/CartTotal";

function Cart() {
  const { products, currency, cartItem, updateQuantity } =
    useContext(shopDataContext);
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
    <div className="w-full min-h-screen p-5 bg-black text-white overflow-x-hidden  ">
      <div className="text-start mt-20">
        <Title text1="YOUR" text2="CART" />
      </div>


      <div className="w-full flex flex-col lg:flex-row gap-6 mt-10 border-t border-white/20 pt-6">

        <div className="flex-1 bg-white/80 rounded-2xl shadow-lg p-4">
          <div className="inline-flex gap-2 items-center text-[30px] md:text-[35px] font-bold mb-6 mx-10 ">
            <p
              className="text-black bg-[#a2a2a2] backdrop-blur-3xl px-6 py-3 rounded-2xl shadow-xl uppercase "
              style={{
                WebkitBackdropFilter: "blur(8px)",
                backdropFilter: "blur(8px)",
              }}
            >
              YOUR <span className="text-black">BUCKET</span>
            </p>
          </div>

          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={index}
                className="bg-black mx-10 text-white p-4 rounded-xl shadow-md mb-4 relative transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-4 ">
                  <img
                    src={productData.image1}
                    alt={productData.name}
                    className="w-[80px] h-[80px] object-cover rounded-lg border border-black"
                  />

                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-lg">{productData.name}</p>
                    <p className="text-sm">
                      Size: <span className="font-medium">{item.size}</span>
                    </p>
                    <p className="text-sm">
                      Price: {currency} {productData.price}
                    </p>
                  </div>

                  <div className="ml-auto flex flex-row items-end gap-2">
                    <input
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      className="w-16 px-2 py-1 text-black text-center rounded border border-white bg-white/80 backdrop-blur"
                      onChange={(e) =>
                        e.target.value.trim() === "" || e.target.value === "0"
                          ? null
                          : updateQuantity(
                              item._id,
                              item.size,
                              Number(e.target.value)
                            )
                      }
                    />
                    <RiDeleteBin6Line
                      className="text-white/80 hover:text-red-600 cursor-pointer w-8 h-7"
                      onClick={() => {
                        
                          // window.confirm("Remove this item from your bucket?")
                        {
                          updateQuantity(item._id, item.size, 0);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        <div className="max-w-[1200px] min-h-[400px] max-h-[400px] flex flex-col lg:flex-row justify-center items-start gap-4 px-4 bg-white/80 rounded-2xl shadow-xl">
          <CartTotal />
          <div className="self-end mb-15">
            <button
              className="text-sm bg-black text-white  hover:bg-white hover:text-black transition-all duration-200 px-5 py-2 rounded-xl mt-6 w-full lg:w-auto font-semibold "
              onClick={() => {
                if (cartData.length > 0) {
                  navigate("/placeorder");
                } else {
                  console.log("Your cart is empty!");
                }
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
