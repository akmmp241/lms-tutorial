"use client"

import React from 'react';
import SparklesText from "@/components/magicui/sparkles-text";
import Particles from "@/components/magicui/particles";
import RetroGrid from "@/components/magicui/retro-grid";
import WordRotate from "@/components/magicui/word-rotate";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Link from "next/link";

const Page = () => {
  return (
      <div
          className="relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
        <Particles
            className="absolute inset-0"
            quantity={12}
            ease={80}
            size={4}
            color={"#047857"}
            refresh
        />
        <div className={"flex flex-col gap-y-8"}>
          <SparklesText
              text={"Akmp Academy"}
              className={"pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-indigo-800 to-indigo-500/80 text-8xl bg-clip-text leading-none text-transparent dark:from-white dark:to-slate-900/10"}/>
          <WordRotate
              className="text-center text-4xl font-[600] tracking-tighter text-gray-800"
              duration={4000}
              words={[
                "For Your Better Future",
                "Complete and Efficient",
                "Learn. Grow. Achieve Together",
                "Unlock Knowledge, Unleash Potential",
                "Your Pathway to Smart Learning"
              ]}
          />
          <div className={"flex items-center mx-auto gap-x-6"}>
            <p className={"text-xl text-center text-muted-foreground"}>
              <span className={"text-black font-bold"}>Join now</span> and unlock your potential with us!
            </p>
            <Link href={"/register"}>
              <ShimmerButton shimmerSize={"0.2em"} className="cursor-pointer shadow-md h-10">
              <span
                  className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Register
              </span>
              </ShimmerButton>
            </Link>
          </div>
        </div>
        <RetroGrid angle={68}/>
      </div>
  );
};

export default Page;