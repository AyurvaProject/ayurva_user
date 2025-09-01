import PharmacyDetailsSection from "../../sections/pharmacy/SinglePharmacyDeailSection";
import { useParams } from "react-router-dom";
const SinglePharmacy = () => {
  const { id } = useParams();
  return <PharmacyDetailsSection id={id} />;
};

export default SinglePharmacy;
