import { Banner } from "@/components/Banner";
import bannerCar1 from "@/assets/img/banner_car_1.png";
import bannerCar2 from "@/assets/img/banner_car_2.png";
import { CardsContainer } from "@/components/Cards";
import { ShowMore } from "@/components/Cards/ShowMore";
import { PickerSection } from "@/components/Picker/PickerSection";
import { usePickerSectionData } from "@/components/Picker/hooks/usePickerSectionData";
import { useGetCars } from "@/queries/useGetCars";
import useURLQueryState from "@/hooks/URLQueries/useURLQueryState";
import { StandardHead } from "@/components/StandardHead";

export default function Home() {
  const [popularCarsResponse] = useGetCars({
    queryParams: {
      popularFlag: true,
      page: 0,
      pageSize: 4,
    },
  });

  const [recommendationCarsDisplayLimit, setRecommendationCarsDisplayLimit] =
    useURLQueryState("pageSize", 8);

  const [recommendedCarsResponse] = useGetCars({
    queryParams: {
      recommendedFlag: true,
      page: 0,
      pageSize: recommendationCarsDisplayLimit,
    },
  });

  const { pickUpData, setPickUpData, dropOffData, setDropOffData } =
    usePickerSectionData();

  return (
    <>
      <StandardHead pageName="Home" />

      <section className="container banner__section">
        <Banner
          priority
          variant="light"
          title="The Best Platform for Car Rental"
          description="Ease of doing a car rental safely and reliably. Of course at a low price."
          buttonText="Rent a car"
          href="/cars"
          carPicture={bannerCar1.src}
        />
        <Banner
          priority
          variant="dark"
          title="Easy way to rent a car at a low price"
          description="Providing cheap car rental services and safe and comfortable facilities."
          buttonText="Rent a car"
          href="/cars"
          carPicture={bannerCar2.src}
        />
      </section>
      <PickerSection
        className="container"
        pickUpData={pickUpData}
        setPickUpData={setPickUpData}
        dropOffData={dropOffData}
        setDropOffData={setDropOffData}
      />
      <section className="container cards__section">
        <CardsContainer
          cards={popularCarsResponse.data?.data?.documents ?? []}
          title="Popular cars"
          rightLink={{ href: "/cars", content: "View all" }}
          horizontalScrolling
          loading={popularCarsResponse.type === "pending"}
        />
      </section>
      <section className="container cards__section cards__section--recommended">
        <CardsContainer
          cards={recommendedCarsResponse.data?.data?.documents ?? []}
          title="Recomendation cars"
          rightLink={{ href: "/cars", content: "View all" }}
          loading={recommendedCarsResponse.type === "pending"}
        />
        <ShowMore
          step={8}
          totalItemsCount={recommendedCarsResponse.data?.data?.count ?? 0}
          itemsToShowLimit={recommendationCarsDisplayLimit}
          setItemsToShowLimit={setRecommendationCarsDisplayLimit}
          itemNamePlural="cars"
          itemNameSingular="car"
        />
      </section>
    </>
  );
}
