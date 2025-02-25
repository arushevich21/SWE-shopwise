import {Card, CardBody, CardFooter, Image} from "@heroui/react";

interface CardProps {
  index: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard(props: CardProps) {

  const { name, price, image, description, index } = props;

  return (
    <Card radius="none" className="w-[210px]" key={index} isPressable disableRipple shadow="sm" onPress={() => console.log("CLICKED CARD, SETUP REDIRECT TO PRODUCT PAGE")}>
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
        <p className="text-tiny uppercase font-bold">$ {price}</p>
        <small className="text-default-500 text-left">{description}</small>
      </CardFooter>
    </Card>
  );
}