import DashboardComp from "@/(components)/dashbord_component/dashboard_comp";
import Providers from "@/(components)/landing_page_componets/providers";
import { getDashboardData } from "@/lib/api/dashboard";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
  });

   const dehydrated = dehydrate(queryClient);

  return (
    <div className="">
     
       <Providers state={dehydrated}>
      <DashboardComp />
    </Providers>

    </div>
  );
}
