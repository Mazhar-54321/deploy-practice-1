import React, { useEffect, useState } from 'react'
import { collection, db, getDocs } from '../firebaseConfig';
import { Box, CircularProgress, Typography } from '@mui/material';
import { EditOrDeleteProduct,NoDataWidget } from './Product';

const DisplayProducts = () => {
  const[loading,setLoading]=useState(false);  
  const [products,setProducts]=useState([]);
  useEffect(()=>{
   fetchEvents();
  },[])  
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const productsCollection = collection(db, "products"); // "products" collection reference
      const productsSnapshot = await getDocs(productsCollection); // Saara data fetch karo
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document ka data
      }));
      setProducts(productsList); // State mein save karo
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
       { loading ? (
    <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1200,
            }}
          >
            <CircularProgress />
          </Box>
  ):
  (
  Boolean(products?.length)?<div>
    <div style={{fontSize:'10px',fontWeight:'bold',marginBottom:'10px'}}>Call Salim Ashrafi @9576800000 for purchase orders</div>
    <EditOrDeleteProduct  productData={products} showEditDelete={false} />
    </div>:<NoDataWidget />)
  }
    </div>
  )
}

export default DisplayProducts
