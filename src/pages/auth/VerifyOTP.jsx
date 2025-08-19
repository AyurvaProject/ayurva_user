import VerifyOtpSection from "../../sections/verifyOTP/VerifyOTPSection";
import { useParams } from "react-router-dom";
const VerifyOtpPage = () => {
  const { id } = useParams();
  return <VerifyOtpSection id={id} />;
};

export default VerifyOtpPage;
