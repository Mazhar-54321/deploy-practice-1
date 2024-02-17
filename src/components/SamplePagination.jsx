import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PaginationItem from '@mui/material/PaginationItem';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { useState } from 'react';
import { Grid } from '@mui/material';


const PAGINATION_COUNT = 4;

export default function SamplePagination() {
    const [objects, setObjects] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [tempObjects, setTempObjects] = useState(objects.slice(0, (PAGINATION_COUNT)))
    const changeEvent = (event, value) => {
        setTempObjects(objects.slice(PAGINATION_COUNT * (value - 1), PAGINATION_COUNT * (value - 1) + (PAGINATION_COUNT)))
    }
    return (
        <>
            <div style={{ width: '100%', height: '82vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ overflowY: 'scroll', overflowX: 'hidden', width: '100%', height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Grid container spacing={2}>
                        {tempObjects.map(e => {
                            return (
                                <Grid item xs={12} sm={6} md={4} xl={3}>
                                    <Card sx={{ minWidth: 275,border:'1px solid rgb(0,0,0,0.1)' }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Word of the Day
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                {e}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                adjective
                                            </Typography>
                                            <Typography variant="body2">
                                                well meaning and kindly.
                                                <br />
                                                {'"a benevolent smile"'}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                </div>
                <div style={{ position: 'sticky', width: '100%', height: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Pagination 
                    renderItem={(item) => (
                        <PaginationItem
                          slots={{ previous:WestOutlinedIcon, next:  EastOutlinedIcon }}
                          {...item}
                        />
                      )}
                    color='primary' shape='rounded' onChange={changeEvent} count={Math.ceil(objects.length / PAGINATION_COUNT)} />
                </div>
            </div>


        </>
    );
}