import React, { useEffect, useState } from 'react';
import { collection, getDocs,db } from '../firebaseConfig';
import { Box, CircularProgress, Card, CardContent, CardMedia, Typography, List, ListItem, ListItemText } from '@mui/material';
import { EditOrDeleteVideo, NoDataWidget } from './Video';
import YouTube from 'react-youtube';

const DisplayVideos = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const productsCollection = collection(db, "videos");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // YouTube player options
  const opts = {
    height: '390',
    width: '100%', // Make it responsive
    playerVars: {
      autoplay: 0,
    },
  };

  // Extract video ID from URL
  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
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
      ) : (
        Boolean(products?.length) ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {products.map((product) => (
              <Card key={product.id} sx={{ maxWidth: 345, width: '100%' }}>
                <CardMedia>
                  <YouTube
                    videoId={getVideoId(product.url)}
                    opts={opts}
                  />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  {product.keyPoints && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1">Key Points:</Typography>
                      <List dense>
                        {product.keyPoints.split(",").map((point, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={point} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                 
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <NoDataWidget />
        )
      )}
    </div>
  );
};

export default DisplayVideos;