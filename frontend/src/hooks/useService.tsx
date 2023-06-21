import { axios } from "@/config/axios";
import { Service } from "@/models/Service";
import * as React from "react";
import { useQuery } from "react-query";

export const useServicesList = () => {
  const queryInfo = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    refetchOnWindowFocus: false,
  });

  return {
    ...queryInfo,

    data: React.useMemo(
      () =>
        queryInfo.data?.map((service) => {
          return { ...service, checked: service.is_required ? true : false };
        }),
      [queryInfo.data]
    ),
  };
};

const fetchServices = async (): Promise<Service[]> => {
  const res = await axios.get("/user/services/1");
  return res.data;
};
