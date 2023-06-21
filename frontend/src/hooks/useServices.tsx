import { axios } from "@/config/axios";
import { useOrderForm } from "@/context/FormContext";
import { Service } from "@/models/Service";
import { Checkbox, Flex, Loader, Paper, Skeleton } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useServicesList } from "./useService";

const useServices = ({ adults, kids, students, days, carPrice }) => {
  const { data, isLoading, isSuccess } = useServicesList();
  const [values, handlers] = useListState(undefined);
  const [checked, setChecked] = useState<number[]>([]);
  const checkedValues: number[] = [];

  let price = 0;
  const [totalPrice, setTotalPrice] = useState(0);

  const calculate = () => {
    if (values && values.length > 0) {
      values.map((item) => {
        if (item.checked || item.is_required) {
          checkedValues.push(item.id);
          if (item.is_required) {
            price = price + item.price * (adults + students + kids);
          } else {
            item.prices.map((item) => {
              if (item.is_adult) {
                price = price + +item.price * adults;
              }
              if (item.is_student) {
                price = price + +item.price * students;
              }
              if (item.is_kid) {
                price = price + +item.price * kids;
              }
            });
          }
        }
        setTotalPrice((price + +carPrice) * days);
        setChecked(checkedValues);
      });
    }
  };
  const handleCheck = ({ event, index }) => {
    handlers.setItemProp(index, "checked", event.currentTarget.checked);
  };

  useEffect(() => {
    calculate();
  }, [values, adults, kids, students, days, carPrice]);

  useEffect(() => {
    if (!values || values.length === 0) {
      handlers.setState(data);
    }
  }, [isSuccess]);

  const items =
    !isLoading && values ? (
      values.map((value, index) => (
        <Checkbox
          mt="sm"
          label={value.name}
          key={value.id}
          disabled={value.is_required}
          checked={value.is_required ? value.is_required : value.checked}
          onChange={(event) => handleCheck({ event, index })}
        />
      ))
    ) : (
      <Paper mt="sm">
        <Flex>
          <Skeleton height={20} width={20} />
          <Skeleton height={40} ml="md" width="100%" />
        </Flex>
        <Flex mt="md">
          <Skeleton height={20} width={20} />
          <Skeleton height={20} ml="md" width={50} />
        </Flex>
        <Flex mt="md">
          <Skeleton height={20} width={20} />
          <Skeleton height={40} ml="md" width="100%" />
        </Flex>
      </Paper>
    );
  return { services: items, selectedServices: checked, price: totalPrice };
};

export default useServices;
