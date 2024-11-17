import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProductMutation, useGetProductByIdQuery, useUpdateProductMutation, useUploadProductImageMutation } from "../../redux/api/productApi";
import { toast } from "react-toastify";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApi";

const ProductUpdate = () => {
    const [product, setProduct] = useState({         
        _id: null,                                                                                                       
        name: '',
        image: '',
        description: '',
        price: '',
        category: '',
        quantity: '',
        brand: '',
        countInStock: '',
        imageUrl: null
    })
    
    const params = useParams()

    const {data: productDetail} = useGetProductByIdQuery(params.id)
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        productDetail && setProduct({...productDetail.product})
    }, [productDetail])   

    const navigate = useNavigate()

    const [uploadProductImage] = useUploadProductImageMutation()
    const {data: categories} = useGetAllCategoryQuery()

    const  formChangeHandler = (e) => {
      setProduct({...product, [e.target.id]: e.target.value})
    }

    const uploadFileHandler = async(e) => {
      const formData = new FormData()
      formData.append('image', e.target.files[0])

      try {
        const res = await uploadProductImage(formData).unwrap()
        toast.success(res.message)
        setProduct({
          ...product, 
          image: res.image,
          imageUrl: res.image
        })
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }

    }

    const submitHandler = async (e) => {
      e.preventDefault()

      try {
        const res = await updateProduct(product)

        if(!res) {
          toast.error("product updated field")
        }else{
          toast.success(`product is created`)
          navigate('/admin/allproducts/kjklk')
        }
      } catch (error) {
        toast.error("product updated field")
      }
    }

    const deleteHandler = async (e) => {
      e.preventDefault()

      try {
        const res = await deleteProduct(params.id)

        if(!res) {
          toast.error("product updated field")
        }else{
          toast.success(`product is created`)
          navigate('/admin/allproducts/kjklk')
        }
      } catch (error) {
        toast.error("product updated field")
      }
    }

  return <div className="container xl:mx-[9rem] sm:mx-[0]">
    <div className="flex flex-col md:flex-row">
        {/* <AdminMenu/> */}

        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>
          {product.imageUrl &&  (
              <div className="text-center">
                <img src={product.image} alt="product" className="block mx-auto max-h-[200px]"/>
              </div>
            )}

            <div className="mb-3">
              <label className="border px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {product.image? product.image.name: "upload image"}
                <input type="file" name="image" accept="image/*" onChange={uploadFileHandler} className={!product.image? "hidden": "text-white"}/>
              </label>
            </div>

            <div className="">
              <div className="grid grid-cols-2 gap-6">

                <div className="">
                  <label>Name</label><br />
                  <input type="text" id="name" className="p-4 mb-3 w-full border rounded-lg" value={product.name} onChange={formChangeHandler}/>
                </div>

                <div className="">
                  <label>Price</label><br />
                  <input type="number" id="price" className="p-4 mb-3 w-full border rounded-lg" value={product.price} onChange={formChangeHandler}/>
                </div>

                <div className="">
                  <label>Quantity</label><br />
                  <input type="number" id="quantity" className="p-4 mb-3 w-full border rounded-lg" value={product.quantity} onChange={formChangeHandler}/>
                </div>

                <div className="">
                  <label>Brand</label><br />
                  <input type="text" id="brand" className="p-4 mb-3 w-full border rounded-lg" value={product.brand} onChange={formChangeHandler}/>
                </div>

                <div className="col-span-2">
                  <label>Description</label><br />
                  <input type="text" id="description" className="p-4 mb-3 w-full border rounded-lg" value={product.description} onChange={formChangeHandler}/>
                </div>

                <div className="">
                  <label>Stock</label><br />
                  <input type="number" id="stock" className="p-4 mb-3 w-full border rounded-lg" value={product.countInStock} onChange={formChangeHandler}/>
                </div>

                <div className="">
                  <label>Category</label><br />
                  <select className="p-4 mb-3 w-full border rounded-lg" value={product.category} onChange={formChangeHandler}>
                    <option disabled>-- choose category --</option>
                    {
                      categories && categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <button type="button" className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 text-white" onClick={submitHandler}>Update Product</button>
                <button type="button" className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-red-600 text-white" onClick={deleteHandler}>Delete Product</button>
              </div>
            </div>
        </div>
    </div>
  </div>;
};

export default ProductUpdate;
