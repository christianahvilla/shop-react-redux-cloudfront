import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useEffect, useState } from "react";

export interface RootObject {
  products: Product[];
  total: number;
}

export interface Product {
  count: number;
  description: string;
  id: string;
  image: string;
  price: number;
  title: string;
}

export default function Products() {
  // const { data = [], isLoading } = useAvailableProducts();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<RootObject | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getApiData();
  }, []);

  const getApiData = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products`)
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .catch((e) => console.error(e));

    // update the state
    setData(response as unknown as RootObject);
  };

  if (isLoading) {
    return <Typography>Cargando....</Typography>;
  }

  const displayProducts = () => {
    return data?.products.map((product) => {
      return (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              sx={{ pt: "56.25%" }}
              image={product.image}
              title="Image title"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography>{`$${product.price}`}</Typography>
            </CardContent>
            <CardActions>
              <AddProductToCart product={product} />
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <Grid container spacing={4}>
      {displayProducts()}
    </Grid>
  );
}
