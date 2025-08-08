import React, { useContext, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import upload from "../assets/upload image.jpg";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function Add() {
  let [image1, setImage1] = useState(false);
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  let { serverUrl } = useContext(authDataContext);

  const handleAddProduct = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      let result = await axios.post(
        serverUrl + "/api/product/addproduct",
        formData,
        { withCredentials: true }
      );

      toast.success("ADD Product Successfully");
      setLoading(false);

      if (result.data) {
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Add Product Failed");
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-black to-neutral-900 text-black overflow-x-hidden relative">
      <Nav />
      <Sidebar />

      <div className="w-[82%] min-h-screen flex items-center justify-start overflow-x-hidden absolute right-0 py-12 px-4">
        <form
          onSubmit={handleAddProduct}
          className="w-full md:max-w-[88%] mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-gray-300 flex flex-col gap-8 py-10 px-4 md:px-16"
        >
          <div className="text-[30px] md:text-[40px] font-extrabold mb-2 text-center text-black tracking-tight">
            Add Product Page
          </div>

          {/* Images Upload */}
          <div className="flex flex-col gap-4">
            <label className="text-[20px] md:text-[25px] font-semibold text-black/90">Upload Images</label>
            <div className="flex items-center gap-4">
              {[image1, image2, image3, image4].map((img, i) => (
                <label
                  key={i}
                  htmlFor={`image${i + 1}`}
                  className="w-20 h-20 md:w-[100px] md:h-[100px] cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition shadow"
                >
                  <img
                    src={!img ? upload : URL.createObjectURL(img)}
                    alt=""
                    className="w-[75%] h-[75%] object-cover rounded-md"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id={`image${i + 1}`}
                    hidden
                    onChange={(e) => {
                      const val = e.target.files[0];
                      if (i === 0) setImage1(val);
                      else if (i === 1) setImage2(val);
                      else if (i === 2) setImage3(val);
                      else setImage4(val);
                    }}
                    required
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] md:text-[25px] font-semibold text-black/90">Product Name</label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full max-w-[600px] h-[44px] rounded-lg border-2 border-gray-300 focus:border-blue-400 bg-white px-4 text-[17px] placeholder:text-gray-400 shadow"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          {/* Product Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] md:text-[25px] font-semibold text-black/90">Product Description</label>
            <textarea
              placeholder="Type here"
              className="w-full max-w-[600px] h-[90px] rounded-lg border-2 border-gray-300 focus:border-blue-400 bg-white px-4 py-2 text-[17px] placeholder:text-gray-400 shadow"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>

          {/* Category and Subcategory */}
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col gap-2 w-full max-w-xs">
              <label className="text-[20px] md:text-[22px] font-semibold text-black/90">Product Category</label>
              <select
                className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-[17px] focus:border-blue-400 shadow"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-xs">
              <label className="text-[20px] md:text-[22px] font-semibold text-black/90">Sub-Category</label>
              <select
                className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-[17px] focus:border-blue-400 shadow"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] md:text-[25px] font-semibold text-black/90">Product Price</label>
            <input
              type="number"
              placeholder="₹ 2000"
              className="w-full max-w-[600px] h-[44px] rounded-lg border-2 border-gray-300 focus:border-blue-400 bg-white px-4 text-[17px] placeholder:text-gray-400 shadow"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          {/* Size Selectors */}
          <div className="flex flex-col gap-2 py-2">
            <label className="text-[20px] md:text-[25px] font-semibold text-black/90">Product Size</label>
            <div className="flex gap-4 flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((sz) => (
                <div
                  key={sz}
                  className={`px-6 py-2 rounded-lg bg-white border-2 cursor-pointer text-[17px] shadow transition ${
                    sizes.includes(sz)
                      ? "bg-green-400 text-black border-blue-400"
                      : "border-gray-300 text-black/80 hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(sz)
                        ? prev.filter((item) => item !== sz)
                        : [...prev, sz]
                    )
                  }
                >
                  {sz}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="checkbox"
              className="w-6 h-6 accent-black cursor-pointer"
              checked={bestseller}
              onChange={() => setBestSeller((prev) => !prev)}
            />
            <label htmlFor="checkbox" className="text-[18px] md:text-[22px] font-semibold text-black/90">
              Add to BestSeller
            </label>
          </div>

          {/* Submit Button */}
          <button
            className="w-[180px] px-6 py-4 rounded-xl text-black font-bold
                      bg-black/10 hover:bg-white/90 border border-black/10
                      flex items-center justify-center gap-2
                      transition-all duration-300 ease-in-out
                      hover:shadow-xl active:scale-95"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
