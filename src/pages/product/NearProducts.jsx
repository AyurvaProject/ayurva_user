import NearProductListSection from "../../sections/product/NearProductListSection";
import { useParams } from "react-router-dom";
const NearProducts = () => {
  const { pres_detail_id, license_no } = useParams();
  return (
    <NearProductListSection
      presDetailId={pres_detail_id}
      licenseNo={license_no}
    />
  );
};

export default NearProducts;
