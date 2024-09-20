"use client"

import React from 'react';
import SparklesText from "@/components/magicui/sparkles-text";
import Particles from "@/components/magicui/particles";
import WordRotate from "@/components/magicui/word-rotate";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Link from "next/link";
import {Logo} from "@/app/(old)/home/_components/logo";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import {MagicCard} from "@/components/magicui/magic-card";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import BoxReveal from "@/components/magicui/box-reveal";
import {FadeText} from "@/components/magicui/fade-text";
import {BorderBeam} from "@/components/magicui/border-beam";
import {BellIcon, CalendarIcon, DollarSign, GlobeIcon} from "lucide-react";
import {BentoCard, BentoGrid} from "@/components/magicui/bento-grid";
import {InputIcon} from "@radix-ui/react-icons";

const features = [
  {
    Icon: DollarSign,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: (
        <>
          <img className="absolute -right-20 -top-20 opacity-60" alt={""}/>
        </>
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60"/>,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60"/>,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60"/>,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
        "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60"/>,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

const Page = () => {
  return (
      <>
        <div
            className="relative flex h-screen w-full items-center justify-center bg-background p-20">
          <div className={"absolute top-0 left-0 w-full h-[80px] flex justify-between items-center px-6"}>
            <Logo/>
            <Link href={"/login"}>
              <Button className="cursor-pointer shadow-md w-28 h-10">
              <span
                  className="text-center text-base leading-none tracking-tight text-white">
                Login
              </span>
              </Button>
            </Link>
          </div>
          <div className={"flex flex-col gap-y-8"}>
            <SparklesText
                text={"Akmp Academy"}
                className={"pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-indigo-800 to-indigo-500/80 text-8xl bg-clip-text leading-none text-transparent"}/>
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
          <DotPattern
              width={20}
              height={20}
              cx={1}
              cy={1}
              cr={1}
              className={cn(
                  "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] fill-neutral-900/75",
              )}
          />
        </div>
        <div
            className="relative flex h-screen w-full items-center justify-center bg-background p-20">
          <div className={"flex gap-x-12 items-center justify-center w-full h-full"}>
            <GradualSpacing
                className="font-display text-center text-4xl text-transparent font-bold tracking-normal bg-gradient-to-b from-indigo-800 to-indigo-500/80 bg-clip-text"
                text="Where You want to go with us?"
            />
            <MagicCard
                className="z-50 w-1/3 h-fit cursor-pointer shadow-2xl whitespace-nowrap"
                gradientColor={"rgba(105,81,81,0.29)"}
                gradientSize={200}>
              <Link href={"#learning"}>
                <div className={"h-full flex items-center border p-16"}>
                  <Particles
                      className="absolute inset-0"
                      quantity={100}
                      ease={80}
                      color={"#000"}
                      refresh
                  />
                  <div className={"flex flex-col items-start gap-y-12"}>
                    <BoxReveal boxColor={"#625bdc"} duration={0.5}>
                    <span className={"text-center font-semibold text-4xl"}>
                      LEARN A COURSE.
                    </span>
                    </BoxReveal>
                    <div className={"text-muted-foreground flex flex-col gap-y-2"}>
                      <BoxReveal boxColor={"#625bdc"} duration={0.9}>
                        <>
                          Become a <span
                            className={"text-transparent font-bold bg-gradient-to-b from-indigo-800 to-indigo-500/80 bg-clip-text"}>Student</span>
                        </>
                      </BoxReveal>
                      <BoxReveal boxColor={"#625bdc"} duration={1.2}>
                        <span>and go get a course with</span>
                      </BoxReveal>
                      <BoxReveal boxColor={"#625bdc"} duration={1.4}>
                        <span
                            className={"text-transparent font-bold bg-gradient-to-b from-indigo-800 to-indigo-500/80 bg-clip-text text-2xl"}>the best cost.</span>
                      </BoxReveal>
                    </div>
                  </div>
                </div>
              </Link>
            </MagicCard>
            <MagicCard
                className="z-50 w-1/3 h-fit cursor-pointer shadow-2xl whitespace-nowrap"
                gradientColor={"rgba(105,81,81,0.29)"}
                gradientSize={200}>
              <Link href={"#teaching"}>
                <div className={"h-full flex items-center border p-16"}>
                  <Particles
                      className="absolute inset-0"
                      quantity={100}
                      ease={80}
                      color={"#000"}
                      refresh
                  />
                  <div className={"flex flex-col items-start gap-y-12"}>
                    <BoxReveal boxColor={"#625bdc"} duration={0.5}>
                    <span className={"text-center font-semibold text-4xl"}>
                      TEACH THE WORLD.
                    </span>
                    </BoxReveal>
                    <div className={"text-muted-foreground flex flex-col gap-y-2"}>
                      <BoxReveal boxColor={"#625bdc"} duration={0.9}>
                        <>
                          Become a <span
                            className={"text-transparent font-bold bg-gradient-to-b from-indigo-800 to-indigo-500/80 bg-clip-text"}>Teacher</span>
                        </>
                      </BoxReveal>
                      <BoxReveal boxColor={"#625bdc"} duration={1.2}>
                        <>
                          and publish a course that
                        </>
                      </BoxReveal>
                      <BoxReveal boxColor={"#625bdc"} duration={1.4}>
                        <span
                            className={"text-transparent font-bold bg-gradient-to-b from-indigo-800 to-indigo-500/80 bg-clip-text text-2xl"}>reach the world.</span>
                      </BoxReveal>
                    </div>
                  </div>
                </div>
              </Link>
            </MagicCard>
          </div>
          <DotPattern
              width={20}
              height={20}
              cx={1}
              cy={1}
              cr={1}
              className={cn(
                  "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)] fill-neutral-900/75",
                  "z-0"
              )}
          />
        </div>
        <div
            id={"learning"}
            className={"relative flex h-screen w-full items-center justify-center bg-background p-20"}>
          <div className={"flex flex-col gap-x-12 gap-y-12 items-center justify-center w-2/3 h-full"}>
            <FadeText
                className="relative text-5xl font-bold text-black leading-3"
                direction="up"
                framerProps={{
                  show: {transition: {delay: 0.2}},
                }}
                text="Learn Something New Anywhere Anytime"
            />
            <div className={"text-muted-foreground text-2xl text-center"}>
              <p>
                Get your own course based on what you need
              </p>
              <p>
                Find it and get it now.
              </p>
            </div>
            <div className={"flex gap-x-5 mt-8"}>
              <div className={"relative z-50 aspect-video p-6 border rounded-md h-64 bg-white"}>
                <DollarSign size={28}/>
                <div className={"mt-8 flex flex-col"}>
                  <span
                      className={"text-2xl text-transparent font-bold bg-gradient-to-b from-indigo-800 to-indigo-500/80 bg-clip-text  "}>
                    Easy To Get
                  </span>
                  <span className={"text-muted-foreground tracking-wide"}>
                    Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consequuntur, eius explicabo nulla odit omnis quibusdam
                  </span>
                </div>
                <BorderBeam size={250} duration={4} delay={6} colorFrom={"#3730a3"} colorTo={"rgb(99 102 241 / 0.8)"}/>
              </div>
              <div className={"relative z-50 aspect-video p-6 border rounded-md h-64 bg-white"}>
                <DollarSign size={28}/>
                <div className={"mt-8 flex flex-col"}>
                  <span
                      className={"text-2xl text-transparent font-bold bg-gradient-to-b from-indigo-800 to-indigo-500/80 bg-clip-text"}>
                    Easy To Get
                  </span>
                  <span className={"text-muted-foreground tracking-wide"}>
                    Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consequuntur, eius explicabo nulla odit omnis quibusdam
                  </span>
                </div>
                <BorderBeam size={250} duration={4} delay={6} colorFrom={"#3730a3"} colorTo={"rgb(99 102 241 / 0.8)"}/>
              </div>
              <div className={"relative z-50 aspect-video p-6 border rounded-md h-64 bg-white"}>
                <DollarSign size={28}/>
                <div className={"mt-8 flex flex-col"}>
                  <span
                      className={"text-2xl text-transparent font-bold bg-gradient-to-b from-indigo-800 to-indigo-500/80 bg-clip-text"}>
                    Easy To Get
                  </span>
                  <span className={"text-muted-foreground tracking-wide"}>
                    Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consequuntur, eius explicabo nulla odit omnis quibusdam
                  </span>
                </div>
                <BorderBeam size={250} duration={4} delay={6} colorFrom={"#3730a3"} colorTo={"rgb(99 102 241 / 0.8)"}/>
              </div>
            </div>
          </div>
          <DotPattern
              width={20}
              height={20}
              cx={1}
              cy={1}
              cr={1}
              className={cn(
                  "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] fill-neutral-900/75",
                  "z-0"
              )}
          />
        </div>
        <div
            id={"teaching"}
            className={"relative flex h-screen w-full items-center justify-center bg-background p-20"}>
          <div className={"flex flex-col gap-x-12 gap-y-12 items-center justify-center w-2/3 h-full"}>
            <FadeText
                className="relative text-5xl font-bold text-black leading-3"
                direction="up"
                framerProps={{
                  show: {transition: {delay: 0.2}},
                }}
                text="Publish To Everyone Around The World"
            />
            <div className={"text-muted-foreground text-2xl text-center"}>
              <p>
                Develop your own course based on what the most needed
              </p>
              <p>
                And publish it now.
              </p>
            </div>
            <div>
              <BentoGrid className="lg:grid-rows-3">
                {features.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                ))}
              </BentoGrid>
            </div>
          </div>
        </div>
        <div
            id={"teaching"}
            className={"relative flex flex-col gap-y-5 h-[280px] w-full justify-center items-center bg-black mt-16 p-20 text-white"}>
          <div className={"flex flex-col gap-y-5 justify-center w-2/3 h-full"}>
            <Logo />
            <span>&copy; 2024 Akmp Academy. All rights reserved</span>
          </div>
        </div>
      </>
  )
      ;
};

export default Page;