import SocialCard from "@/components/SocialCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GIthubProfileCard = ({username}:{
  username:string
}) => {
  const [followerCount, setfollowerCount] = useState(0);
  const [repos, setrepos] = useState(0);
    useEffect(()=>{
        const getUsersData = async()=>{
            const followerRes = await fetch(`https://api.github.com/users/${username}/followers`);
            const data = await followerRes.json();
            setfollowerCount(data.length)
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
            const reposData = await reposResponse.json();
            setrepos(reposData.length)
        }
        getUsersData();
    },[username])
  return (
    <>
      <SocialCard title="Github">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 justify-between">
            <section className="flex flex-col items-center justify-center">
              <p className="font-extrabold">{repos}</p>
              <p className="text-gray-500">Repo</p>
            </section>
            <section className="flex flex-col items-center justify-center">
              <p className="font-extrabold">1.2k</p>
              <p className="text-gray-500">Commits</p>
            </section>
            <section className="flex flex-col items-center justify-center">
              <p className="font-extrabold">{followerCount}</p>
              <p className="text-gray-500">Followers</p>
            </section>
          </div>
          <hr /> <hr className="bg-red-500 w-full h-1" />
          <div className="flex gap-2 items-center mt-2">
            <Link to={`https://github.com/${username}`} className="underline">
             https://github.com/{username}
            </Link>
          </div>
        </div>
      </SocialCard>
    </>
  );
};

export default GIthubProfileCard;
