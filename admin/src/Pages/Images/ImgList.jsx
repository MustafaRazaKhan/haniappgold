import React, { useEffect, useState } from 'react'
import { useProduct } from '../../Context/Products'
import LeftBar from '../../Components/LeftBar'
import RightBar from '../../Components/RightBar'
import Heading from '../../Components/Heading'
import {  FaTrash, FaUserEdit } from "react-icons/fa";
import { toast } from 'react-toastify'

const ImgList = () => {
  const [images, setImages] = useState([]);
  const[isDelete,setIsDelete] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/photo/photos');
        const data = await response.json();

        if (data.success) {
          setImages(data.allPhotos); // Set the fetched images
        } else {
          console.error(data.msg);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [isDelete]);
  const deletePhoto = async (id) => {
    console.log(id)
    setIsDelete(true)
    try {
      const response = await fetch(`http://localhost:8080/api/photo/delete/${id}`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
      if (data.success) {
        setIsDelete(false)
        toast.success(data.msg);
        console.log('Photo deleted successfully');
        // Update the frontend state to remove the deleted image
      } else {
        console.error(data.msg);
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };
  
    return (
      <div className="flex w-full min-h-screen">
        <LeftBar/>
        <RightBar>
         
          <div className="table-container overflow-x-scroll w-[100%] p-2">
            <Heading title="Image List" />
            <table className="w-full ">
              <thead className="bg-gray-400 text-white">
                <tr className="border-b-[2px] border-black text-center">
                  <th className="p-2">S.no</th>
                 
                 
                  <th>Slider Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="border-b-[2px] border-black text-center">
                {images.map((image, index) => {
                  return (
                    <tr className="border-b-[2px] text-center" key={image._id}>
                      <td>{index+1}</td>
                      <td className="">
                        <div className="flex justify-center">
                       
  {/* <Image
  source={{ uri: `data:${image.contentType};base64,${image.data.toString('base64')}` }}
  style={{ width: 100, height: 100 }}


/> */}
                        <img
                    src={`data:${image.contentType};base64,${image.data.toString('base64')}`} // Display the image as a Base64 string
                    alt="Uploaded"
                    className="w-[50px] h-[50px]"
                  />
                        </div>
                      </td>
                      <td className="">
                        <div className="flex justify-center gap-4">
                          <FaTrash className="text-red-600 font-bold" onClick={()=>deletePhoto(image._id)} />
                           
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </RightBar>
      </div>
    );
}

export default ImgList