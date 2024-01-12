"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeyFromQuery } from "@/lib/utils";
import GlobalResult from "../GlobalResult";
const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const searchContainerRef = useRef(null);

  const query = searchparams.get("q");

  const [search, setsearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setsearch("");
      }
    };
    setIsOpen(false);
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, [pathname]);
  useEffect(() => {
    const delayDepounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchparams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeyFromQuery({
            params: searchparams.toString(),
            keysToRemove: ["global", "type"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDepounce);
  }, [search, searchparams, pathname, router, query]);

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden "
      ref={searchContainerRef}
    >
      <div
        className="background-light800_darkgradient relative flex 
      min-h-[56px] grow items-center gap-1 rounded-xl  px-4"
      >
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          value={search}
          onChange={e => {
            setsearch(e.target.value);

            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          placeholder="Search globaly..."
          className="paragraph-regular no-focus placeholder text-dark400_light700
           border-none bg-transparent shadow-none outline-none "
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
