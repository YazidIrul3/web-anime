"use client";
import { useFetchAnime } from "@/features/anime/useFetchAnime";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { anime, isLoad } = useFetchAnime(`anime?q=${search}&limit=5`, search);

  const handleSearch = (e) => {
    const { value, name } = e.target;
    e.preventDefault();

    setSearch(value);
  };

  const handleClick = () => {
    setSearch("");
  };

  return (
    <div className="bg-slate-950 text-slate-50 p-4 flex gap-4 items-center">
      <h1 className=" font-extrabold 2xl:text-xl xl:text-xl lg:text-lg md:text-lg text-sm text-yellow-500">
        YKH Anime
      </h1>

      <div className="relative w-64">
        <input
          className=" bg-slate-900 text-slate-50 px-2 py-1 rounded-lg w-full"
          placeholder="search...."
          type="text"
          onChange={handleSearch}
        />

        <Link
          href={`/anime/search/${search}`}
          onClick={handleClick}
          className=" absolute top-1/2 -translate-y-1/2 right-2 text-lg font-bold"
        >
          <MagnifyingGlass />
        </Link>
      </div>

      {search !== "" && (
        <div className="flex flex-col gap-2 bg-slate-50 absolute top-16 left-24 p-4 text-slate-950 w-[300px] z-50">
          {anime?.data?.data?.map((item, i) => {
            return (
              <Link
                href={`/anime/${item?.mal_id}`}
                onClick={handleClick}
                className=" p-2 hover:bgslale-950 z-50 hover:text-slate-50 rounded-lg"
                key={i}
              >
                <h1 className=" text-slate-950">{item?.title}</h1>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;
