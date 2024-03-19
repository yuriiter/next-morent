import { CardsContainer } from "@/components/Cards";
import { ShowMore } from "@/components/Cards/ShowMore";
import { PickerSection } from "@/components/Picker/PickerSection";
import { usePickerSectionData } from "@/components/Picker/hooks/usePickerSectionData";
import { WithSidebarFilters } from "@/components/Sidebar/SidebarFilters/WithSidebarFilters";
import { useFilters } from "@/hooks/URLQueries/useFilters";
import useURLQueryState from "@/hooks/URLQueries/useURLQueryState";
import { useDidUpdate } from "@/hooks/useDidUpdate";
import { useGetCars } from "@/queries/useGetCars";
import { convertPickerData, sidebarInputsToQueryState } from "@/utils";
import Head from "next/head";
import React, { useState } from "react";

export default function Cars() {
  const [filters, onChangeFilters] = useFilters();
  const [carsDisplayLimit, setCarsDisplayLimit] = useState(8);
  const { pickUpData, setPickUpData, dropOffData, setDropOffData } =
    usePickerSectionData();
  const [search] = useURLQueryState("search", "");

  const [carsResponse] = useGetCars({
    queryParams: {
      ...Object.fromEntries(
        Object.entries(sidebarInputsToQueryState(filters)).filter(
          ([, value]) => value !== false
        )
      ),
      ...convertPickerData({ pickUpData, dropOffData }),
      search: search === "" ? undefined : search,
      page: 0,
      pageSize: carsDisplayLimit,
    },
  });

  useDidUpdate(() => {
    setCarsDisplayLimit(8);
  }, [
    JSON.stringify({
      filters,
      search,
      pickUpData,
      dropOffData,
    }),
  ]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WithSidebarFilters inputs={filters} onChangeFilters={onChangeFilters}>
        <PickerSection
          className="container"
          pickUpData={pickUpData}
          setPickUpData={setPickUpData}
          dropOffData={dropOffData}
          setDropOffData={setDropOffData}
        />

        <section className="container cards__section cards__section--recommended">
          <CardsContainer
            cards={
              carsResponse.type === "success"
                ? carsResponse.data?.data?.documents ?? []
                : []
            }
            title="Filtered cars"
            loading={carsResponse.type === "pending"}
          />
          <ShowMore
            step={8}
            totalItemsCount={
              carsResponse.type === "success"
                ? carsResponse.data?.data?.count ?? 0
                : 0
            }
            itemsToShowLimit={carsDisplayLimit}
            setItemsToShowLimit={setCarsDisplayLimit}
            itemNamePlural="cars"
            itemNameSingular="car"
          />
        </section>
      </WithSidebarFilters>
    </>
  );
}
