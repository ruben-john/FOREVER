import React, { use, useContext,useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const {products,search ,showSearch}=useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item => item !== e.target.value));
    }
    else{
        setCategory(prev=>[...prev,e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)) {
      setSubCategory(prev=>prev.filter(item => item !== e.target.value));
    }
    else{
        setSubCategory(prev=>[...prev,e.target.value]);
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search.length > 0) {
        productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy= filterProducts.slice();
    switch(sortType){
        case 'low-high':
            setFilterProducts(fpCopy.sort((a,b)=> a.price - b.price));
            break;
        case 'high-low':
           setFilterProducts(fpCopy.sort((a,b)=> b.price - a.price));
            break;
        default:
            applyFilter();
            break;
    }
  }

  useEffect(() => {
    applyFilter();
  },[category, subCategory,search,showSearch,products]);

  useEffect(() => {
    sortProduct();
  },[sortType]);

  
    return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/* filter options */}
        <div className='min-w-60'>
            <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={()=>setShowFilter(!showFilter)}>Filters
                <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90':''}`} />
            </p>
            {/* category filter */}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>Categories</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/> Men
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/> Women
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/> Kids
                    </p>
                </div>
            </div>
            {/* subcat filters  */}
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '':'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>Type</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
                    </p>
                </div>
            </div>
        </div>

        {/* right */}
        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={"ALL"} text2={'COLLECTIONS'}/>
                {/* sorting */}
                <select className='border-2 border-gray-300 text-sm px-2' onChange={(e)=>setSortType(e.target.value)}>
                    <option value="relavent">Sort by: Relevent</option>
                    <option value="low-high">Sort by: Low to High</option>
                    <option value="high-low">Sort by: High to Low</option>
                </select>
            </div>
            {/* map products */}

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
                {filterProducts.map((item,index)=>(
                    <ProductItem key={index}
                        id={item._id} 
                        image={item.image} 
                        name={item.name} 
                        price={item.price}/>
                ))}
            </div>
        </div>
      
    </div>
  )
}

export default Collection
