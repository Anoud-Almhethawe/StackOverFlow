"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeyFromQuery } from "@/lib/utils";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
interface Props {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();

  const query = searchparams.get("q");

  const [search, setsearch] = useState(query || "");

  useEffect(() => {
    const delayDepounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchparams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeyFromQuery({
          params: searchparams.toString(),
          keysToRemove: ["q"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(delayDepounce);
  }, [search, searchparams, pathname, router, route]);

  return (
    <div
      className={`${otherClasses} background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        value={search}
        placeholder={placeholder}
        onChange={e => {
          setsearch(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark400_light700
        border-none bg-transparent shadow-none outline-none "
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
