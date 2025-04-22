    import {Card, CardBody, CardHeader, Image} from "@heroui/react";
    import { FcLikePlaceholder } from "react-icons/fc";
    import {Meme} from "../utils/types.ts";

    type ListItemProps =  {
        meme: Meme;
    }

    const ListItem = ({ meme }: ListItemProps) => {
        return (
            <Card className="flex flex-col h-full min-h-[300px] shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <small className="text-default-500 flex items-center gap-2 sm:text-sm">
                        <FcLikePlaceholder />
                        {meme.likes}
                    </small>
                    <h4 className="font-bold text-lg line-clamp-2"><a className="underline" href={meme.image} target="_blank">{meme.name}</a></h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2 flex-1">
                    <Image
                        alt={meme.name}
                        className="w-full aspect-video object-cover rounded-lg"
                        src={meme.image}
                    />
                </CardBody>
            </Card>
        );
    };

    export default ListItem;