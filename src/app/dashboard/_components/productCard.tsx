import {Card, CardBody, CardFooter} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { searchPexelsImage } from "../../api/lib/util/pexelsClient";
import Image from "next/image";

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
  const [pexelsImage, setPexelsImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPexelsImage = async () => {
      const imageUrl = await searchPexelsImage(name);
      if (imageUrl) {
        setPexelsImage(imageUrl);
      }
    };

    fetchPexelsImage();
  }, [name]);

  return (
    <Card radius="none" className="w-[210px] h-[250px]" key={index} isPressable disableRipple shadow="sm" onPress={() => router.push(`/detailed_product/${name}`)}>
      <CardBody className="overflow-visible p-0">
        <div className="relative w-full h-[140px]">
          <Image
            alt={name}
            src={pexelsImage || image}
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
      </CardBody>
      <CardFooter className="pb-2 pt-2 flex-col items-start h-[110px]">
        <div className="flex flex-col h-full justify-between w-full">
          <div>
            <h4 className="font-bold text-large truncate w-full text-left">{name}</h4>
            <small className="text-default-500 text-left line-clamp-2">{description}</small>
          </div>
          <p className="text-sm font-semibold text-left">{price} <i className="font-light text-default-500 text-left">average</i></p>
        </div>
      </CardFooter>
    </Card>
  );
}