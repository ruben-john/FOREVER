import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
    }
  return (
    <div className='text-center'>
      <p className='text-xl font-medium text-gray-800'>Subscribe now and get 20% off </p>
      <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit ametrod cupiditate, quam at molestiae, labore voluptates eum.</p>
      <form onSubmit={onSubmitHandler} action="" className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input type="email" className='w-full sm:flex-1 outline-none' placeholder='Enter your email' required />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
