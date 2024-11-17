"use client";
import { createBlog } from "@/services/blog.service";
import { BLOG } from "@/types/blog";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const FormAddBlog = () => {
  const router = useRouter();
  const [state, setstate] = useState<BLOG>({
    title: "",
    slug: "",
    content: "",
  });

  const handleChangeState = (key: string, value: string) => {
    if (key === "slug") {
      let newValue = value.split(" ").join("-");
      setstate({ ...state, [key]: newValue });
      return;
    }

    setstate({ ...state, [key]: value });
  };

  const handleSubmit = async () => {
    if (!state.title || !state.slug || !state.content) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "title, slug and content required",
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }

    try {
      await createBlog(state);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success Create Blog",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/blog");
    } catch (error) {
      let message = "Unknown Error";

      if (
        axios.isAxiosError(error) &&
        error.response?.data?.errors[0].message
      ) {
        message = error.response.data.errors[0].message;
      }
      Swal.fire({
        position: "center",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  console.log(state);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-5.5 p-6.5"
      >
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Title
          </label>
          <input
            type="text"
            defaultValue={state.title}
            onChange={(e) => {
              handleChangeState("title", e.target.value);
            }}
            placeholder="Title"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Slug
          </label>
          <input
            type="text"
            value={state.slug}
            onChange={(e) => {
              handleChangeState("slug", e.target.value);
            }}
            placeholder="Slug"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Content
          </label>
          <textarea
            rows={6}
            defaultValue={state.content}
            onChange={(e) => {
              handleChangeState("content", e.target.value);
            }}
            placeholder="Content"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddBlog;
