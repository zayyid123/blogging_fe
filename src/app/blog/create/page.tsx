import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormAddBlog from "./_components/FormAddBlog";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Blog" />
      <FormAddBlog />
    </DefaultLayout>
  );
};

export default FormElementsPage;
