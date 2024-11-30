"use client";

import Card from "../fragments/Card";
import { useEffect, useState } from "react";
import { axiosInstace } from "@/libs/axios";
import AnimeCardLoading from "../fragments/AnimeCardLoading";
import { useRouter, useSearchParams } from "next/navigation";

const TopAnime = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page") || 1);

  const [anime, setAnime] = useState([]);
  const [isLoad, setLoad] = useState(true);
  const loading = Array(25).fill(null);

  const getAnime = async () => {
    try {
      const response = await axiosInstace.get(`top/anime?page=${page}`);
      console.log(response);
      setAnime(response);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (page) => {
    router.push("/anime/top?page=" + page);
  };

  useEffect(() => {
    if (router.isReady) {
      setLoad(true);
    }
    getAnime();
  }, [page]);

  return (
    <div className="container mx-auto p-5 bg-slate-950 h-screen">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">Top Anime</h1>
      </div>
      {isLoad ? (
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-4">
          {loading.map((_, i) => {
            return <AnimeCardLoading key={i} />;
          })}
        </div>
      ) : (
        <div>
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-4">
            {anime?.data?.data?.map((item, i) => {
              return <Card key={i} anime={item} />;
            })}
          </div>

          <div className="flex items-center justify-center gap-5 py-7">
            <button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-slate-50 font-bold rounded-lg hover:bg-blue-700"
            >
              -
            </button>

            <p>{page}</p>

            <button
              onClick={() => handleChangePage(page + 1)}
              disabled={page === anime?.data?.pagination?.last_visible_page}
              className="px-4 py-2 bg-blue-500 text-slate-50 font-bold rounded-lg hover:bg-blue-700"
            >
              +
            </button>
          </div>

          
        </div>
      )}
    </div>
  );
};

export default TopAnime;
