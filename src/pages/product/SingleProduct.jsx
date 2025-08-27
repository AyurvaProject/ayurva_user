import ProductDetailsSection from "../../sections/product/SingleProductSection";
import { useParams } from "react-router-dom";
const SingleProduct = () => {
  const { id } = useParams();
  return <ProductDetailsSection id={id} />;
};

export default SingleProduct;
