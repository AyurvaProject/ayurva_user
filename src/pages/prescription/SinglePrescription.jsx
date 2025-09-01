import SinglePrescriptionSection from "../../sections/prescription/SinglePrescriptionSection";
import { useParams } from "react-router-dom";

const SinglePrescription = () => {
  const { id } = useParams();
  return <SinglePrescriptionSection id={id} />;
};

export default SinglePrescription;
