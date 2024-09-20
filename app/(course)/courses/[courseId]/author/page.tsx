import React from 'react';
import {currentUser} from "@clerk/nextjs/server";
import Image from "next/image";

const Page = async () => {
  const user = await currentUser()

  return (
      <div className={"px-10 py-14 flex flex-col gap-y-6"}>
        <span className={"text-2xl font-bold"}>
          Your Instructor
        </span>
        <div className={"flex gap-x-12"}>
          <div className={"flex flex-col items-center gap-y-4"}>
            <Image
                src={user?.imageUrl!}
                alt={user?.fullName!}
                width={180}
                height={180}
                className={"rounded-full border-4"}
                objectFit={"cover"}/>
            <div className={"font-extralight"}>
              {user?.fullName}
            </div>
          </div>
          <div className={"w-3/4 text-justify"}>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur eaque eius, iure sequi sit
              veritatis. Aliquam aliquid cum eaque facere laudantium magnam odio provident quas similique tenetur
              totam,
              voluptas voluptates?
            </div>
            <br/>
            <div>Aliquid cumque error fugiat impedit incidunt maiores nobis non numquam perspiciatis quibusdam,
              quisquam
              similique, soluta voluptatum. Deleniti distinctio dolorum, error eum labore minima nam nesciunt non
              ratione similique velit voluptate.
            </div>
            <br/>
            <div>Ab alias consectetur, distinctio eligendi eveniet exercitationem fuga hic incidunt itaque labore
              modi,
              mollitia natus nemo non officia quam saepe sed sint tempora totam ullam unde voluptatibus. Deserunt
              odio,
              voluptatibus.
            </div>
            <br/>
            <div>Aliquam maxime modi nobis quae qui quibusdam tenetur velit? Aut commodi consectetur corporis
              distinctio
              dolore eveniet expedita impedit magnam quos voluptatem? Ea nemo numquam quisquam recusandae veniam.
              Nesciunt, repellat, vitae.
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;