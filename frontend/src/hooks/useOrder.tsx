import { Order } from "@/models/Order";
import { useEffect, useState } from "react";

import { useQuery } from "react-query";
import "dayjs/locale/ru";
import { axios } from "@/config/axios";
const useOrder = ({ car }: { car: number | null }) => {
  const [carPrice, setCarPrice] = useState<string | number>(0);

  const { data: vehiclesData } = useQuery(
    "vehicles",
    async (): Promise<Order[]> => {
      const res = await axios.get("/user/vehicle_types/1");
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: userVehicles } = useQuery(
    "userVehicles",
    async (): Promise<Order[]> => {
      const res = await axios.get("/user/vehicles");
      return res.data;
    }
  );

  const { data: directionsData } = useQuery(
    "directions",
    async (): Promise<Order[]> => {
      const res = await axios.get("/user/place_of_directions/1");
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: purposesData } = useQuery(
    "purposes",
    async (): Promise<Order[]> => {
      const res = await axios.get("/user/visit_purposes/1");
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const transports = vehiclesData?.map((vehicle) => {
    return {
      value: vehicle.id,
      label: vehicle.name,
    };
  });

  const purposes = purposesData?.map((vehicle) => {
    return {
      value: vehicle.id,
      label: vehicle.name,
    };
  });

  const directions = directionsData?.map((vehicle) => {
    return {
      value: vehicle.id,
      label: vehicle.name,
    };
  });

  useEffect(() => {
    if (car) {
      const price = vehiclesData?.find((vehicle) => vehicle.id === car)?.price;
      setCarPrice(price ?? 0);
    }
  }, [car, vehiclesData]);

  return {
    carPrice,
    directions,
    purposes,
    transports,
    userVehicles,
  };
};

export default useOrder;
