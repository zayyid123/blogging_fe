import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableBlog from "./_components/TableBlog";

const BlogPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blog" />

      <div className="flex flex-col gap-10">
        <TableBlog/>
      </div>
    </DefaultLayout>
  );
};

export default BlogPage;
