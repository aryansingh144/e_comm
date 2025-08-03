import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full lg:ml-[30px] text-white">
      <div className="text-xl py-3">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-4 mt-4 text-sm p-6 border border-white/20 rounded-xl bg-[#0f0f0f] shadow-md shadow-black/50">
        <Row label="Subtotal" value={`${currency} ${subtotal}.00`} />
        <Divider />
        <Row label="Shipping Fee" value={`${currency} ${delivery_fee}`} />
        <Divider />
        <Row label="Total" value={`${currency} ${total}`} bold />
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex justify-between items-center text-base px-2">
      <p className={bold ? 'font-semibold' : ''}>{label}</p>
      <p className={bold ? 'font-semibold' : ''}>{value}</p>
    </div>
  );
}

function Divider() {
  return <hr className="border-white/10" />;
}

export default CartTotal;
