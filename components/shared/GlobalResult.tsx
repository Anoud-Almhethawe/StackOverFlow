"use client";
import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFilters from "./search/GlobalFilters";
import { globalSearch } from "@/lib/actions/general.action";

const GlobalResult = () => {
  const searchparams = useSearchParams();
  const [result, setResult] = useState([
    { type: "question", id: 1, title: "Next.js question" },
    { type: "tag", id: 1, title: "Nextjs" },
    { type: "user", id: 1, title: "jsm" },
  ]);
  const [isLoading, setisLoading] = useState(false);
  const global = searchparams.get("global");
  const type = searchparams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setisLoading(true);
      try {
        // fetch everything everywhere all at once
        const res = await globalSearch({ query: global, type });
        setResult(JSON.parse(res));
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setisLoading(false);
      }
    };
    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;

      default:
        return "/";
    }
  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400">
      <p className="text-dark400_light900 paragraph-semibold px-5">
        <GlobalFilters />
      </p>
      <div className="my-5 h-[1px]  bg-light-700/50 dark:bg-dark-500/50" />
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>
      </div>
      {isLoading ? (
        <div className="flex-center flex-col px-5">
          <ReloadIcon className="my-2 h-10 w-10 animate-spin text-primary-500" />
          <p className="text-dark200_light800 body-regular">
            Browsing the entire database
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {result.length > 0 ? (
            result.map((item: any, index: number) => (
              <Link
                key={item.type + item.id + index}
                href={renderLink(item.type, item.id)}
                className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 hover:dark:bg-dark-500/50 "
              >
                <Image
                  src="/assets/icons/tag.svg"
                  alt="tags"
                  width={18}
                  height={18}
                  className="invert-colors mt-1 object-contain"
                />
                <div className="flex flex-col ">
                  <p className="body-medium text-dark200_light800 line-clamp-1">
                    {item.title}
                  </p>
                  <p className="small-medium text-light400_light500 mt-1 font-bold capitalize">
                    {item.type}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex-center flex-col px-5">
              <p className="text-dark200_light800 body-regular px-5 py-2.5 ">
                Ooops, No Results
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalResult;
