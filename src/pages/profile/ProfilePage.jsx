import ProfileMainSection from "../../sections/profile/ProfileMainSection";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { tab } = useParams();
  return <ProfileMainSection tab={tab} />;
};

export default ProfilePage;
