import { useGetUserById } from "@/lib/react-query/queries";
import { Link } from "react-router-dom";

const ComentsCard = ({ title, userId }: { title: string; userId: string }) => {
  const { data: user } = useGetUserById(userId);
  return (
    <>
      <div className=" gap-3 items-center m-3">
        <Link
          to={`/profile/${user?.id}`}
          className="flex gap-3 items-center mr-auto"
        >
          <img
            src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user?.name}</p>
            <p className="small-regular text-light-3">@{user?.username}</p>
          </div>
        </Link>
        <p className="font-mono mr-auto mt-6">{title}</p>
      </div>
      <hr className="mt-3" />
    </>
  );
};

export default ComentsCard;
