import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions, Container, Modal } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModificationProduct, setProducts } from "../../redux/reducer_functions/ProductSlice";
import { Link, useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product_data = useSelector((state) => state.products.products);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const [open, setOpen] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState(null);

  const handleOpen = (card) => {
    setDeleteData(card);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);


  // to delete product 
  const handleDelete = async (card) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/products/${card._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleClose();
      getProducts(); 
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  
  //receive product data
  const getProducts = async () => {
    const response = await fetch(`http://localhost:3001/api/v1/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("Data not found");
      return;
    }
    const data = await response.json();
    dispatch(setProducts(data));
  };


  // edit poduct data
  const handleModify = (product_data) => {
    dispatch(setModificationProduct(product_data));
    navigate("/modify_product");
  };


  // filter product according to category
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  let filteredProducts = [];
  if (selectedCategory === "All") {
    filteredProducts = product_data;
  } else {
    filteredProducts = selectedCategory
      ? product_data.filter((product) => product.category === selectedCategory)
      : product_data;
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Container>


        {/* -------------------------------- Product card - START -------------------------- */}
        <Box sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", margin: "30px" }}>
          {filteredProducts.map((card) => (
            <Card
              key={card.id}
              sx={{ maxWidth: 345, width: 300, borderRadius: "15px", boxShadow: 4 }}
              style={{ margin: "20px", marginBottom: "30px", height: "420px" }}
            >

             {/* -------------------------------- Product card body - START -------------------------- */}
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={card.imageURL}
                  alt={card.name}
                  style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" align="center" style={{ maxHeight: "35px", overflow: "hidden" }}>
                    {card.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" style={{ height: "40px", maxHeight: "40px", overflow: "hidden" }}>
                    {card.description}
                  </Typography>
                  <Typography variant="h6" align="center" mt={2}>
                    {card.price} Rs
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Link to={`Product_details/${card._id}`}>
                  <Button variant="contained" size="small" color="primary">
                    BUY NOW
                  </Button>
                </Link>
                {isAdmin && (
                  <>
                    <Button variant="contained" onClick={() => handleOpen(card)} size="small" color="primary">
                      Delete
                    </Button>
                    <Button variant="contained" size="small" color="primary" onClick={() => handleModify(card)}>
                      Modify
                    </Button>
                  </>
                )}
              </CardActions>
             {/* -------------------------------- Product card body - ENDS -------------------------- */}  
            </Card>
          ))}
        </Box>
      {/* -------------------------------- Product card - START -------------------------- */}



      {/* ---------------------------- delete modal - START ------------------------------ */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete product
            </Typography>
            <Box sx={{display:"flex",justifyContent:"space-between",margin:"10px"}}>

            <Button sx={{backgroundColor:"yellow",color:"black"}} variant="contained" onClick={handleClose} size="small" color="primary">
              Cancel
            </Button>
            <Button sx={{backgroundColor:"red"}} variant="contained" onClick={() => handleDelete(deleteData)} size="small" color="primary">
              Delete
            </Button>
            </Box>
          </Box>
        </Modal>

      {/* ---------------------------- delete modal - ENDS ------------------------------ */}  
      </Container>
    </>
  );
};

export default ProductCard;
