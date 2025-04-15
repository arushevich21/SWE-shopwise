import {Card, CardBody, CardFooter, Image} from "@heroui/react";
import { useRouter } from "next/navigation";


interface CardProps {
  index: number;
  name: string;
  image: string;
  price: string;
  description: string;
}

export default function ProductCard(props: CardProps) {

  const { name, image, price, description, index } = props;
  const router = useRouter();

  return (
    <Card radius="none" className="w-[210px]" key={index} isPressable disableRipple shadow="sm" onPress={() => router.push(`/detailed_product/${name}`)}>
      <CardBody className="overflow-visible p-0">
        <Image
          alt={name}
          className="w-full object-cover h-[140px]"
          radius="none"
          shadow="sm"
          src={image}
          width="100%"
        />
      </CardBody>
      <CardFooter className="pb-2 pt-2 flex-col items-start h-[100px]">
        <h4 className="font-bold text-large">{name}</h4>
        <small className="text-default-500 text-left">{description}</small>
        <p className="text-sm font-semibold text-left mt-1">{price} <i className="font-light text-default-500 text-left">average</i></p>
      </CardFooter>
    </Card>
  );
}